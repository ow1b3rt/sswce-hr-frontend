"use client";

import parse, { attributesToProps, domToReact } from "html-react-parser";

const options = {
  replace(domNode) {
    if (domNode.type !== "tag") return;

    if (domNode.name === "colgroup" || domNode.name === "col") {
      return <></>;
    }

    if (domNode.name === "table") {
      return (
        <div className="table-wrapper">
          <table {...attributesToProps(domNode.attribs)}>
            {domToReact(domNode.children, options)}
          </table>
        </div>
      );
    }

    /*
    if (domNode.name === 'span') {
      return <>{domToReact(domNode.children, options)}</>;
    }*/
  },
};

const proseClasses = [
  // links
  "[&_a]:inline",

  // headings
  "[&_h1]:my-6 [&_h1]:text-6xl",
  "[&_h2]:my-5 [&_h2]:text-3xl [&_h2]:font-extrabold",
  "[&_h3]:my-(--text-md) [&_h3]:text-(--text-nm)",

  // paragraphs
  "[&_p]:my-8 [&_p]:text-2xl [&_p]:leading-relaxed  ",
  // blockquote — subtle, not bold/italic
  "[&_blockquote]:my-6 [&_blockquote]:pl-4 [&_blockquote]:border-l-2 [&_blockquote]:border-(--border-lo) [&_blockquote]:text-(--text-lo)",
  "[&_blockquote_p]:my-2",

  // table — actual grid with visible borders
  "[&_table]:my-6 [&_table]:w-full [&_table]:border [&_table]:border-collapse [&_table]:border-(--border-nm)",
  "[&_th]:border [&_th]:border-(--border-nm) [&_th]:px-1.25 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold",
  "[&_td]:border [&_td]:border-(--border-nm) [&_td]:px-1.25 [&_td]:py-2.5",

  // lists
  "[&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc",
  "[&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal",
  "[&_li]:my-1.5 [&_li]:pl-1",
  "[&_li_ul]:my-1 [&_li_ol]:my-1",
].join(" ");

export default function ArticleBody({ html }) {
  if (!html) return null;

  return <div className={`text-(--text-nm) ${proseClasses}`}>{parse(html, options)}</div>;
}
