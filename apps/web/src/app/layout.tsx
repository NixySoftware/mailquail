import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

import {ThemeProvider} from '@repo/ui/components/theme-provider';
import '@repo/ui/styles/globals.css';

import {Layout} from '~/components/layout/layout';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans'
});

export const metadata: Metadata = {
    title: 'MailQuail',
    description: '',
    icons: [{rel: 'icon', url: '/favicon.ico'}]
};

const RootLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Layout>{children}</Layout>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
