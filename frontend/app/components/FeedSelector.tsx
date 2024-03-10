import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { CreateChannelModal } from "./CreateChannelModal";
import { useReducer } from "react";
import { colours } from "~/ui-config";

interface FeedSelectorProps {
	community: any;
	channels: any[];
}

export function FeedSelector(props: FeedSelectorProps) {
	const navigate = useNavigate();
	return (
		<Box minW='17rem' h='100vh' justifyItems='center' bgColor={colours['channel-bar']} borderRight='1px' borderColor='gray' boxShadow='2xl'>
			<Flex alignItems='center' gap={2} direction='column' h='100%' pt={3}>
				<Flex direction='row'>
					<Text fontSize={18} fontWeight='bold'>{(props.community as { name: string }).name}</Text>
				</Flex>
				<Button
					w={236}
					h={8}
					onClick={() => {
						navigate(`/community/${props.community.id}/posts`)
					}}
				>
					Posts
				</Button>
				<Text fontSize={18}>Channels</Text>
				{props.channels.map((channel: any, index: number) => (
					<Button
						key={index}
						w={236}
						h={8}
						onClick={() => {
							navigate(`/community/${props.community.id}/${channel.id}`)
						}}
					>
						#{channel.name}
					</Button>
				))}
				<CreateChannelModal />
			</Flex>
		</Box>
	);
}
