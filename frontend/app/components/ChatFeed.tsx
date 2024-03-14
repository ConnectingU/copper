import { Flex, Box, Text, Input, FormControl, Button } from "@chakra-ui/react";
import { Message } from "./Message";
import { ArrowBigRight } from "lucide-react";
import { colours } from "~/ui-config";

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
			<Box w='100%' h='4rem' bgColor={colours['channel-top-bar']} display='flex' alignItems='center' boxShadow='2xl' borderBottom='1px' borderColor='gray'>
				<Text pl={4} fontSize={16} fontWeight='bold'># {props.currentChannelName}</Text>
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
						width: '0.4rem',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#FFB669',
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
					<Text fontSize={20} fontWeight='bold' pl={2}>#{props.currentChannelName}</Text>
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
								onChange={props.formik.handleChange}
								autoComplete="off"
								value={props.formik.values.message}
							/>
						</FormControl>
						<Button type='submit' bgColor='#FFCC9F'><ArrowBigRight/></Button>
					</Flex>
				</form>
			</Box>
		</Flex>
	);
}
