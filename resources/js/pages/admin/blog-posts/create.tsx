import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Blog Posts',
        href: '/admin/blog-posts',
    },
    {
        title: 'Create',
        href: '/admin/blog-posts/create',
    },
];

export default function CreateBlogPost() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featured_image: '',
        is_published: false,
        published_at: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.blog-posts.store'));
    };

    const generateSlug = () => {
        const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
        setData('slug', slug);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title="Create Blog Post" />
            <div className="flex-1 p-8">
                <div className="max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Button
                            asChild
                            variant="ghost"
                            className="mb-4 text-destructive dark:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10"
                        >
                            <Link href={route('admin.blog-posts.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Blog Posts
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
                            Create New Blog Post
                        </h1>
                        <p className="text-muted-foreground dark:text-muted-foreground mt-2">
                            Write and publish a new blog post for your website.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            {/* Basic Information */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                        Basic Information
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                        Enter the basic details for your blog post.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-foreground dark:text-foreground">
                                            Title *
                                        </Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter blog post title"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug" className="text-foreground dark:text-foreground">
                                            Slug *
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="slug"
                                                value={data.slug}
                                                onChange={(e) => setData('slug', e.target.value)}
                                                placeholder="blog-post-slug"
                                                className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={generateSlug}
                                                className="border-border dark:border-border text-foreground dark:text-foreground hover:border-destructive dark:hover:border-destructive"
                                            >
                                                Generate
                                            </Button>
                                        </div>
                                        {errors.slug && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.slug}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt" className="text-foreground dark:text-foreground">
                                            Excerpt
                                        </Label>
                                        <Textarea
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            placeholder="Brief summary of the blog post"
                                            rows={3}
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.excerpt && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.excerpt}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Content */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                        Content
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                        Write your blog post content. You can use HTML tags for formatting.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="content" className="text-foreground dark:text-foreground">
                                            Content *
                                        </Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder="Write your blog post content here..."
                                            rows={15}
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive font-mono"
                                        />
                                        {errors.content && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.content}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Media & Settings */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                        Media & Settings
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                        Configure media and publication settings.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="featured_image" className="text-foreground dark:text-foreground">
                                            Featured Image URL
                                        </Label>
                                        <Input
                                            id="featured_image"
                                            value={data.featured_image}
                                            onChange={(e) => setData('featured_image', e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.featured_image && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.featured_image}</p>
                                        )}
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_published" className="text-foreground dark:text-foreground">
                                                Publish immediately
                                            </Label>
                                            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                Make this post visible to visitors
                                            </p>
                                        </div>
                                        <Switch
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={(checked) => setData('is_published', checked)}
                                        />
                                    </div>

                                    {data.is_published && (
                                        <div className="space-y-2">
                                            <Label htmlFor="published_at" className="text-foreground dark:text-foreground">
                                                Publication Date
                                            </Label>
                                            <Input
                                                id="published_at"
                                                type="date"
                                                value={data.published_at}
                                                onChange={(e) => setData('published_at', e.target.value)}
                                                className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                            />
                                            {errors.published_at && (
                                                <p className="text-sm text-destructive dark:text-destructive">{errors.published_at}</p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                    className="border-border text-foreground hover:border-destructive dark:border-border dark:text-foreground dark:hover:border-destructive"
                                >
                                    <Link href={route('admin.blog-posts.index')}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
                                >
                                    {processing ? (
                                        'Creating...'
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Create Post
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
