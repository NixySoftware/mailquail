import Link from 'next/link';

import {cn} from '@repo/ui';

export const Nav: React.FC<React.HTMLAttributes<HTMLElement>> = ({className, ...props}) => {
    return (
        <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
            <Link href="#" className="hover:text-primary text-sm font-medium transition-colors">
                Overview
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                Customers
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                Products
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                Settings
            </Link>
        </nav>
    );
};
