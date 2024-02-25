import {createAdapter} from '@nixysoftware/auth-adapter-prisma-providers';
import {type AuthOptions, type DefaultSession, getServerSession} from 'next-auth';
import Email from 'next-auth/providers/email';

import {prisma} from '@repo/database';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

const adapter = createAdapter(prisma);

export const getBaseAuthOptions = (): AuthOptions => ({
    adapter,
    callbacks: {
        session: ({session, user}) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id
            }
        })
    },
    pages: {
        error: '/auth/error',
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        verifyRequest: '/auth/verify'
    },
    providers: [
        Email({
            sendVerificationRequest(params) {
                console.log(params);
            }
        })
    ]
});

export const getServerAuthSession = () => getServerSession(getBaseAuthOptions());
