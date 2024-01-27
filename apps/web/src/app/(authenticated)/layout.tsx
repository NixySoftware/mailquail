import {redirect} from 'next/navigation';

import {getServerAuthSession} from '~/server/auth';

const AuthenticatedLayout: React.FC<React.PropsWithChildren> = async ({children}) => {
    const session = await getServerAuthSession();

    if (!session) {
        redirect('/auth/signin');
    }

    return <>{children}</>;
};

export default AuthenticatedLayout;
