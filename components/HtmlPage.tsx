import CrmPreview from "./CrmPreview";
import { withBasePathInHtml } from "../lib/sitePath";

type HtmlPageProps = {
  html: string;
  /** Enable CRM tab preview hydration (home page). */
  withCrmPreview?: boolean;
};

/**
 * Renders ported marketing HTML as a single contiguous tree.
 * Do not split markup across sibling roots — CSS grids (e.g. .contact-panel) break.
 */
export default function HtmlPage({
  html,
  withCrmPreview = false,
}: HtmlPageProps) {
  return (
    <>
      <div
        className="wg-html-page"
        dangerouslySetInnerHTML={{ __html: withBasePathInHtml(html) }}
      />
      {withCrmPreview ? <CrmPreview /> : null}
    </>
  );
}
