import { Avatar, HStack, Text, Box, Flex, IconButton } from "@chakra-ui/react";
import { CheckSquare, XSquare } from "lucide-react";

interface InvitationProps {
    community:      string;
    avatarUrl?:     string;
    accepted:       boolean;
    declined:       boolean;
    date:           Date;
}

export function Invitation(props: InvitationProps) {
	
    let date = new Date(props.date).toDateString();
	if (date == new Date().toDateString()) {
		date = 'Today';
	}
	let formatedDate: string = date + ' ';

	return (
        <Box w='100%'>
            <Flex>		
                <HStack alignItems='start' gap={0}>
                    <Avatar name={props.community} bgColor='lightGray' src={`http://localhost:8500/community-avatars/${props.avatarUrl}`} />
                    <Text fontSize={24} textColor='white'>{props.community}</Text>
                    <IconButton
                        isRound={true}
                        variant='solid'
                        colorScheme='teal'
                        aria-label='Done'
                        fontSize='20px'
                        icon={<CheckSquare />}
                    />
                    <IconButton
                        isRound={true}
                        variant='solid'
                        colorScheme='teal'
                        aria-label='Done'
                        fontSize='20px'
                        icon={<XSquare />}
                    />
                </HStack>
                <Text fontSize={16} textColor='white'>{formatedDate}</Text>
            </Flex>
        </Box>
	)
}
