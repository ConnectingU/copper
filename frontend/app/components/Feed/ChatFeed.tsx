import { Flex, Box, Text, Input, FormControl, Button } from '@chakra-ui/react';
import { Message } from '../UI/Message';
import { ArrowBigRight } from 'lucide-react';

interface ChatFeed {
	currentChannelId: number;
	currentChannelName: string;
	messages: any[];
	userTyping: any;
	formik: any;
}

export function ChatFeed(props: ChatFeed) {
	return (
		<Flex direction='column' w='100%'>
			<Box w='100%' h='4rem' bgColor='rgba(0, 0, 0, 0.2)' display='flex' alignItems='center' boxShadow='2xl'>
				<Text pl={4} fontSize={16} fontWeight='bold' textColor='white'># {props.currentChannelName}</Text>
			</Box>
			<Flex
				direction='column-reverse'
				minH='calc(100vh - 8rem)'
				maxH='calc(100vh - 8rem)'
				w='100%'
				px={4}
				pt={2}
				overflow='scroll'
				css={{
					'&::-webkit-scrollbar': {
						width: '0rem',
					},
				}}
			>	
				<Text fontSize={12} pl={2} color='gray'>{props.userTyping}</Text>
				{props.messages.map((message: any, index: number) => (
					<Message
						key={index}
						message={message.content}
						name={message.user.displayName || message.user.username}
						date={message.createdAt}
						avatarUrl={message.user.avatarUrl}
						hideInfo={
							index != props.messages.length - 1 && message.user.id == props.messages[index + 1].user.id && ((new Date(message.createdAt).getTime() - new Date(props.messages[index + 1].createdAt).getTime()) <= 3600000) ? 
								true : false
							}
					/>
				))}
				<Flex direction='column'>
					<Text fontSize={20} fontWeight='bold' pl={2} textColor='white'>#{props.currentChannelName}</Text>
					<Text fontSize={12} pl={2} pb={2} color='gray'>Scroll down to see new messages</Text>
				</Flex>
			</Flex>
			<Box maxW='100%' h='4rem' display='flex' flexDirection='row' alignItems='center' boxShadow='xl' px={3}>
				<form style={{ width: '100%' }} onSubmit={props.formik.handleSubmit} autoComplete='false'>
					<Flex direction='row' minW='100%' gap={2}>
						<FormControl>
							<Input
								id='message'
								type='text'
								placeholder='Message'
								border='1px solid rgba(0, 0, 0, 0.2)'
								onChange={props.formik.handleChange}
								autoComplete='off'
								value={props.formik.values.message}
								textColor='white'
							/>
						</FormControl>
						<Button type='submit' bgColor='rgba(0, 0, 0, 0.2)'><ArrowBigRight color='gray'/></Button>
					</Flex>
				</form>
			</Box>
		</Flex>
	);
}
