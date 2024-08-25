'use client'

import React, { useContext } from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ThemeSelector from './ThemeSelector';
import { ThemeContext, ThemeProvider } from '@/hooks/ThemeContext';

function Sidebar() {

    const pathname = usePathname();
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useContext must be used within a ThemeProvider');
    }

    const { theme } = context;


    return (

        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
            <div className="flex flex-1 flex-col gap-6">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                    switch (link.type) {
                        case 'link':
                            return (
                                <Link href={link.route}
                                    key={link.label}
                                    className={
                                        cn('theme-component flex gap-4 items-center p-4 rounded-xl justify-start',
                                            { [theme]: isActive, }
                                        )}>
                                    <Image
                                        src={link.imgUrl}
                                        width={24}
                                        height={24}
                                        alt={link.label} />
                                    <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                                </Link>
                            )
                        case 'dropdown':
                            return (
                                <DropdownMenu key={link.label} >
                                    <DropdownMenuTrigger className={
                                        cn('flex gap-4 items-center p-4 rounded-xl justify-start hover:bg-dark-3')}>
                                        <Image
                                            src={link.imgUrl}
                                            width={24}
                                            height={24}
                                            alt={link.label}
                                        />
                                        <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className='border-dark-3 bg-dark-3 cursor-pointer min-w-[236px] text-white '>
                                        <DropdownMenuLabel className='text-lg'>Theme</DropdownMenuLabel>

                                        {
                                            link.items?.map((theme) => {
                                                return (
                                                    <div key={theme.label}>
                                                        <ThemeSelector
                                                            label={theme.label}
                                                            colorClass={theme.colorClass}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                    }
                })}
            </div>
        </section>

    );
}

export default Sidebar;
