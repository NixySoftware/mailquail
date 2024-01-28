import Link from 'next/link';
import {redirect} from 'next/navigation';

import {Alert, AlertDescription, AlertTitle} from '@repo/ui/components/ui/alert';
import {Button} from '@repo/ui/components/ui/button';

import {AuthHeader} from '~/components/auth/auth-header';
import {getServerAuthSession} from '~/server/auth';

const VerifyPage: React.FC = async () => {
    const session = await getServerAuthSession();
    if (session) {
        redirect('/');
    }

    return (
        <>
            <AuthHeader>Sign in</AuthHeader>

            <Alert>
                <AlertTitle>Check your email</AlertTitle>
                <AlertDescription>A sign in link has been sent to your email address.</AlertDescription>
            </Alert>

            <Button variant="outline" asChild>
                <Link href="/auth/signin">Go back to sign in</Link>
            </Button>
        </>
    );
};

export default VerifyPage;
