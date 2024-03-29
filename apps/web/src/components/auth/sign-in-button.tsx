'use client';

import type {OAuthClientProvider} from '@prisma/client';
import {signIn} from 'next-auth/react';
import Image from 'next/image';
import {useState} from 'react';

import {cn} from '@repo/ui';
import {Button} from '@repo/ui/components/ui/button';

import {PROVIDER_CLASS_BY_TYPE} from './providers';

export interface SignInButtonProps {
    provider: OAuthClientProvider;
    callbackUrl: string;
}

export const SignInButton: React.FC<SignInButtonProps> = ({provider, callbackUrl}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);

        await signIn(provider.id, {
            callbackUrl
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
