import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from "@remix-run/react";
import { AuthRedirect } from '~/components/AuthRedirect';
import { ChannelService, CommunityService, UserService } from '~/services/services';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { MainLayout } from '~/components/MainLayout';
import { FeedSelector } from '~/components/FeedSelector';
import { ChatFeed } from '~/components/ChatFeed';

let socket = io();

export default function CommunityPage() {
	const { communityId, channelId } = useParams();
	const currentCommunity: number = Number(communityId);
	const currentChannelId: number = Number(channelId);
	const [currentChannelName, setCurrentChannelName] = useState('');
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
		if(currentChannelId !== 0) {
			socket.disconnect();
			socket = io(
				`http://localhost:8500/message/${currentChannelId}`, {
					reconnection: false,
					reconnectionAttempts: 3,
				}
			);
		}
	}, [currentChannelId]);

	useEffect(() => {
		CommunityService.getCommunity(currentCommunity).then((data): void => {
			setCommunity({...data, id: currentCommunity});
			setChannels(data.channels);
		});
	}, [currentCommunity]);

	useEffect(() => {
		if (currentChannelId!== 0) {
			ChannelService.getChannel(currentChannelId).then((data) => {
				setCurrentChannelName(data.name);
				setMessages(data.messages);
			});
		}
	}, [currentChannelId]);

	return (
		<AuthRedirect>
			<Flex>
				<MainLayout>
					<FeedSelector community={community} channels={channels} />
					<ChatFeed currentChannelId={currentChannelId} currentChannelName={currentChannelName} messages={messages} formik={formik} />
				</MainLayout>
			</Flex>
		</AuthRedirect>
	);
}
