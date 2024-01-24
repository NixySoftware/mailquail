import Image from 'next/image';
import Link from 'next/link';

import {Nav} from './nav';
import {UserDropdown} from './user-dropdown';

export const Topbar: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="flex items-center space-x-2">
                        <Image src="/images/logo.svg" alt="MailQuail logo" width={32} height={32} />
                        <Link href="#" className="hover:text-primary text-md font-medium transition-colors">
                            MailQuail
                        </Link>
                    </div>

                    {/* <TeamSwitcher /> */}
                    <Nav className="mx-6" />

                    <div className="ml-auto flex items-center space-x-4">
                        {/* <Search /> */}
                        <UserDropdown />
                    </div>
                </div>
            </div>
        </div>
    );
};
