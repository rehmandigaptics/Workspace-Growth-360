export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function sitePath(path: string, pathPrefix = basePath) {
  return `${pathPrefix}${path.startsWith("/") ? path : `/${path}`}`;
}

export function withBasePathInHtml(html: string, pathPrefix = basePath) {
  if (!pathPrefix) {
    return html;
  }

  return html
    .replace(/(\b(?:href|src|action)=["'])\/(?!\/)/g, `$1${pathPrefix}/`)
    .replace(/url\((["']?)\/(?!\/)/g, `url($1${pathPrefix}/`);
}
