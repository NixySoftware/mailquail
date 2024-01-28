import Image from 'next/image';
import {PropsWithChildren} from 'react';

export const AuthHeader: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="mt-[-64px] flex flex-col space-y-2 text-center">
            <Image className="mx-auto" src="/images/logo.svg" alt="MailQuail logo" width={64} height={64} />

            <h1 className="text-2xl font-semibold tracking-tight">{children}</h1>
        </div>
    );
};
