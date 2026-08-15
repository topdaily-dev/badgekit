/**
 * @param {string} markdown
 * @returns {string[]}
 */
export function extractImageUrls(markdown) {
  /** @type {Set<string>} */
  const urls = new Set();
  const patterns = [
    /!\[[^\]]*\]\(([^)]+)\)/g,
    /<img[^>]+src=["']([^"']+)["']/gi,
  ];

  for (const pattern of patterns) {
    for (const match of markdown.matchAll(pattern)) {
      const url = match[1]?.trim();
      if (url && /^https?:\/\//i.test(url)) {
        urls.add(url);
      }
    }
  }

  return [...urls];
}

/**
 * @param {string} url
 * @param {{ timeoutMs?: number }} options
 * @returns {Promise<{ url: string; ok: boolean; status: number; error?: string }>}
 */
export async function probeUrl(url, options = {}) {
  const timeoutMs = options.timeoutMs ?? 8000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });

    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });
    }

    return { url, ok: response.ok, status: response.status };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { url, ok: false, status: 0, error: message };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * @param {string[]} urls
 * @param {{ timeoutMs?: number }} options
 */
export async function validateUrls(urls, options = {}) {
  const results = [];
  for (const url of urls) {
    results.push(await probeUrl(url, options));
  }
  return results;
}

/**
 * @param {Array<{ alt: string; href: string; src: string }>} badges
 */
export async function validateBadges(badges, options = {}) {
  const urls = badges.flatMap((badge) => [badge.src, badge.href]).filter(Boolean);
  return validateUrls([...new Set(urls)], options);
}

/**
 * @param {Array<{ url: string; ok: boolean; status: number; error?: string }>} results
 */
export function formatValidationReport(results) {
  if (results.length === 0) {
    return "No badge URLs to validate.";
  }

  const lines = ["badgekit validate:", ""];
  for (const result of results) {
    const status = result.ok
      ? `OK ${result.status}`
      : result.error
        ? `FAIL (${result.error})`
        : `FAIL ${result.status}`;
    lines.push(`[${status}] ${result.url}`);
  }

  const failed = results.filter((r) => !r.ok).length;
  lines.push("", failed === 0 ? "All URLs reachable." : `${failed} URL(s) failed.`);
  return lines.join("\n");
}
