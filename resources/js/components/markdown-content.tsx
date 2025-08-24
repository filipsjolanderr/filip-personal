import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
    return (
        <div className="prose prose-lg max-w-none dark:prose-invert">
            {content.split('\n').map((line, index) => {
                // Headings
                if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold text-foreground dark:text-foreground mb-6 mt-8 first:mt-0">{line.substring(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold text-foreground dark:text-foreground mb-4 mt-8 first:mt-0">{line.substring(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-bold text-foreground dark:text-foreground mb-3 mt-6 first:mt-0">{line.substring(4)}</h3>;
                }
                if (line.startsWith('#### ')) {
                    return <h4 key={index} className="text-lg font-bold text-foreground dark:text-foreground mb-2 mt-4 first:mt-0">{line.substring(5)}</h4>;
                }
                if (line.startsWith('##### ')) {
                    return <h5 key={index} className="text-base font-bold text-foreground dark:text-foreground mb-2 mt-4 first:mt-0">{line.substring(6)}</h5>;
                }
                if (line.startsWith('###### ')) {
                    return <h6 key={index} className="text-sm font-bold text-foreground dark:text-foreground mb-2 mt-4 first:mt-0">{line.substring(7)}</h6>;
                }

                // Paragraphs
                if (line.trim() !== '') {
                    return <p key={index} className="text-muted-foreground dark:text-muted-foreground leading-relaxed mb-4 last:mb-0">{line}</p>;
                }

                // Lists
                if (line.startsWith('- ') || line.startsWith('* ')) {
                    return <ul key={index} className="list-disc list-inside text-muted-foreground dark:text-muted-foreground mb-4 space-y-1 ml-4"><li>{line.substring(2)}</li></ul>;
                }
                if (line.match(/^\d+\./)) {
                    return <ol key={index} className="list-decimal list-inside text-muted-foreground dark:text-muted-foreground mb-4 space-y-1 ml-4"><li>{line.replace(/^\d+\.\s*/, '')}</li></ol>;
                }

                // List items (continuation)
                if (line.startsWith('  ') && (line.includes('- ') || line.includes('* ') || line.match(/\d+\./))) {
                    return <li key={index} className="text-muted-foreground dark:text-muted-foreground leading-relaxed">{line.trim()}</li>;
                }

                // Code blocks
                if (line.startsWith('```')) {
                    const codeBlock = content.split('```').slice(1, -1).join('```');
                    return (
                        <pre key={index} className="bg-muted dark:bg-muted p-4 rounded-lg border border-border dark:border-border overflow-x-auto mb-4">
                            <code className="text-sm font-mono">{codeBlock}</code>
                        </pre>
                    );
                }

                // Inline code
                if (line.includes('`') && !line.startsWith('```')) {
                    const parts = line.split('`');
                    return (
                        <p key={index} className="text-muted-foreground dark:text-muted-foreground leading-relaxed mb-4 last:mb-0">
                            {parts.map((part, partIndex) => 
                                partIndex % 2 === 0 ? part : 
                                <code key={partIndex} className="bg-muted dark:bg-muted text-foreground dark:text-foreground px-2 py-1 rounded text-sm font-mono border border-border dark:border-border">{part}</code>
                            )}
                        </p>
                    );
                }

                // Blockquotes
                if (line.startsWith('> ')) {
                    return (
                        <blockquote key={index} className="border-l-4 border-destructive dark:border-destructive pl-4 py-2 my-4 bg-muted dark:bg-muted rounded-r-lg">
                            <p className="text-muted-foreground dark:text-muted-foreground italic">{line.substring(2)}</p>
                        </blockquote>
                    );
                }

                // Tables
                if (line.includes('|') && line.trim() !== '') {
                    const cells = line.split('|').filter(cell => cell.trim() !== '');
                    if (line.includes('---')) {
                        return null; // Skip separator rows
                    }
                    return (
                        <table key={index} className="min-w-full border border-border dark:border-border rounded-lg">
                            <thead className="bg-muted dark:bg-muted">
                                <tr>
                                    {cells.map((cell, cellIndex) => (
                                        <th key={cellIndex} className="px-4 py-3 text-left text-sm font-semibold text-foreground dark:text-foreground border-r border-border dark:border-border">
                                            {cell.trim()}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border dark:border-border hover:bg-muted dark:hover:bg-muted">
                                    {cells.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-4 py-3 text-sm text-muted-foreground dark:text-muted-foreground border-r border-border dark:border-border">
                                            {cell.trim()}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    );
                }

                // Horizontal rules
                if (line.trim() === '---' || line.trim() === '***') {
                    return <hr key={index} className="border-t border-border dark:border-border my-8" />;
                }

                // Links
                if (line.includes('[') && line.includes('](') && line.includes(')')) {
                    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                    let match;
                    let result = line;
                    while ((match = linkRegex.exec(line)) !== null) {
                        const [fullMatch, text, url] = match;
                        result = result.replace(fullMatch, `<a href="${url}" className="text-destructive dark:text-destructive hover:underline" target="_blank" rel="noopener noreferrer">${text}</a>`);
                    }
                    return <p key={index} className="text-muted-foreground dark:text-muted-foreground leading-relaxed mb-4 last:mb-0" dangerouslySetInnerHTML={{ __html: result }} />;
                }

                // Bold and italic
                if (line.includes('**') || line.includes('*')) {
                    let result = line;
                    // Bold
                    result = result.replace(/\*\*(.*?)\*\*/g, '<strong className="font-bold text-foreground dark:text-foreground">$1</strong>');
                    // Italic
                    result = result.replace(/\*(.*?)\*/g, '<em className="italic text-muted-foreground dark:text-muted-foreground">$1</em>');
                    return <p key={index} className="text-muted-foreground dark:text-muted-foreground leading-relaxed mb-4 last:mb-0" dangerouslySetInnerHTML={{ __html: result }} />;
                }

                return null;
            })}
        </div>
    );
}
