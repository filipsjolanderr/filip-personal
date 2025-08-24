import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, User, Download, FileText } from 'lucide-react';
import { type CV } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface CVsIndexProps {
    cvs: {
        items: CV[];
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
        title: 'CVs',
        href: '/admin/cvs',
    },
];

export default function CVsIndex({ cvs }: CVsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title="CVs" />
            <div className="flex-1 p-8">
                <div className="max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
                            CVs
                        </h1>
                        <p className="text-muted-foreground dark:text-muted-foreground mt-2">
                            Manage your CVs and resumes for your portfolio.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mb-6">
                        <Button asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90">
                            <Link href={route('admin.cvs.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                New CV
                            </Link>
                        </Button>
                    </div>

                    {/* CVs List */}
                    <div className="grid gap-6">
                        {cvs.items.length === 0 ? (
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardContent className="p-8 text-center">
                                    <div className="mx-auto w-16 h-16 bg-destructive/10 dark:bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                                        <User className="h-8 w-8 text-destructive dark:text-destructive" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                        No CVs yet
                                    </h3>
                                    <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                                        Get started by creating your first CV to showcase your professional experience.
                                    </p>
                                    <Button asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90">
                                        <Link href={route('admin.cvs.create')}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create First CV
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            cvs.items.map((cv) => (
                                <Card key={cv.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                                        {cv.title}
                                                    </CardTitle>
                                                    {cv.is_active && (
                                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                            Active
                                                        </Badge>
                                                    )}
                                                </div>
                                                {cv.content && (
                                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground mb-3 line-clamp-3">
                                                        {cv.content}
                                                    </CardDescription>
                                                )}
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <FileText className="h-4 w-4" />
                                                        {cv.file_path ? 'File attached' : 'No file'}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Download className="h-4 w-4" />
                                                        {cv.is_active ? 'Active CV' : 'Inactive'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                {cv.file_path && (
                                                    <span className="inline-flex items-center gap-1">
                                                        <Download className="h-4 w-4" />
                                                        <a href={cv.file_path} target="_blank" rel="noopener noreferrer" className="text-destructive dark:text-destructive hover:underline">
                                                            Download CV
                                                        </a>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('admin.cvs.edit', cv.id)}>
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('admin.cvs.show', cv.id)}>
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
                    {cvs.lastPage > 1 && (
                        <div className="mt-8 flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: cvs.lastPage }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === cvs.currentPage ? "default" : "outline"}
                                        size="sm"
                                        className={page === cvs.currentPage 
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
