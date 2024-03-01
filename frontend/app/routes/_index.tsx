import { Wrap, Flex, Text, Image, Heading, Box, Button, FormControl, Input} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ArrowBigRight, Globe2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AuthRedirect } from '~/components/AuthRedirect';
import { Message } from '~/components/Message';
import { ChannelService, CommunityService, MessageService, UserService } from '~/services/services';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { MainLayout } from '~/components/MainLayout';

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
			const userId = Number(Cookies.get('userId'));
			socket.emit('message', {content: values.message, userId});
			const user = await UserService.getUser(userId);
			const newMessage = {content: values.message, user: user, createdAt: new Date()};
			setMessages((message: any) => [newMessage, ...messages]);
			values.message = '';
		}
	});

	socket.on('message', (message: any) => {
		const newMessage = {content: message.content, user: message.user, createdAt: message.createdAt};
		setMessages((message: any) => [newMessage, ...messages]);
	});

	useEffect(() => {
		if(currentChannel.id !== 0) {
			socket.disconnect();
			socket = io(`http://localhost:8500/message/${currentChannel.id}`);
		}
	}, [currentChannel.id]);

	useEffect(() => {
		if (currentCommunity !== 0) {
			CommunityService.getCommunity(currentCommunity).then((data): void => {
				setCommunity(data);
				setChannels(data.channels);
				setCurrentChannel({id: data.channels[0].id, name: data.channels[0].name});
			});
		}
	}, [currentCommunity]);

	useEffect(() => {
		if (currentChannel.id !== 0) {
			ChannelService.getChannel(currentChannel.id).then((data) => {
				setMessages(data.messages);
			});
		}
	}, [currentChannel])

	useEffect(() => {
		UserService.getCommunities(1).then((data) => {
			setCommunities(data);
		});
	}, []);

	return (
		<AuthRedirect>
			<Flex>
				<MainLayout>
					<Flex></Flex>
				</MainLayout>
			</Flex>
		</AuthRedirect>
	);
}
