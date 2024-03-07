import { Flex, Box, Text, Input, FormControl, Button } from "@chakra-ui/react";
import { Message } from "./Message";
import { ArrowBigRight } from "lucide-react";

interface ChatFeed {
	currentChannelId: number;
	currentChannelName: string;
	messages: any;
	formik: any;
}

export function ChatFeed(props: ChatFeed) {
	return (
		<Flex direction='column'>
			<Box w='80vw' h='6vh' bgColor='#FFB669' display='flex' alignItems='center' boxShadow='2xl' borderBottom='1px' borderColor='gray'>
				<Text pl={4} fontSize={16} fontWeight='bold'># {props.currentChannelName}</Text>
			</Box>
			<Flex direction='column-reverse' h='88vh' gap={3} px={4} pt={2} overflow='scroll'>
				{props.messages.map((message: any, index: number) => (
					<Message key={index} message={message.content} name={message.user.displayName || message.user.username} date={message.createdAt} />
				))}
			</Flex>
			<form onSubmit={props.formik.handleSubmit}>
				<Box w='80vw' h='6vh' display='flex' flexDirection='row' alignItems='center' boxShadow='xl' px={3}>
					<FormControl>
						<Input
							id='message'
							type='text'
							placeholder='Message'
							onChange={props.formik.handleChange}
							value={props.formik.values.message}
							w='75vw'
						/>
					</FormControl>
					<Button type='submit' bgColor='#FFCC9F'><ArrowBigRight/></Button>
				</Box>
			</form>
		</Flex>
	);
}