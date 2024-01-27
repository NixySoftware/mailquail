'use client';

import Link, {LinkProps} from 'next/link';
import {usePathname} from 'next/navigation';

import {cn} from '@repo/ui';

type AnchorAndLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

export interface NavLinkProps extends AnchorAndLinkProps {
    activeClassName?: string;
    nonActiveClassName?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({className, activeClassName, nonActiveClassName, href, ...props}) => {
    const pathname = usePathname();

    return (
        <Link
            className={cn(className, href === pathname ? activeClassName : nonActiveClassName)}
            href={href}
            {...props}
        ></Link>
    );
};
