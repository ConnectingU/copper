import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface MessageProps {
	message: string;
	name: string;
	date: Date;
}

export function Message(props: MessageProps) {
	let date = new Date(props.date).toDateString();
	if (date == new Date().toDateString()) {
		date = 'Today';
	}
	let formatedDate: string = date + ' ' + new Date(props.date).toLocaleTimeString();
	return (
		<>
			<Box w='512px'>
				<Flex alignItems='center' gap='2'>
					<Avatar name={props.name} bgColor='lightGray' />
					<Flex direction='column'>
						<Box display='flex' alignItems='center'>
							<Text fontWeight='bold' fontSize='20'>{props.name}</Text>
							<Text pl={2} fontWeight='light' fontSize={10}>{formatedDate}</Text>
						</Box>
						{props.message}
					</Flex>
				</Flex>
			</Box>
		</>
	)
}