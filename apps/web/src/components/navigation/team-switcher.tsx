'use client';

import {CaretSortIcon, CheckIcon, PlusCircledIcon} from '@radix-ui/react-icons';
import {User} from 'next-auth';
import {useState} from 'react';

import {cn} from '@repo/ui';
import {Avatar, AvatarFallback, AvatarImage} from '@repo/ui/components/ui/avatar';
import {Button} from '@repo/ui/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from '@repo/ui/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@repo/ui/components/ui/popover';

interface TeamOptionGroup {
    label: string;
    teams: TeamOption[];
}

interface TeamOption {
    label: string;
    image?: string | null;
    value: string;
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {
    user: User;
}

export const TeamSwitcher: React.FC<TeamSwitcherProps> = ({className, user}) => {
    const groups: TeamOptionGroup[] = [
        {
            label: 'Personal Account',
            teams: [
                {
                    label: user.name ?? user.email ?? 'User',
                    image: user.image,
                    value: 'personal'
                }
            ]
        },
        {
            label: 'Teams',
            teams: [
                {
                    label: 'Acme Inc.',
                    value: 'acme-inc'
                },
                {
                    label: 'Monsters Inc.',
                    value: 'monsters'
                }
            ]
        }
    ];

    const [open, setOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<TeamOption>((groups[0] as TeamOptionGroup).teams[0] as TeamOption);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a team"
                    className={cn('w-[200px] justify-between', className)}
                >
                    <Avatar className="mr-2 h-5 w-5">
                        {selectedTeam.image && (
                            <AvatarImage src={selectedTeam.image} alt={selectedTeam.label} className="grayscale" />
                        )}
                        <AvatarFallback>{selectedTeam.label.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    {selectedTeam.label}
                    <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search team..." />
                        <CommandEmpty>No team found.</CommandEmpty>
                        {groups.map((group) => (
                            <CommandGroup key={group.label} heading={group.label}>
                                {group.teams.map((team) => (
                                    <CommandItem
                                        key={team.value}
                                        onSelect={() => {
                                            setSelectedTeam(team);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer text-sm"
                                    >
                                        <Avatar className="mr-2 h-5 w-5">
                                            {team.image && (
                                                <AvatarImage src={team.image} alt={team.label} className="grayscale" />
                                            )}
                                            <AvatarFallback>{team.label.substring(0, 1)}</AvatarFallback>
                                        </Avatar>
                                        {team.label}
                                        <CheckIcon
                                            className={cn(
                                                'ml-auto h-4 w-4',
                                                selectedTeam.value === team.value ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                }}
                            >
                                <PlusCircledIcon className="mr-2 h-5 w-5" />
                                Create Team
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
