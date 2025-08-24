import { type BlogPost } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookIcon, BookOpen, Calendar, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import MarkdownContent from '@/components/markdown-content';
import { type BreadcrumbItem } from '@/types';

interface BlogIndexProps {
    posts: {
        items: BlogPost[];
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: '/blog',
    },
];

export default function BlogIndex({ posts }: BlogIndexProps) {
    const pages = [];
    for (let i = 1; i <= posts.lastPage; i++) {
        pages.push(i);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <div className="flex-1 p-8">
                <div className="max-w-6xl">
                    {/* Header */}
                    <div className="text-left mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <BookOpen className="h-12 w-12 text-destructive dark:text-destructive" />
                            <h1 className="text-5xl font-bold text-foreground dark:text-foreground">
                                Blog
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl leading-relaxed">
                            Thoughts, insights, and experiences from my journey in software development
                        </p>
                    </div>

                    {/* Blog Posts Grid */}
                    {posts && posts.items && posts.items.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 mb-16">
                            {posts.items.map((post) => (
                                <Link key={post.id} href={route('blog.show', post.slug)} className="block">
                                    <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)] hover:shadow-xl transition-all duration-300 cursor-pointer">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle className="text-2xl font-bold text-foreground dark:text-foreground mb-3 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                                                        {post.title}
                                                    </CardTitle>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-muted-foreground mb-3">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {post.updated_at ? new Date(post.updated_at).toLocaleDateString() : 'Never'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {post.excerpt && (
                                                <div className="text-lg text-muted-foreground dark:text-muted-foreground leading-relaxed">
                                                    <MarkdownContent content={post.excerpt} />
                                                </div>
                                            )}
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-muted-foreground dark:text-muted-foreground">
                                No blog posts available
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {posts && posts.lastPage > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            {pages.map((page) => (
                                <div
                                    key={page}
                                    className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                                        page === posts.currentPage 
                                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
                                            : "border border-border text-foreground hover:border-destructive dark:border-border dark:text-foreground dark:hover:border-destructive hover:bg-accent dark:hover:bg-accent"
                                    }`}
                                >
                                    {page}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
