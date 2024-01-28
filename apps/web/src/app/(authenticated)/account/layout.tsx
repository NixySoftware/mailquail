import {Button} from '@repo/ui/components/ui/button';
import {Separator} from '@repo/ui/components/ui/separator';

import {NavLink} from '~/components/navigation/nav-link';

const AccountLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <div className="space-y-6 pb-16 pt-10">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Account</h2>
                <p className="text-muted-foreground">Manage your account settings and set email preferences.</p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                        <Button className="justify-start hover:underline" variant="ghost" asChild>
                            <NavLink
                                href="/account/profile"
                                activeClassName="bg-muted"
                                nonActiveClassName="hover:bg-transparent"
                            >
                                Profile
                            </NavLink>
                        </Button>
                        <Button className="justify-start hover:underline" variant="ghost" asChild>
                            <NavLink
                                href="/account/email-addresses"
                                activeClassName="bg-muted"
                                nonActiveClassName="hover:bg-transparent"
                            >
                                Email addresses
                            </NavLink>
                        </Button>
                        <Button className="justify-start hover:underline" variant="ghost" asChild>
                            <NavLink
                                href="/account/connections"
                                activeClassName="bg-muted"
                                nonActiveClassName="hover:bg-transparent"
                            >
                                Connections
                            </NavLink>
                        </Button>
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    );
};

export default AccountLayout;
