import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { Link, useMatches } from "@remix-run/react";
import { KeyRound, PlusCircle } from "lucide-react";
import { CreateChannelModal } from "./CreateChannelModal";
import { colours } from "~/ui-config";
import { EditCommunityModal } from "./EditCommunityModal";

interface FeedSelectorProps {
	community: any;
	channels: any[];
}

export function FeedSelector(props: FeedSelectorProps) {
	const matches = useMatches();

	// Get the active button index from the current URL
	const activeButton = matches.findIndex((match) => match.pathname.includes("/posts")) !== -1 ? null : props.channels.findIndex((channel) => matches.some((match) => match.pathname.includes(channel.id)));

	return (
		<Box minW="17rem" maxW="17rem" h="100vh" justifyItems="center" bgColor={colours["channel-bar"]} borderRight="1px" borderColor="gray" boxShadow="2xl">
			<Flex alignItems="center" gap={2} direction="column" h="100%" pt={3}>
				<Flex direction="row">
					<Text fontSize={18} fontWeight="bold" pr={2}>
						{(props.community as { name: string }).name}
					</Text>
					<EditCommunityModal />
				</Flex>
				<Flex direction="row">
					<Text fontSize={15} textAlign={"center"} pb={3}>
						{(props.community as { bio: string }).bio}
					</Text>
				</Flex>
				<Button
					w={236}
					h={8}
					as={Link}
					to={`/community/${props.community.id}/posts`}
					style={
						activeButton === null
							? {
									borderRadius: "10px",
									background: "linear-gradient(315deg, #ffffff, #e6e6e6)",
									boxShadow: "-3px -3px 6px #666666, 3px 3px 6px #ffffff",
							  }
							: {
									borderRadius: "10px",
									background: "linear-gradient(315deg, #ffffffa, #e6e6e6)",
									boxShadow: "none",
							  }
					}>
					Posts
				</Button>
				<Text fontSize={18}>Channels</Text>
				{props.channels.map((channel: any, index: number) => (
					<Button
						key={index}
						w={236}
						h={8}
						as={Link}
						to={`/community/${props.community.id}/${channel.id}`}
						style={
							activeButton === index
								? {
										borderRadius: "10px",
										background: "linear-gradient(315deg, #ffffff, #e6e6e6)",
										boxShadow: "-3px -3px 6px #666666, 3px 3px 6px #ffffff",
								  }
								: {
										borderRadius: "10px",
										background: "linear-gradient(315deg, #ffffffa, #e6e6e6)",
										boxShadow: "none",
								  }
						}>
						#{channel.name}
					</Button>
				))}
				<CreateChannelModal />
			</Flex>
		</Box>
	);
}
