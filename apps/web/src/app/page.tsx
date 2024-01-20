import {prisma} from '@repo/database';
import {Button} from '@repo/ui/components/ui/button';
import {ModeToggle} from '@repo/ui/components/ui/mode-toggle';

const Page: React.FC = async () => {
    const entities = await prisma.entity.findMany();

    return (
        <>
            <Button>This is a button</Button>

            <ModeToggle />

            <ul>
                {entities.map((entity) => (
                    <li key={entity.id}>{JSON.stringify(entity.name)}</li>
                ))}
            </ul>
        </>
    );
};

export default Page;
