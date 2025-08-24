import { Head, Link } from '@inertiajs/react';
import { type BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import MarkdownContent from '@/components/markdown-content';
import { useState } from 'react';

interface BlogShowProps {
    post: BlogPost;
}

export default function BlogShow({ post }: BlogShowProps) {
    const [copied, setCopied] = useState(false);
    const [shared, setShared] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [canShare, setCanShare] = useState(false);

    // Check if native sharing is available on component mount
    useState(() => {
        setCanShare(typeof navigator !== 'undefined' && !!navigator.share);
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Blog',
            href: '/blog',
        },
        {
            title: post.title,
            href: `/blog/${post.slug}`,
        },
    ];

    const copyMarkdown = async () => {
        try {
            await navigator.clipboard.writeText(post.markdown_content || post.content || '');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback: show user to copy manually
            alert('Copy failed. Please select and copy the content manually.');
        }
    };

    const sharePost = async () => {
        setIsSharing(true);
        
        try {
            if (navigator.share && navigator.canShare) {
                const shareData = {
                    title: post.title,
                    text: post.excerpt || post.title,
                    url: window.location.href,
                };
                
                if (navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                    setShared(true);
                    setTimeout(() => setShared(false), 3000);
                } else {
                    // Fallback to URL copy
                    await copyUrlToClipboard();
                }
            } else {
                // Fallback to URL copy
                await copyUrlToClipboard();
            }
        } catch (err) {
            console.error('Error sharing: ', err);
            // Fallback to URL copy
            await copyUrlToClipboard();
        } finally {
            setIsSharing(false);
        }
    };

    const copyUrlToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShared(true);
            setTimeout(() => setShared(false), 3000);
        } catch (err) {
            console.error('Failed to copy URL: ', err);
            // Fallback: show user to copy manually
            alert('Copy failed. Please copy the URL manually: ' + window.location.href);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title={post.title} />
            <div className="flex-1 p-8">
                <div className="max-w-4xl">
                    {/* Article Header */}
                    <header className="mb-12 text-left">
                        <h1 className="mb-6 text-5xl font-bold text-foreground dark:text-foreground leading-tight max-w-4xl">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center gap-6 text-muted-foreground dark:text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <time className="font-medium">
                                    {new Date(post.published_at).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">
                                    {Math.ceil((post.markdown_content || post.content || '').split(' ').length / 200)} min read
                                </span>
                            </div>
                        </div>

                        {post.excerpt && (
                            <div className="text-xl text-foreground dark:text-foreground max-w-3xl leading-relaxed">
                                <MarkdownContent content={post.excerpt} />
                            </div>
                        )}
                    </header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="mb-12">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </div>
                        </div>
                    )}

                    {/* Article Content */}
                    <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground dark:prose-headings:text-foreground prose-p:text-foreground dark:prose-p:text-foreground prose-strong:text-destructive dark:prose-strong:text-destructive">
                        <MarkdownContent 
                            content={post.markdown_content || post.content || ''} 
                            className="text-foreground dark:text-foreground leading-relaxed"
                        />
                    </article>

                    {/* Article Footer */}
                    <footer className="mt-16 pt-8 border-t border-border dark:border-border">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">
                                Last updated: {new Date(post.updated_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={sharePost}
                                    disabled={isSharing}
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground disabled:opacity-50"
                                >
                                    {shared ? (
                                        <>
                                            <Check className="mr-2 h-4 w-4 text-green-600" />
                                            {canShare ? 'Shared!' : 'URL Copied!'}
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="mr-2 h-4 w-4" />
                                            {isSharing ? 'Sharing...' : 'Share Post'}
                                        </>
                                    )}
                                </Button>

                                <Button
                                    onClick={copyMarkdown}
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="mr-2 h-4 w-4 text-green-600" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy Markdown
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </footer>

                    {/* Back to Blog */}
                    <div className="mt-12 text-center">
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-border text-foreground hover:border-destructive dark:border-border dark:text-foreground dark:hover:border-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10"
                        >
                            <Link href={route('blog.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to all posts
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
