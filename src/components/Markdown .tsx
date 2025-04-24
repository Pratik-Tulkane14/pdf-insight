import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Markdown = ({ text }: { text: string }) => (
    <div className="bg-[#404045] text-white p-4 rounded-md leading-relaxed space-y-4 border-none ring-0">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => <h1 className="text-xl font-bold">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>,
                p: ({ children }) => <p className="text-base">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-5">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-5">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeText = String(children).replace(/\n$/, "");

                    return !inline ? (
                        <div className="relative my-2 group">
                            <button
                                className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
                                onClick={() => navigator.clipboard.writeText(codeText)}
                            >
                                Copy
                            </button>
                            <SyntaxHighlighter
                                style={oneDark}
                                language={match?.[1] || "text"}
                                PreTag="div"
                                customStyle={{
                                    background: "#404045",
                                    // background: "none",
                                    padding: "1rem",
                                    margin: 0,
                                }}
                            >
                                {codeText}
                            </SyntaxHighlighter>
                        </div>
                    ) : (
                        <code className="px-1 py-0.5 rounded text-sm" {...props}>
                            {children}
                        </code>
                    );
                },
                pre: ({ children }) => children, // Remove default <pre> to avoid double styling
            }}
        >
            {text}
        </ReactMarkdown>
    </div>
);

export default Markdown;