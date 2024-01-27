import {getGlobalOAuthClientProviders} from '@nixyorg/auth-adapter-prisma-providers';
import Image from 'next/image';
import Link from 'next/link';
import {redirect} from 'next/navigation';

import {prisma} from '@repo/database';
import {cn} from '@repo/ui';

// import {Alert} from '~/components/alert/Alert';
// import {AuthCard} from '~/components/auth/AuthCard';
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
    };
}

const SignInPage: React.FC<SignInPageProps> = async ({searchParams: {error}}) => {
    const session = await getServerAuthSession();
    if (session) {
        redirect('/');
    }

    const providers = await getGlobalOAuthClientProviders(prisma);

    // return (
    //     <AuthCard title="Sign in to your account">
    //         {error && (
    //             <Alert className="mb-6" severity="error" title="Authentication error">
    //                 <p>{errorTexts[error] ?? errorTexts.default}</p>
    //             </Alert>
    //         )}

    //         <div className="grid grid-cols-1 gap-4">
    //             {providers.map((provider) => (
    //                 <SignInButton key={provider.id} provider={provider} />
    //             ))}
    //         </div>

    //         <div className="relative mt-6">
    //             <div className="absolute inset-0 flex items-center" aria-hidden="true">
    //                 <div className="w-full border-t border-gray-200" />
    //             </div>
    //             <div className="relative flex justify-center text-sm font-medium leading-6">
    //                 <span className="bg-white px-6 text-gray-900">Or continue with</span>
    //             </div>
    //         </div>

    //         <SignInForm />
    //     </AuthCard>
    // );

    return (
        <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="mt-[-64px] flex flex-col space-y-2 text-center">
                <Image className="mx-auto" src="/images/logo.svg" alt="MailQuail logo" width={64} height={64} />

                <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
                <p className="text-muted-foreground text-sm">Sign in with an authentication provider</p>
            </div>

            <div className={cn('grid gap-6')}>
                {providers.map((provider) => (
                    <SignInButton key={provider.id} provider={provider} />
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

                <SignInForm />
            </div>

            {/* <p className="text-muted-foreground px-8 text-center text-sm">
                <Link href="/register" className="hover:text-brand underline underline-offset-4">
                    Don&apos;t have an account? Sign Up
                </Link>
            </p> */}
        </div>
    );
};

export default SignInPage;
