'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

type Props = {
  content: string | undefined;
};

export default function MarkdownContent({ content }: Props) {
  return (
    <section className="markdownStyles bg-cyan-50 dark:bg-gray-800 p-6 rounded-xl border border-cyan-300 dark:border-cyan-700 leading-relaxed shadow-inner">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: (props) => (
            <h1
              className="text-4xl font-bold text-cyan-800 dark:text-cyan-300 mt-6 mb-4"
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className="text-3xl font-semibold text-cyan-700 dark:text-cyan-200 mt-5 mb-3"
              {...props}
            />
          ),
          h3: (props) => (
            <h3
              className="text-2xl font-semibold text-cyan-600 dark:text-cyan-100 mt-4 mb-2"
              {...props}
            />
          ),
          p: (props) => (
            <p
              className="text-base text-gray-900 dark:text-gray-100 leading-relaxed mb-4"
              {...props}
            />
          ),
          ul: (props) => (
            <ul
              className="list-disc list-inside mb-4 text-gray-900 dark:text-gray-100"
              {...props}
            />
          ),
          ol: (props) => (
            <ol
              className="list-decimal list-inside mb-4 text-gray-900 dark:text-gray-100"
              {...props}
            />
          ),
          li: (props) => <li className="mb-1" {...props} />,
          blockquote: ({ children }) => (
            <blockquote className="relative pl-5 pr-4 py-3 bg-cyan-100 dark:bg-gray-700 rounded-lg border-l-4 border-cyan-500 dark:border-cyan-400 text-gray-800 dark:text-gray-100 italic">
              <span className="block">{children}</span>
            </blockquote>
          ),
          code: ({ children, ...props }) => (
            <code
              className="bg-gray-200 dark:bg-gray-700 text-pink-600 dark:text-pink-400 px-1 py-0.5 rounded"
              {...props}
            >
              {children}
            </code>
          ),
          a: (props) => (
            <a
              className="text-cyan-700 dark:text-cyan-400 underline hover:text-cyan-900 dark:hover:text-cyan-200"
              {...props}
            />
          ),
          hr: (props) => (
            <hr className="border-t border-cyan-200 dark:border-cyan-700 my-6" {...props} />
          ),
          strong: (props) => (
            <strong className="font-semibold text-gray-900 dark:text-white" {...props} />
          ),
          em: (props) => <em className="italic text-gray-700 dark:text-gray-300" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </section>
  );
}
