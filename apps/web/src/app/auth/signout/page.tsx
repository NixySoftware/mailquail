import {redirect} from 'next/navigation';

import {AuthHeader} from '~/components/auth/auth-header';
import {SignOutButton} from '~/components/auth/sign-out-button';
import {getServerAuthSession} from '~/server/auth';

const SignOutPage: React.FC = async () => {
    const session = await getServerAuthSession();
    if (!session) {
        redirect('/auth/signin');
    }

    return (
        <>
            <AuthHeader>Sign out</AuthHeader>

            <SignOutButton />
        </>
    );
};

export default SignOutPage;
