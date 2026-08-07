"use client";

import { Fragment } from "react";

/**
 * Renders the light plain-text syntax the editor writes.
 *
 *   - item        → bullet list
 *   1. item       → numbered list
 *   blank line    → new paragraph
 *
 * Everything stays a plain string in content/<locale>.json. Nothing the user
 * types is ever interpreted as markup, so there is no HTML to sanitise and no
 * way for an edit to inject anything into the page.
 */

type Block =
  | { kind: "para"; lines: string[] }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

const BULLET = /^\s*[-•*]\s+(.*)$/;
const NUMBER = /^\s*\d+[.)]\s+(.*)$/;

export function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];

  for (const line of text.split("\n")) {
    const bullet = line.match(BULLET);
    const numbered = line.match(NUMBER);
    const last = blocks[blocks.length - 1];

    if (bullet) {
      if (last?.kind === "ul") last.items.push(bullet[1]);
      else blocks.push({ kind: "ul", items: [bullet[1]] });
      continue;
    }

    if (numbered) {
      if (last?.kind === "ol") last.items.push(numbered[1]);
      else blocks.push({ kind: "ol", items: [numbered[1]] });
      continue;
    }

    if (line.trim() === "") {
      // A blank line closes the current block.
      if (last?.kind === "para") blocks.push({ kind: "para", lines: [] });
      continue;
    }

    if (last?.kind === "para") last.lines.push(line);
    else blocks.push({ kind: "para", lines: [line] });
  }

  return blocks.filter(
    (b) =>
      (b.kind === "para" && b.lines.length > 0) ||
      (b.kind !== "para" && b.items.length > 0)
  );
}

/** True when the text uses any of the syntax, i.e. rendering changes it. */
export function isRich(text: string): boolean {
  return text.includes("\n");
}

/**
 * A single newline is a line break, a blank line starts a new paragraph — so
 * what is published matches what the author saw while typing.
 */
function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

export default function RichText({ text }: { text: string }) {
  const blocks = parseBlocks(text);

  // The overwhelmingly common case: one plain paragraph, rendered as bare text
  // so the surrounding element keeps the markup it always had.
  if (blocks.length === 1 && blocks[0].kind === "para") {
    return <Lines lines={blocks[0].lines} />;
  }

  return (
    <>
      {blocks.map((block, i) => {
        if (block.kind === "ul") {
          return (
            <ul key={i} className="rich-list list-disc">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.kind === "ol") {
          return (
            <ol key={i} className="rich-list list-decimal">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ol>
          );
        }
        return (
          <Fragment key={i}>
            {i > 0 && <span className="rich-break" aria-hidden="true" />}
            <Lines lines={block.lines} />
          </Fragment>
        );
      })}
    </>
  );
}
