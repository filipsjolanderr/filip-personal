import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, FileText, FolderOpen, User, Calendar, ArrowRight, BookOpen, X, Folder } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface SearchResult {
    id: number;
    type: 'blog' | 'project' | 'cv';
    title: string;
    excerpt: string;
    url: string;
    published_at?: string;
    technologies?: string[];
    score: number;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    console.log('SearchModal rendered:', { isOpen, query, results, totalResults });

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Focus search input when modal opens
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Debounced search function
    const debouncedSearch = useCallback(
        (() => {
            let timeoutId: NodeJS.Timeout;
            return (searchQuery: string) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    performSearch(searchQuery);
                }, 300); // 300ms debounce delay
            };
        })(),
        []
    );

    // Trigger search when query changes
    useEffect(() => {
        if (query.trim()) {
            debouncedSearch(query);
        } else {
            setResults([]);
            setTotalResults(0);
        }
    }, [query, debouncedSearch]);

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setTotalResults(0);
            return;
        }

        setIsSearching(true);
        console.log('Performing search:', { query: searchQuery });
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=all`);
            console.log('Search response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Search results:', data);
            
            setResults(data.results || []);
            setTotalResults(data.totalResults || 0);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
            setTotalResults(0);
        } finally {
            setIsSearching(false);
        }
    };

    const handleClose = () => {
        setQuery('');
        setResults([]);
        setTotalResults(0);
        onClose();
    };

    const getTypeIcon = (resultType: string) => {
        switch (resultType) {
            case 'blog':
                return <BookOpen className="h-4 w-4" />;
            case 'project':
                return <FolderOpen className="h-4 w-4" />;
            case 'cv':
                return <User className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const getTypeLabel = (resultType: string) => {
        switch (resultType) {
            case 'blog':
                return 'Blog Post';
            case 'project':
                return 'Project';
            case 'cv':
                return 'CV';
            default:
                return 'Content';
        }
    };

    const getTypeColor = (resultType: string) => {
        switch (resultType) {
            case 'blog':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'project':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'cv':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
                <div className="relative">
                    {/* Close button positioned absolutely */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleClose} 
                        className="absolute top-4 right-4 h-8 w-8 z-10"
                    >
                        <X className="h-4 w-4" />
                    </Button>

                    {/* Main Search Card */}
                    <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm dark:bg-background/95 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)] rounded-xl">
                        <CardHeader className="pb-6 pt-8 px-8">
                            {/* Search Bar - Main Focus */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground dark:text-muted-foreground" />
                                <Input
                                    id="search-input"
                                    type="text"
                                    placeholder="Search for blog posts, projects, or CVs..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="h-16 text-xl pl-12 pr-4 border-2 border-border dark:border-border focus:border-destructive dark:focus:border-destructive focus:ring-0 transition-colors"
                                    autoFocus
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="px-8 pb-8">
                            {/* Search Results or Search Tips */}
                            {query ? (
                                // Show search results when query exists
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                                            Search Results ({totalResults})
                                        </h3>
                                        <Badge variant="secondary" className="text-sm px-3 py-1">
                                            {totalResults} result{totalResults !== 1 ? 's' : ''}
                                        </Badge>
                                    </div>

                                    {isSearching ? (
                                        <div className="text-center py-8">
                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-destructive dark:border-destructive mx-auto mb-4"></div>
                                            <p className="text-muted-foreground dark:text-muted-foreground text-sm">
                                                Searching...
                                            </p>
                                        </div>
                                    ) : totalResults === 0 ? (
                                        <div className="text-center py-8">
                                            <Search className="h-12 w-12 text-muted-foreground dark:text-muted-foreground mx-auto mb-3" />
                                            <h4 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                                No results found
                                            </h4>
                                            <p className="text-muted-foreground dark:text-muted-foreground text-sm">
                                                Try adjusting your search terms or browse our content manually.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                                            {results.map((result) => (
                                                <Link 
                                                    key={`${result.type}-${result.id}`} 
                                                    href={result.url} 
                                                    onClick={handleClose}
                                                    className="block"
                                                >
                                                    <div className="group p-4 rounded-lg border border-border dark:border-border hover:border-destructive dark:hover:border-destructive hover:shadow-lg transition-all duration-200 bg-white/50 dark:bg-background/50 cursor-pointer">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    {getTypeIcon(result.type)}
                                                                    <Badge className={getTypeColor(result.type)}>
                                                                        {getTypeLabel(result.type)}
                                                                    </Badge>
                                                                    {result.score > 0 && (
                                                                        <Badge variant="outline" className="text-xs">
                                                                            Score: {result.score}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <h4 className="text-lg font-bold text-foreground dark:text-foreground group-hover:text-destructive dark:group-hover:text-destructive transition-colors">
                                                                    {result.title}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        
                                                        <p className="text-muted-foreground dark:text-muted-foreground text-sm leading-relaxed mb-3">
                                                            {result.excerpt}
                                                        </p>
                                                        
                                                        {result.technologies && result.technologies.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mb-3">
                                                                {result.technologies.map((tech, index) => (
                                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                                        {tech}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        )}
                                                        
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-muted-foreground">
                                                                {result.published_at && (
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="h-3 w-3" />
                                                                        {new Date(result.published_at).toLocaleDateString()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="text-muted-foreground dark:text-muted-foreground group-hover:text-destructive dark:group-hover:text-destructive transition-colors">
                                                                <span className="text-sm font-medium">View {getTypeLabel(result.type)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Show search tips when no query
                                <div className="text-center py-8">
                                    <h4 className="text-lg font-semibold text-foreground dark:text-foreground mb-6">
                                        Search Tips
                                    </h4>
                                    <div className="grid gap-4 md:grid-cols-2 text-sm max-w-2xl mx-auto">
                                        <Link href="/blog" onClick={handleClose} className="block">
                                            <div className="p-4 rounded-lg bg-muted dark:bg-muted border border-border dark:border-border hover:border-destructive dark:hover:border-destructive hover:shadow-md transition-all duration-200 cursor-pointer group">
                                                <h5 className="font-semibold text-foreground dark:text-foreground mb-2 flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-destructive dark:text-destructive" />
                                                    Blog Posts
                                                </h5>
                                                <p className="text-muted-foreground dark:text-muted-foreground group-hover:text-foreground dark:group-hover:text-foreground transition-colors">
                                                    Search titles, content, and excerpts for technical topics.
                                                </p>
                                            </div>
                                        </Link>
                                        <Link href="/projects" onClick={handleClose} className="block">
                                            <div className="p-4 rounded-lg bg-muted dark:bg-muted border border-border dark:border-border hover:border-destructive dark:hover:border-destructive hover:shadow-md transition-all duration-200 cursor-pointer group">
                                                <h5 className="font-semibold text-foreground dark:text-foreground mb-2 flex items-center gap-2">
                                                    <FolderOpen className="h-4 w-4 text-destructive dark:text-destructive" />
                                                    Projects
                                                </h5>
                                                <p className="text-muted-foreground dark:text-muted-foreground group-hover:text-foreground dark:group-hover:text-foreground transition-colors">
                                                    Find projects by name, description, or technologies.
                                                </p>
                                            </div>
                                        </Link>
                                        <div className="p-4 rounded-lg bg-muted dark:bg-muted border border-border dark:border-border">
                                            <h5 className="font-semibold text-foreground dark:text-foreground mb-2 flex items-center gap-2">
                                                <User className="h-4 w-4 text-destructive dark:text-destructive" />
                                                CV Content
                                            </h5>
                                            <p className="text-muted-foreground dark:text-muted-foreground">
                                                Search through professional experience and skills.
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-muted dark:bg-muted border border-border dark:border-border">
                                            <h5 className="font-semibold text-foreground dark:text-foreground mb-2 flex items-center gap-2">
                                                <Search className="h-4 w-4 text-destructive dark:text-destructive" />
                                                Keyboard Shortcut
                                            </h5>
                                            <p className="text-muted-foreground dark:text-muted-foreground">
                                                Press <kbd className="px-2 py-1 bg-muted-foreground/20 dark:bg-muted-foreground/10 rounded text-xs font-mono">Ctrl+K</kbd> to open search anytime.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
