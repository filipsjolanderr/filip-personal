import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Folder, User, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title="Dashboard" />
            <div className="flex-1 p-8">
                <div className="max-w-4xl">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground dark:text-foreground mb-2">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground dark:text-muted-foreground">
                            Welcome to your content management dashboard. Use the sidebar to navigate between different content types.
                        </p>
                    </header>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold text-foreground dark:text-foreground">
                                    Blog Posts
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-destructive dark:text-destructive">0</span>
                                    <BookOpen className="h-8 w-8 text-muted-foreground dark:text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-2">
                                    Manage your blog content
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold text-foreground dark:text-foreground">
                                    Projects
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-destructive dark:text-destructive">0</span>
                                    <Folder className="h-8 w-8 text-muted-foreground dark:text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-2">
                                    Showcase your work
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold text-foreground dark:text-foreground">
                                    CV
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-destructive dark:text-destructive">0</span>
                                    <User className="h-8 w-8 text-muted-foreground dark:text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-2">
                                    Professional information
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                Quick Actions
                            </CardTitle>
                            <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                Common tasks to get you started
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button asChild className="w-full">
                                    <Link href={route('admin.blog-posts.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Write Blog Post
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={route('admin.projects.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Project
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={route('admin.cvs.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Update CV
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
