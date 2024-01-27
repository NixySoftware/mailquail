import {User} from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import {Nav} from './nav';
import {NavLink} from './nav-link';
import {UserDropdown} from './user-dropdown';

export interface TopbarProps {
    user?: User;
}

export const Topbar: React.FC<TopbarProps> = ({user}) => {
    return (
        <div className="flex flex-col">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="flex items-center space-x-2">
                        <Image src="/images/logo.svg" alt="MailQuail logo" width={32} height={32} />
                        <Link href="/" className="hover:text-primary text-md font-medium transition-colors">
                            MailQuail
                        </Link>
                    </div>

                    {/* <TeamSwitcher /> */}
                    {user && <Nav className="mx-6" />}

                    <div className="ml-auto flex items-center space-x-4">
                        {/* <Search /> */}

                        {!user && (
                            <NavLink
                                href="/auth/signin"
                                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                                activeClassName="text-foreground"
                            >
                                Sign in
                            </NavLink>
                        )}
                        {user && <UserDropdown user={user} />}
                    </div>
                </div>
            </div>
        </div>
    );
};
