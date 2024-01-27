'use client';

import type {OAuthClientProvider} from '@prisma/client';
import {signIn} from 'next-auth/react';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import {useState} from 'react';

import {cn} from '@repo/ui';
import {Button} from '@repo/ui/components/ui/button';

import {PROVIDER_CLASS_BY_TYPE} from './providers';

export interface SignInButtonProps {
    provider: OAuthClientProvider;
}

export const SignInButton: React.FC<SignInButtonProps> = ({provider}) => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);

        await signIn(provider.id, {
            callbackUrl: searchParams.get('from') ?? '/'
        });
    };

    return (
        <Button
            className={cn('gap-3', PROVIDER_CLASS_BY_TYPE[provider.type])}
            variant="outline"
            disabled={isLoading}
            onClick={handleClick}
        >
            <Image
                className="h-5 w-5"
                src={`https://authjs.dev/img/providers/${provider.type.toLowerCase()}.svg`}
                alt="Icon"
                width={20}
                height={20}
            />
            <span>Sign in with {provider.name}</span>
        </Button>
    );
};
