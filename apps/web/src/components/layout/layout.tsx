import type {PropsWithChildren} from 'react';

import {getServerAuthSession} from '~/server/auth';

import {Topbar} from '../navigation/topbar';

export const Layout: React.FC<PropsWithChildren> = async ({children}) => {
    const session = await getServerAuthSession();

    return (
        <>
            <header className="fixed inset-x-0">
                <Topbar user={session?.user} />
            </header>

            <main className="container h-screen w-screen pt-16">{children}</main>

            <footer />
        </>
    );
};
