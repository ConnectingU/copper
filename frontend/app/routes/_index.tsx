import { Wrap, Flex, Text, Image, Link, Heading, Box, Button, FormControl, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { ArrowBigRight, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthRedirect } from "~/components/AuthRedirect";
import { Message } from "~/components/Message";
import { ChannelService, CommunityService, MessageService, UserService } from "~/services/services";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { MainLayout } from "~/components/MainLayout";
import { Post } from "~/components/Post";

export default function Index() {
	const [currentCommunity, setCurrentCommunity] = useState(3);
	const [currentChannel, setCurrentChannel] = useState({ id: 0, name: "" });
	const [communities, setCommunities] = useState([]);
	const [community, setCommunity] = useState({});
	const [channels, setChannels] = useState([]);
	const [messages, setMessages] = useState<any>([]);
	const [posts, setPosts] = useState<any>([]);

	useEffect(() => {
		if (currentCommunity !== 0) {
			CommunityService.getCommunity(currentCommunity).then((data): void => {
				setCommunity(data);
				setChannels(data.channels);
				setPosts(data.posts);
				setCurrentChannel({ id: data.channels[0].id, name: data.channels[0].name });
			});
		}
	}, [currentCommunity]);

	useEffect(() => {
		if (currentChannel.id !== 0) {
			ChannelService.getChannel(currentChannel.id).then((data) => {
				setMessages(data.messages);
			});
		}
	}, [currentChannel]);

	useEffect(() => {
		const fetchCommunities = async () => {
			try {
				const allCommunities = await CommunityService.getAllCommunities();
				const userCommunities = await UserService.getCommunities(1);

				console.log('All communities:', allCommunities);
				console.log('User communities:', userCommunities);

				const userCommunityIds = new Set(userCommunities.map((community: { id: number }) => community.id));
				const communitiesNotIn = allCommunities.filter((community: { id: number }) => !userCommunityIds.has(community.id));

				console.log('Communities not in:', communitiesNotIn);

				setCommunities(communitiesNotIn);
			} catch (error) {
				console.error('Error fetching communities:', error);
			}
		};

		fetchCommunities();
	}, []);



	return (
		<AuthRedirect>
			<Flex>
				<MainLayout>
					<Box w="70%">
						<Flex direction="column" h="100vh" gap={3} px={4} pt={2} overflow="scroll" alignItems="center">
							{posts.map((post: any, index: number) => (
								<Post key={index} title={post.title} description={post.content} name={post.user.displayName || post.user.username} date={post.createdAt} />
							))}
						</Flex>
					</Box>
					<Box w="30%" borderLeft="1px" borderColor="gray" pl={4}>
						<Box h="10%">
							<Flex direction="row" alignItems="center" gap={2}>
								<Text fontSize="xl" fontWeight="bold">
									{/* {user.data.username} */}
								</Text>
							</Flex>
						</Box>
						<Box h="40%" borderTop="3px" borderColor="gray">
							<Text fontSize="xl" fontWeight="bold" mb={4}>
								Communities
							</Text>
							{communities.map((community: any, index: number) => (
								<Link key={index} href={`/community/${community.id}`} mb={2} display="block">
									{community.name}
								</Link>
							))}
						</Box>
						<Box h="50%" borderTop="3px" borderColor="gray">
							<Text fontSize="xl" fontWeight="bold" mb={4}>
								Calendar
							</Text>
							{/* Calendar goes here */}
						</Box>
					</Box>
				</MainLayout>
			</Flex>
		</AuthRedirect>
	);
}
