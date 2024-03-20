import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface CommentProps {
	content: string;
	name: string;
	avatarUrl?: string;
	date: Date;
}

export function Comment(props: CommentProps) {
	let date = new Date(props.date).toDateString();
	if (date == new Date().toDateString()) {
		date = 'Today';
	}
	const time = new Date(props.date).toLocaleTimeString();
	let formatedDate: string = date + ' ' + time.split(':')[0] + ':' + time.split(':')[1] + ' ' + time.split(' ')[1];
	return (
		<Box w='100%' pt={2}>
			<Flex gap='2'>
				<Avatar name={props.name} bgColor='lightGray' src={`http://localhost:8500/user-avatars/${props.avatarUrl}`} />
				<Flex direction='column' textColor='lightgray'>
					<Box display='flex' alignItems='center'>
						<Text fontWeight='bold' fontSize='20' textColor='white'>{props.name}</Text>
						<Text pl={2} fontWeight='light' fontSize={10} textColor='gray'>{formatedDate}</Text>
					</Box>
					{props.content}
				</Flex>
			</Flex>
		</Box>
	)
}
