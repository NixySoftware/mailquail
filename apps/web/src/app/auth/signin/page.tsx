import {getGlobalOAuthClientProviders} from '@nixyorg/auth-adapter-prisma-providers';
import {redirect} from 'next/navigation';

import {prisma} from '@repo/database';
import {cn} from '@repo/ui';
import {Alert, AlertDescription, AlertTitle} from '@repo/ui/components/ui/alert';

import {AuthHeader} from '~/components/auth/auth-header';
import {SignInButton} from '~/components/auth/sign-in-button';
import {SignInForm} from '~/components/auth/sign-in-form';
import {getServerAuthSession} from '~/server/auth';

const errorTexts: Record<string, string | undefined> = {
    default: 'Unable to sign in.',
    Callback: 'Try signing in with a different account.',
    CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
    EmailCreateAccount: 'Try signing in with a different account.',
    EmailSignin: 'The e-mail could not be sent.',
    OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
    OAuthCallbackError: 'Try signing in with a different account.',
    OAuthCreateAccount: 'Try signing in with a different account.',
    OAuthSignin: 'Try signing in with a different account.',
    SessionRequired: 'Please sign in to access this page.',
    Signin: 'Try signing in with a different account.'
};

interface SignInPageProps {
    searchParams: {
        error?: string;
        from?: string;
    };
}

const SignInPage: React.FC<SignInPageProps> = async ({searchParams: {error, from}}) => {
    const session = await getServerAuthSession();
    if (session) {
        redirect('/');
    }

    const providers = await getGlobalOAuthClientProviders(prisma);
    const callbackUrl = from ?? '/';

    return (
        <>
            <AuthHeader>Sign in</AuthHeader>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorTexts[error] ?? errorTexts.default}</AlertDescription>
                </Alert>
            )}

            <div className={cn('grid gap-6')}>
                {providers.map((provider) => (
                    <SignInButton key={provider.id} provider={provider} callbackUrl={callbackUrl} />
                ))}

                {providers.length > 0 && (
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background text-muted-foreground px-2">Or continue with</span>
                        </div>
                    </div>
                )}

                <SignInForm callbackUrl={callbackUrl} />
            </div>

            {/* <p className="text-muted-foreground px-8 text-center text-sm">
                <Link href="/register" className="hover:text-brand underline underline-offset-4">
                    Don&apos;t have an account? Sign Up
                </Link>
            </p> */}
        </>
    );
};

export default SignInPage;
