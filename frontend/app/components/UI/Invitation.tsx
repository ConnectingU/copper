import { HStack, Text, Box, Flex, IconButton, Avatar } from '@chakra-ui/react';
import { CheckSquare, XSquare } from 'lucide-react';
import { InvitationService, CommunityUserService } from '~/services';


interface InvitationProps {
    id:             number;
    userId:         number;
    communityId:    number;
    communityName:  string;
    avatarUrl?:     string;
    accepted:       boolean;
    declined:       boolean;
    date:           Date;
}

export function Invitation(props: InvitationProps) {

    const acceptInvite = () => {
        InvitationService.updateInvitation(props.id, true, false);
        CommunityUserService.createCommunityUser(props.userId, props.communityId);
        window.location.reload();
    };

    const declineInvite = () => {
        InvitationService.updateInvitation(props.id, false, true);
        window.location.reload();
    };

    let date = new Date(props.date).toDateString();
	if (date == new Date().toDateString()) {
		date = 'Today';
	}
	let formatedDate: string = date + ' ';

	return (
        <Box w='100%' border='1px' borderColor='gray.200' borderRadius='md' p={4}>
            <Flex justifyContent='space-between' alignItems='center'>		
                <HStack alignItems='start' gap={2}>
                    <Avatar name={props.communityName} bgColor='lightGray' src={`http://localhost:8500/community-avatars/${props.avatarUrl}`} />
                    <Text fontSize={20} pt={2} textColor='white'>{props.communityName}</Text>
                </HStack>
                <HStack>
                    <IconButton
                        mr={2}
                        isRound={true}
                        variant='solid'
                        colorScheme='blue'
                        aria-label='Done'
                        fontSize='20px'
                        type={'submit'}
                        onClick={acceptInvite}
                        icon={<CheckSquare />}
                    />
                    <IconButton
                        mr={2}
                        isRound={true}
                        variant='solid'
                        colorScheme='blue'
                        aria-label='Done'
                        fontSize='20px'
                        onClick={declineInvite}
                        icon={<XSquare />}
                    />    
                </HStack>
            </Flex>
            <Box border='1px' borderColor='gray.200' borderRadius='md' mt={2} p={2}>
                <Text fontSize={12} textColor='white'>{formatedDate}</Text>
            </Box>
        </Box>
	)
}
