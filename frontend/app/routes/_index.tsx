import { Wrap, Flex, Text, Image, Heading, Box, Button, FormControl, Input} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ArrowBigRight, Globe2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AuthRedirect } from '~/components/AuthRedirect';
import { Message } from '~/components/Message';
import { getChannel } from '~/services/channel.service';
import { getCommunity } from '~/services/community.service';
import { sendMessage } from '~/services/messages.service';
import { getCommunities } from '~/services/user.service';
import io from 'socket.io-client';

let socket = io('http://localhost:8500/message/1');

export default function Index() {
	const [currentCommunity, setCurrentCommunity] = useState(0);
	const [currentChannel, setCurrentChannel] = useState({id: 0, name: ''});
	const [communities, setCommunities] = useState([]);
	const [community, setCommunity] = useState({});
	const [channels, setChannels] = useState([]);
	const [messages, setMessages] = useState<any>([]);
	const formik = useFormik({
		initialValues: {
			message: '',
		},
		onSubmit: async (values) => {
			socket.emit('message', {content: values.message, userId: 1});
			values.message = '';
		}
	});

	// 

	useEffect(() => {
		if(currentChannel.id !== 0) {
			socket.disconnect();
			socket = io(`http://localhost:8500/message/${currentChannel.id}`);
		}
	}, [currentChannel.id]);

	useEffect(() => {
		if (currentCommunity !== 0) {
			getCommunity(currentCommunity).then((data): void => {
				setCommunity(data);
				setChannels(data.channels);
				setCurrentChannel({id: data.channels[0].id, name: data.channels[0].name});
			});
		}
	}, [currentCommunity]);

	useEffect(() => {
		if (currentChannel.id !== 0) {
			getChannel(currentChannel.id).then((data) => {
				setMessages(data.messages);
			});
		}
	}, [currentChannel])

	useEffect(() => {
		getCommunities(1).then((data) => {
			setCommunities(data);
		});
	}, []);

	return (
		<AuthRedirect>
			<Flex>
				<Box w='5vw' h='100vh' justifyItems='center' bgColor='#FF6600' borderRight='1px' borderColor='gray'>
					<Flex alignItems='center' gap={3} direction='column' h='100%' pt={3}>
						<Button w={14} h={14}><Globe2 /></Button>
						{communities.map((community: any, index: number) => (
							<Button
								key={index}
								w={14}
								h={14}
								onClick={() => {
									setCurrentCommunity(community.id)
								}}
							>
								{community.name.charAt(0)}
							</Button>
						))}
					</Flex>
				</Box>
				<Box w='15vw' h='100vh' justifyItems='center' bgColor='#FF7C36' borderRight='1px' borderColor='gray' boxShadow='2xl'>
					<Flex alignItems='center' gap={2} direction='column' h='100%' pt={3}>
						<Text fontSize={18} fontWeight='bold'>{(community as { name: string }).name}</Text>
						{channels.map((channel: any, index: number) => (
							<Button
								key={index}
								w={236}
								h={8}
								onClick={() => {
									setCurrentChannel({id: channel.id, name: channel.name})
								}}
							>
								#{channel.name}
							</Button>
						))}
					</Flex>
				</Box>
				<Flex direction='column'>
					<Box w='80vw' h='6vh' bgColor='#FFB669' display='flex' alignItems='center' boxShadow='2xl' borderBottom='1px' borderColor='gray'>
						<Text pl={4} fontSize={16} fontWeight='bold'># {currentChannel.name}</Text>
					</Box>
					<Flex direction='column-reverse' h='88vh' gap={3} px={4} pt={2} overflow='scroll'>
						{messages.map((message: any, index: number) => (
							<Message key={index} message={message.content} name={message.user.displayName || message.user.username} date={message.createdAt} />
						))}
					</Flex>
					<form onSubmit={formik.handleSubmit}>
						<Box w='80vw' h='6vh' display='flex' flexDirection='row' alignItems='center' boxShadow='xl' px={3}>
							<FormControl>
								<Input
									id='message'
									type='text'
									placeholder='Message'
									onChange={formik.handleChange}
									value={formik.values.message}
									w='75vw'
								/>
							</FormControl>
							<Button type='submit' bgColor='#FFCC9F'><ArrowBigRight/></Button>
						</Box>
					</form>
				</Flex>
			</Flex>
		</AuthRedirect>
	);
}
