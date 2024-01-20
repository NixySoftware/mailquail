import '@repo/ui/styles/globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans'
});

export const metadata: Metadata = {
    title: 'MailQuail',
    description: ''
};

const RootLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
};

export default RootLayout;
