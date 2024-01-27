import {ModeToggle} from '@repo/ui/components/ui/mode-toggle';

import {getServerAuthSession} from '~/server/auth';

const Page: React.FC = async () => {
    const session = await getServerAuthSession();

    return (
        <>
            <ModeToggle />

            <p>User: {session?.user.name}</p>
        </>
    );
};

export default Page;
