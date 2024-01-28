import Link from 'next/link';

import {Alert, AlertDescription, AlertTitle} from '@repo/ui/components/ui/alert';
import {Button} from '@repo/ui/components/ui/button';

import {AuthHeader} from '~/components/auth/auth-header';

interface ErrorVariant {
    title: string;
    description: string;
}

const errorVariants: Record<string, ErrorVariant> = {
    default: {
        title: 'Server error',
        description: 'A server error occurred, please try again later.'
    },
    Configuration: {
        title: 'Server error',
        description: 'There is a problem with the server configuration. Check the server logs for more information.'
    },
    AccessDenied: {
        title: 'Access Denied',
        description: 'You do not have permission to sign in.'
    },
    Verification: {
        title: 'Unable to sign in',
        description: 'The sign in link is no longer valid. It may have been used already or it may have expired.'
    }
};

interface ErrorPageProps {
    searchParams: {
        error?: string;
    };
}

const ErrorPage: React.FC<ErrorPageProps> = ({searchParams: {error}}) => {
    const variant = (errorVariants[error ?? 'default'] ?? errorVariants.default) as ErrorVariant;

    return (
        <>
            <AuthHeader>Sign in</AuthHeader>

            <Alert variant="destructive">
                <AlertTitle>{variant.title}</AlertTitle>
                <AlertDescription>{variant.description}</AlertDescription>
            </Alert>

            <Button asChild>
                <Link href="/auth/signin">Go back to sign in</Link>
            </Button>
        </>
    );
};

export default ErrorPage;
