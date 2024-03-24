import { Box, Button, Flex, Text, Spacer } from "@chakra-ui/react";
import { Link, useMatches } from "@remix-run/react";
import { CreateChannelModal } from "../Modals/CreateChannelModal";
import {SendInvitationModal} from "../Modals/SendInvitationModal";
import { EditCommunityModal } from "../Modals/EditCommunityModal";

interface FeedSelectorProps {
	community: any;
	channels: any[];
	children: React.ReactNode;
}

export function FeedSelector(props: FeedSelectorProps) {
	const matches = useMatches();

	// Get the active button index from the current URL
	const activeButton = matches.findIndex((match) => match.pathname.includes('/posts')) !== -1 ? null : props.channels.findIndex((channel) => matches.some((match) => match.pathname.includes(channel.id)));

	return (
		<>
			<Box minW='17rem' maxW='17rem' h='100vh' justifyItems='center' bgColor='rgba(0, 0, 0, 0.25)' boxShadow='2xl'>
				<Flex alignItems='center' gap={2} direction='column' h='100%' pt={3}>
					<Flex direction='row' textColor='white' w='100%' px={5} alignItems='center'>
						<Text fontSize={18} fontWeight='bold' pr={2}>
							{(props.community as { name: string }).name}
						</Text>
						<Spacer />
						<EditCommunityModal />
					</Flex>
					<Flex direction='row'>
						<Text fontSize={15} textColor='white' textAlign={'center'} pb={3}>
							{(props.community as { bio: string }).bio}
						</Text>
					</Flex>
					<Button
						w={236}
						h={8}
						as={Link}
						textColor='white'
						bgColor='rgba(0, 0, 0, 0.35)'
						to={`/community/${props.community.id}/posts`}
						style={
							activeButton === null
								? {
										borderRadius: '10px',
										background: 'rgba(33, 33, 33, 0.35)',
										boxShadow: '-3px -3px 6px #666666, 3px 3px 6px #666666',
								  }
								: {
										borderRadius: '10px',
										background: 'rgba(0, 0, 0, 0.35)',
										boxShadow: 'none',
								  }
						}>
						Posts
					</Button>
					<SendInvitationModal/>
					<Text fontSize={18} textColor='white'>Channels</Text>
					{props.channels.map((channel: any, index: number) => (
						<Button
							key={index}
							w={236}
							h={8}
							as={Link}
							textColor='white'
							bgColor='rgba(0, 0, 0, 0.35)'
							to={`/community/${props.community.id}/${channel.id}`}
							style={
								activeButton === index
									? {
											borderRadius: '10px',
											background: 'rgba(33, 33, 33, 0.35)',
											boxShadow: '-3px -3px 6px #666666, 3px 3px 6px #666666',
									  }
									: {
											borderRadius: '10px',
											background: 'rgba(0, 0, 0, 0.35)',
											boxShadow: 'none',
									  }
							}>
							#{channel.name}
						</Button>
					))}
					<CreateChannelModal />
				</Flex>
			</Box>
			{props.children}
		</>
	);
}
