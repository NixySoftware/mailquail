import {cn} from '@repo/ui';

import {NavLink} from './nav-link';

export const Nav: React.FC<React.HTMLAttributes<HTMLElement>> = ({className, ...props}) => {
    return (
        <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
            <NavLink
                href="/"
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                activeClassName="text-foreground"
            >
                Overview
            </NavLink>
            <NavLink
                href="#"
                className="text-muted-foreground  hover:text-primary text-sm font-medium transition-colors"
                activeClassName="text-foreground"
            >
                Mail accounts
            </NavLink>
            <NavLink
                href="#"
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                activeClassName="text-foreground"
            >
                Mail servers
            </NavLink>
            <NavLink
                href="#"
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                activeClassName="text-foreground"
            >
                Settings
            </NavLink>
        </nav>
    );
};
