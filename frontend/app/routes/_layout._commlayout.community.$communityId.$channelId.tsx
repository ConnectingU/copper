import { Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from "@remix-run/react";
import { AuthRedirect } from '~/components/Util/AuthRedirect';
import { ChannelService, HistoryService, UserService } from '~/services';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { ChatFeed } from '~/components/Feed/ChatFeed';

let socket = io('http://localhost:8500/message/');

export default function CommunityPage() {
	const { communityId, channelId } = useParams();
	const currentCommunity: number = Number(communityId);
	const currentChannelId: number = Number(channelId);
	const [currentChannelName, setCurrentChannelName] = useState('');
	const [messages, setMessages] = useState<any>([]);
	const [userTyping, setUserTyping] = useState('');

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

	socket.on('typing', (message: any) => {
		if (message.isTyping) setUserTyping(`${message.displayName} is typing...`);
		else setUserTyping('');
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
		if (currentChannelId!== 0) {
			ChannelService.getChannel(currentChannelId).then((data) => {
				setCurrentChannelName(data.name);
				setMessages(data.messages);
			});
		}
	}, [currentChannelId]);

	useEffect(() => {
		if (formik.values.message.length > 0) {
			socket.emit('typing', {userId: Number(Cookies.get('userId')), isTyping: true});
		}
		if (formik.values.message.length === 0) {
			socket.emit('typing', {userId: Number(Cookies.get('userId')), isTyping: false});
		}
	}, [formik.values.message]);

	useEffect(() => {
		const userId = Number(Cookies.get('userId'));
		HistoryService.updateHistory(userId, currentChannelId, new Date())
	}, [currentChannelId]);

	return (
		<AuthRedirect>
			<Flex w='100%'>
				<ChatFeed currentChannelId={currentChannelId} currentChannelName={currentChannelName} messages={messages} userTyping={userTyping} formik={formik} />
			</Flex>
		</AuthRedirect>
	);
}
