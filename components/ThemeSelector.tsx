import React, { useContext } from 'react'
import {
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { ThemeContext } from '@/hooks/ThemeContext';

interface DropDownTypes {

    label: string;
    colorClass: string;
}

function ThemeSelector({ label, colorClass }: DropDownTypes) {

    const { toast } = useToast();

    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useContext must be used within a ThemeProvider');
    }

    const { setTheme } = context;

    const handleThemeChange = (newTheme: string) => {
        localStorage.setItem('currentTheme', newTheme);
        setTheme(newTheme);
        toast({
            title: "Theme changed",
            duration: 2000,
            action: <div className={`${newTheme} size-10 rounded-full p-2`}></div>,
            style: {
                width: "256px",
            },
        })
    };

    return (

        <DropdownMenuItem className='flex justify-around px-8'>
            <Button className='flex justify-start text-[1rem] w-full focus-visible:ring-0 focus-visible:ring-offset-0'
                onClick={() => { handleThemeChange(colorClass) }}>{label}</Button>
            
            <div className={`size-7 ${colorClass} rounded-full p-2`}></div>
            <DropdownMenuSeparator />
        </DropdownMenuItem>

    )
}

export default ThemeSelector