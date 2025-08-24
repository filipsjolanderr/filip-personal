"use client"

import * as React from "react"
import { BookOpen, Folder, User, Calendar, ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

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

interface CommandSearchProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = React.useState(false);

    console.log('CommandSearch rendered with open:', open);

    // Handle Ctrl+K keyboard shortcut
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onOpenChange(true)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [onOpenChange])

    // Debounced search function
    const debouncedSearch = React.useCallback(
        (() => {
            let timeoutId: NodeJS.Timeout;
            return (searchQuery: string) => {
                console.log('Debounced search called with:', searchQuery);
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    console.log('Executing debounced search for:', searchQuery);
                    performSearch(searchQuery);
                }, 300);
            };
        })(),
        []
    );

    // Trigger search when query changes
    React.useEffect(() => {
        if (query.trim()) {
            debouncedSearch(query);
        } else {
            setResults([]);
        }
    }, [query, debouncedSearch]);

    // Debug: Log when results change
    React.useEffect(() => {
        console.log('Results state changed:', results);
    }, [results]);

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        console.log('Performing search for:', searchQuery);
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=all`);
            console.log('Search response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Search results data:', data);
            console.log('Results array:', data.results);
            console.log('Results length:', data.results?.length);
            
            setResults(data.results || []);
            console.log('State updated with results:', data.results || []);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const getTypeIcon = (resultType: string) => {
        switch (resultType) {
            case 'blog':
                return <BookOpen className="h-4 w-4" />;
            case 'project':
                return <Folder className="h-4 w-4" />;
            case 'cv':
                return <User className="h-4 w-4" />;
            default:
                return <BookOpen className="h-4 w-4" />;
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

    const handleClose = () => {
        setQuery("");
        setResults([]);
        onOpenChange(false);
    };

    return (
        <CommandDialog open={open} onOpenChange={handleClose}>
            <CommandInput 
                placeholder="Search for anything..." 
                value={query}
                onValueChange={setQuery}
            />
            <CommandList>
                
                {/* Always show searching state when searching */}
                {isSearching && (
                    <CommandEmpty>Searching...</CommandEmpty>
                )}

                {/* Always show search results when they exist */}
                {results.length > 0 && (
                    <CommandGroup heading={`Search Results (${results.length})`}>
                        {results.map((result) => (
                            <Link key={`${result.type}-${result.id}`} href={result.url} onClick={handleClose}>
                                <CommandItem className="cursor-pointer">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium truncate">{result.title}</span>
                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                                {getTypeLabel(result.type)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {result.excerpt}
                                        </p>
                                        {result.published_at && (
                                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(result.published_at).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                )}

                {/* Show no results only when not searching and no results */}
                {!isSearching && query && results.length === 0 && (
                    <CommandEmpty>No results found.</CommandEmpty>
                )}

                {/* Show quick actions only when no query */}
                {!query && (
                    <>
                        <CommandGroup heading="Quick Actions">
                            <Link href="/blog" onClick={handleClose}>
                                <CommandItem className="cursor-pointer">
                                    <BookOpen className="h-4 w-4" />
                                    <span>Browse Blog Posts</span>
                                </CommandItem>
                            </Link>
                            <Link href="/projects" onClick={handleClose}>
                                <CommandItem className="cursor-pointer">
                                    <Folder className="h-4 w-4" />
                                    <span>View Projects</span>
                                </CommandItem>
                            </Link>
                            <Link href="/cv" onClick={handleClose}>
                                <CommandItem className="cursor-pointer">
                                    <User className="h-4 w-4" />
                                    <span>View CV</span>
                                </CommandItem>
                            </Link>
                        </CommandGroup>
                    
                    </>
                )}
            </CommandList>
        </CommandDialog>
    )
}
