import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'CVs',
        href: '/admin/cvs',
    },
    {
        title: 'Create',
        href: '/admin/cvs/create',
    },
];

export default function CreateCV() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        file_path: '',
        is_active: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.cvs.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title="Create CV" />
            <div className="flex-1 p-8">
                <div className="max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Button
                            asChild
                            variant="ghost"
                            className="mb-4 text-destructive dark:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10"
                        >
                            <Link href={route('admin.cvs.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to CVs
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
                            Create New CV
                        </h1>
                        <p className="text-muted-foreground dark:text-muted-foreground mt-2">
                            Add a new CV or resume to your portfolio.
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
                                        Enter the basic details for your CV.
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
                                            placeholder="e.g., Software Developer CV, Resume 2024"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.title}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* CV Content */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                        CV Content
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                        Write your CV content or provide a brief description. You can use HTML tags for formatting.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label htmlFor="content" className="text-foreground dark:text-foreground">
                                            Content
                                        </Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder="Write your CV content here or leave blank if you're uploading a file..."
                                            rows={12}
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                            You can include your experience, skills, education, and other relevant information.
                                        </p>
                                        {errors.content && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.content}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* File Upload */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                        File Upload
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                        Upload your CV file (PDF, DOC, etc.) or provide a download link.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="file_path" className="text-foreground dark:text-foreground">
                                            File Path or URL
                                        </Label>
                                        <Input
                                            id="file_path"
                                            value={data.file_path}
                                            onChange={(e) => setData('file_path', e.target.value)}
                                            placeholder="e.g., /storage/cvs/my-cv.pdf or https://example.com/cv.pdf"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                            Provide the path to your uploaded file or a direct download link.
                                        </p>
                                        {errors.file_path && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.file_path}</p>
                                        )}
                                    </div>

                                    <div className="p-4 border border-dashed border-border rounded-lg text-center">
                                        <Upload className="h-8 w-8 text-muted-foreground dark:text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                            Upload your CV file to the storage/cvs directory and enter the path above.
                                        </p>
                                        <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">
                                            Supported formats: PDF, DOC, DOCX, TXT
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Settings */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                        CV Settings
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                        Configure how your CV is displayed.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_active" className="text-foreground dark:text-foreground">
                                                Active CV
                                            </Label>
                                            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                Make this CV visible to visitors (only one CV can be active at a time)
                                            </p>
                                        </div>
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                    </div>

                                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                        <p className="text-sm text-blue-800 dark:text-blue-200">
                                            <strong>Note:</strong> When you make a CV active, any previously active CV will automatically become inactive.
                                        </p>
                                    </div>
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
                                    <Link href={route('admin.cvs.index')}>
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
                                            Create CV
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
