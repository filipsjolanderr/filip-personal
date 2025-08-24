import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { LucideIcon, Monitor, Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AppearanceDropdown() {
    const { appearance, updateAppearance } = useAppearance();

    const appearanceOptions: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    const currentOption = appearanceOptions.find(option => option.value === appearance);
    const CurrentIcon = currentOption?.icon || Palette;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <CurrentIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle appearance</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
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
    );
}
