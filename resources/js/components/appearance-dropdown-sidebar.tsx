import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { LucideIcon, Monitor, Moon, Sun, Palette } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AppearanceDropdownSidebar() {
    const { appearance, updateAppearance } = useAppearance();

    const appearanceOptions: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    const currentOption = appearanceOptions.find(option => option.value === appearance);
    const CurrentIcon = currentOption?.icon || Palette;

    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between">
                        <div className="flex items-center gap-2">
                            <CurrentIcon className="h-5 w-5" />
                            <span>Appearance</span>
                        </div>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuRadioGroup value={appearance} onValueChange={(value) => updateAppearance(value as Appearance)}>
                        {appearanceOptions.map(({ value, icon: Icon, label }) => (
                            <DropdownMenuRadioItem key={value} value={value} className="cursor-pointer">
                                <Icon className="mr-2 h-4 w-4" />
                                {label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}
