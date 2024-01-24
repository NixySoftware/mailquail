import {prisma} from '@repo/database';
import {Button} from '@repo/ui/components/ui/button';
import {ModeToggle} from '@repo/ui/components/ui/mode-toggle';

import {Topbar} from '~/components/navigation/topbar';
import {getServerAuthSession} from '~/server/auth';

const Page: React.FC = async () => {
    const session = await getServerAuthSession();
    const entities = await prisma.entity.findMany();

    return (
        <>
            <Topbar />

            <div className="flex-1 space-y-4 p-8 pt-6">
                <Button>This is a button</Button>

                <ModeToggle />

                <p>User: {session?.user.name}</p>

                <ul>
                    {entities.map((entity) => (
                        <li key={entity.id}>{JSON.stringify(entity.name)}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Page;
