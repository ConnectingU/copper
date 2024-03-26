import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import config from '~/config';

interface MessageProps {
	message: string;
	name: string;
	avatarUrl?: string;
	date: Date;
	hideInfo?: boolean;
}

export function Message(props: MessageProps) {
	let date = new Date(props.date).toDateString();
	if (date == new Date().toDateString()) {
		date = 'Today';
	}
	const time = new Date(props.date).toLocaleTimeString();
	let formatedDate: string = date + ' ' + time.split(':')[0] + ':' + time.split(':')[1] + ' ' + time.split(' ')[1];
	return (
		<Box w='100%' pl={props.hideInfo ? 14 : 0} pt={props.hideInfo ? 0 : 2}>
			<Flex gap='2'>
				<Avatar name={props.name} bgColor='lightGray' hidden={props.hideInfo} src={`${config.api.baseUrl}/user-avatars/${props.avatarUrl}`} />
				<Flex direction='column' textColor='lightgray'>
					<Box display='flex' alignItems='center' hidden={props.hideInfo}>
						<Text fontWeight='bold' fontSize='20' textColor='white'>{props.name}</Text>
						<Text pl={2} fontWeight='light' fontSize={10} textColor='gray'>{formatedDate}</Text>
					</Box>
					{props.message}
				</Flex>
			</Flex>
		</Box>
	)
}
