import {prisma} from '@repo/database';
import {Button, ModeToggle} from '@repo/ui';

import {getServerAuthSession} from '~/server/auth';

const Page: React.FC = async () => {
    const session = await getServerAuthSession();
    const entities = await prisma.entity.findMany();

    return (
        <>
            <Button>This is a button</Button>

            <ModeToggle />

            <p>User: {session?.user.name}</p>

            <ul>
                {entities.map((entity) => (
                    <li key={entity.id}>{JSON.stringify(entity.name)}</li>
                ))}
            </ul>
        </>
    );
};

export default Page;
