import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from 'lucide-react';
import { type BlogPost } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface BlogPostsIndexProps {
    blogPosts: {
        items: BlogPost[];
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Blog Posts',
        href: '/admin/blog-posts',
    },
];

export default function BlogPostsIndex({ blogPosts }: BlogPostsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title="Blog Posts" />
            <div className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
                            Blog Posts
                        </h1>
                        <p className="text-muted-foreground dark:text-muted-foreground mt-2">
                            Manage your blog content and posts.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mb-6">
                        <Button asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90">
                            <Link href={route('admin.blog-posts.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Blog Post
                            </Link>
                        </Button>
                    </div>

                    {/* Blog Posts List */}
                    <div className="grid gap-6">
                        {blogPosts.items.length === 0 ? (
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardContent className="p-8 text-center">
                                    <div className="mx-auto w-16 h-16 bg-destructive/10 dark:bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                                        <Calendar className="h-8 w-8 text-destructive dark:text-destructive" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                        No blog posts yet
                                    </h3>
                                    <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                                        Get started by creating your first blog post.
                                    </p>
                                    <Button asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90">
                                        <Link href={route('admin.blog-posts.create')}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create First Post
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            blogPosts.items.map((post) => (
                                <Card key={post.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground mb-2">
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
                                                {post.excerpt && (
                                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                                        {post.excerpt}
                                                    </CardDescription>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                {post.is_published ? (
                                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                        Published
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        Draft
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                Slug: <code className="bg-destructive/10 dark:bg-destructive/10 px-2 py-1 rounded text-destructive dark:text-destructive">{post.slug}</code>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('admin.blog-posts.edit', post.id)}>
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('admin.blog-posts.show', post.id)}>
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 dark:text-destructive dark:hover:text-destructive/90 dark:hover:bg-destructive/20">
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {blogPosts.lastPage > 1 && (
                        <div className="mt-8 flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: blogPosts.lastPage }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === blogPosts.currentPage ? "default" : "outline"}
                                        size="sm"
                                        className={page === blogPosts.currentPage 
                                                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
                                                : "border-border text-foreground hover:border-destructive dark:border-border dark:text-foreground dark:hover:border-destructive"
                                            }
                                        >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
