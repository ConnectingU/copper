import { Wrap, Flex, Text, Image, Heading, Box, Button, FormControl, Input} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ArrowBigRight, Globe2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AuthRedirect } from '~/components/AuthRedirect';
import { Message } from '~/components/UI/Message';
import { ChannelService, CommunityService, MessageService, UserService } from '~/services';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { CommunitySelector } from '~/components/CommunitySelector';
import { Post } from '~/components/UI/Post';

export default function Index() {
	const [currentCommunity, setCurrentCommunity] = useState(3);
	const [currentChannel, setCurrentChannel] = useState({id: 0, name: ''});
	const [communities, setCommunities] = useState([]);
	const [community, setCommunity] = useState({});
	const [channels, setChannels] = useState([]);
	const [messages, setMessages] = useState<any>([]);
	const [posts, setPosts] = useState<any>([])

	const formik = useFormik({
		initialValues: {
			message: '',
		},
		onSubmit: async (values) => {
			const userId = Number(Cookies.get('userId'));
			const user = await UserService.getUser(userId);
			const newMessage = {content: values.message, user: user, createdAt: new Date()};
			setMessages((message: any) => [newMessage, ...messages]);
			values.message = '';
		}
	});

	useEffect(() => {
		if (currentCommunity !== 0) {
			CommunityService.getCommunity(currentCommunity).then((data): void => {
				setCommunity(data);
				setChannels(data.channels);
				setPosts(data.posts);
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
				<Flex w='100%'>
					<Box w='100%'>
						<Flex direction='column' h='100vh' gap={3} px={4} pt={2} overflow='scroll' alignItems='center'>
							{posts.map((post: any, index: number) => (
								<Post key={index} title={post.title} description={post.content} name={post.user.displayName || post.user.username} date={post.createdAt} />
							))}
						</Flex>
					</Box>

				</Flex>
		</AuthRedirect>
	);
}
