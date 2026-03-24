"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MdxPreview({ content }: { content: string }) {
  // Pre-process custom MDX components into standard Markdown equivalents for the live preview
  const processedContent = (content || "")
    .replace(/<ProjectSection title="([^"]+)">/g, '## $1\n')
    .replace(/<\/ProjectSection>/g, '\n')
    .replace(/<YouTubeEmbed id="([^"]+)"[^\/]*\/>/g, '\n\n> 🎥 **YouTube Video Placeholder** *(Renders iframe on live site)*\n> Video ID: `$1`\n\n')
    .replace(/<AudioTrackPlayer src="([^"]+)"[^\/]*\/>/g, '\n\n> 🎵 **Audio Player Placeholder** *(Renders inline player on live site)*\n> Audio Source: `$1`\n\n')
    .replace(/<FullWidthImage src="([^"]+)" alt="([^"]+)"[^\/]*\/>/g, '\n![Full Width: $2]($1)\n')
    .replace(/<ImageGallery images=\{\[(.*?)\]\}[^\/]*\/>/g, '\n\n> 📸 **Image Gallery Placeholder**\n> Images: `$1`\n\n')
    .replace(/<ImageGrid[^>]*>/g, '')
    .replace(/<\/ImageGrid>/g, '');

  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none w-full bg-muted/10 border rounded-lg p-4 sm:p-6 min-h-[400px] sm:min-h-[600px] h-full overflow-y-auto">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Provide basic overrides for common elements if needed to match the site's styling
          h1: ({node, ...props}) => <h1 className="text-3xl font-heading font-bold mt-8 mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-heading font-semibold mt-8 mb-4 border-b pb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-heading font-medium mt-6 mb-3" {...props} />,
          a: ({node, ...props}) => <a className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
          code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline ? (
              <div className="rounded-lg overflow-hidden my-6 border bg-muted/50 p-4">
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            ) : (
              <code className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-sm" {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {processedContent || "*No content to preview yet... Start typing to see the magic!*"}
      </ReactMarkdown>
    </div>
  );
}
