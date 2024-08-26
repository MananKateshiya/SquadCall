'use client'
import React, { useContext } from 'react'

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeContext } from '@/hooks/ThemeContext'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import ThemeSelector from './ThemeSelector'


function MobileNav() {

    const pathname = usePathname();
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useContext must be used within a ThemeProvider');
    }

    const { theme } = context;

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt='Nav menu icon'
                        className='cursor-pointer sm:hidden'
                    /></SheetTrigger>
                <SheetContent side="left" className='border-none bg-dark-1 text-white'>
                    <Link href="/"
                        className='flex items-center gap-1'
                    >
                        <Image
                            src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt="SquadCall LogOut"
                            className="max-sm:size-10" />
                        <p className='text-[26px] font-extrabold text-white'>SquadCall</p>
                    </Link>

                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map((link: any) => {
                                    const isActive = pathname === link.route // || pathname.startsWith(`${link.route}/`);

                                    switch (link.type) {
                                        case 'link':
                                            return (
                                                <SheetClose asChild key={link.route}>
                                                    <Link href={link.route}
                                                        key={link.label}
                                                        className={
                                                            cn('flex gap-4 items-center p-4 rounded-xl w-full max-w-60',
                                                                { [theme]: isActive, }
                                                            )}>
                                                        <Image
                                                            src={link.imgUrl}
                                                            width={20}
                                                            height={20}
                                                            alt={link.label} />
                                                        <p className='font-semibold'>{link.label}</p>
                                                    </Link>
                                                </SheetClose>
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
                                                            link.items?.map((theme: {
                                                                label: string;
                                                                colorClass: string;
                                                            }) => {
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
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav