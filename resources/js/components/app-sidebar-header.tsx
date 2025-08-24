import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { CommandSearch } from './command-search';
import AppearanceDropdown from './appearance-dropdown';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);



    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
                <div className="flex items-center gap-2 flex-1">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                
                {/* Search and Appearance Controls */}
                <div className="flex items-center gap-2">
                    {/* Search Button */}
                    <button
                        onClick={() => {
                            console.log('Search button clicked, setting isSearchOpen to true');
                            setIsSearchOpen(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        title="Search (Ctrl+K)"
                    >
                        <Search className="h-4 w-4" />
                    </button>
                    
                    {/* Appearance Toggle */}
                    <AppearanceDropdown />
                </div>
            </header>
            
            {/* Command Search */}
            <CommandSearch 
                open={isSearchOpen} 
                onOpenChange={setIsSearchOpen} 
            />
        </>
    );
}
