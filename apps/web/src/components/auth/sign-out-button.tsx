'use client';

import {signOut} from 'next-auth/react';
import {useState} from 'react';

import {Button} from '@repo/ui/components/ui/button';

export const SignOutButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);

        await signOut({
            callbackUrl: '/auth/signin'
        });
    };

    return (
        <Button disabled={isLoading} onClick={handleClick}>
            Sign out
        </Button>
    );
};
