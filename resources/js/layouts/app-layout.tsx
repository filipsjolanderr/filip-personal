import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    variant?: 'sidebar' | 'header';
}

export default ({ children, breadcrumbs, variant = 'header', ...props }: AppLayoutProps) => {
    if (variant === 'header') {
        return (
            <AppHeaderLayout breadcrumbs={breadcrumbs} {...props}>
                {children}
            </AppHeaderLayout>
        );
    }

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppSidebarLayout>
    );
};
