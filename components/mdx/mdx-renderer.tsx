import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "./mdx-components";

interface MdxRendererProps {
  source: string;
}

export function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
