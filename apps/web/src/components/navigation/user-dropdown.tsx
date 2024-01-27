'use client';

import {User} from 'next-auth';
import {signOut} from 'next-auth/react';
import Link from 'next/link';

import {Avatar, AvatarFallback, AvatarImage} from '@repo/ui/components/ui/avatar';
import {Button} from '@repo/ui/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@repo/ui/components/ui/dropdown-menu';

export interface UserDropdownProps {
    user: User;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({user}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        {user.image && <AvatarImage src={user.image} alt="Profile image" />}
                        <AvatarFallback>{(user.name ?? user.email ?? 'U').substring(0, 1)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="p-2 font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-base font-medium leading-none">{user.name}</p>
                        <p className="text-muted-foreground text-sm leading-none">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="#">Settings</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={async (event) => {
                        event.preventDefault();
                        await signOut();
                    }}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
