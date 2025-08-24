import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Projects',
        href: '/admin/projects',
    },
    {
        title: 'Create',
        href: '/admin/projects/create',
    },
];

export default function CreateProject() {
    const [technologies, setTechnologies] = useState<string[]>(['']);
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        technologies: [''],
        image: '',
        live_url: '',
        github_url: '',
        is_featured: false,
        sort_order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const filteredTechnologies = technologies.filter(tech => tech.trim() !== '');
        post(route('admin.projects.store'), {
            data: { ...data, technologies: filteredTechnologies }
        });
    };

    const addTechnology = () => {
        setTechnologies([...technologies, '']);
    };

    const removeTechnology = (index: number) => {
        if (technologies.length > 1) {
            const newTechnologies = technologies.filter((_, i) => i !== index);
            setTechnologies(newTechnologies);
        }
    };

    const updateTechnology = (index: number, value: string) => {
        const newTechnologies = [...technologies];
        newTechnologies[index] = value;
        setTechnologies(newTechnologies);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title="Create Project" />
            <div className="flex-1 p-8">
                <div className="max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Button
                            asChild
                            variant="ghost"
                            className="mb-4 text-destructive dark:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10"
                        >
                            <Link href={route('admin.projects.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
                            Create New Project
                        </h1>
                        <p className="text-muted-foreground dark:text-muted-foreground mt-2">
                            Add a new project to showcase your work and skills.
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
                                        Enter the basic details for your project.
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
                                            placeholder="Enter project title"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-foreground dark:text-foreground">
                                            Description *
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe your project..."
                                            rows={4}
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.description}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-foreground dark:text-foreground">
                                            Technologies
                                        </Label>
                                        <div className="space-y-2">
                                            {technologies.map((tech, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <Input
                                                        value={tech}
                                                        onChange={(e) => updateTechnology(index, e.target.value)}
                                                        placeholder="e.g., React, Laravel, TypeScript"
                                                        className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                                    />
                                                    {technologies.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => removeTechnology(index)}
                                                            className="border-border dark:border-border text-foreground dark:text-foreground hover:border-destructive dark:hover:border-destructive"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={addTechnology}
                                                className="border-border dark:border-border text-foreground dark:text-foreground hover:border-destructive dark:hover:border-destructive"
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Technology
                                            </Button>
                                        </div>
                                        {errors.technologies && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.technologies}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Media & Links */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                        Media & Links
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                        Add project images and links.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="image" className="text-foreground dark:text-foreground">
                                            Project Image URL
                                        </Label>
                                        <Input
                                            id="image"
                                            value={data.image}
                                            onChange={(e) => setData('image', e.target.value)}
                                            placeholder="https://example.com/project-image.jpg"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.image && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.image}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="live_url" className="text-foreground dark:text-foreground">
                                            Live Demo URL
                                        </Label>
                                        <Input
                                            id="live_url"
                                            value={data.live_url}
                                            onChange={(e) => setData('live_url', e.target.value)}
                                            placeholder="https://your-project.com"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.live_url && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.live_url}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="github_url" className="text-foreground dark:text-foreground">
                                            GitHub Repository URL
                                        </Label>
                                        <Input
                                            id="github_url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            placeholder="https://github.com/username/project"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive"
                                        />
                                        {errors.github_url && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.github_url}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Settings */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                        Project Settings
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                                        Configure project display and ordering.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_featured" className="text-foreground dark:text-foreground">
                                                Featured Project
                                            </Label>
                                            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                Highlight this project on your portfolio
                                            </p>
                                        </div>
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order" className="text-foreground dark:text-foreground">
                                            Sort Order
                                        </Label>
                                        <Input
                                            id="sort_order"
                                            type="number"
                                            value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                            className="border-border dark:border-border focus:border-destructive dark:focus:border-destructive w-32"
                                        />
                                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                            Lower numbers appear first
                                        </p>
                                        {errors.sort_order && (
                                            <p className="text-sm text-destructive dark:text-destructive">{errors.sort_order}</p>
                                        )}
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
                                    <Link href={route('admin.projects.index')}>
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
                                            Create Project
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
