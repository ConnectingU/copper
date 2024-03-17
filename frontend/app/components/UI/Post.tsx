import { Avatar, Box, Card, Flex, VStack, Text, Image } from "@chakra-ui/react";

interface PostProps {
	name: string;
	title: string;
	description: string;
	avatarUrl?: string;
	imgUrl?: string;
	date: Date;
}

export function Post(props: PostProps) {
	return (
		<Box>
			<Card boxShadow='xl' maxW='512px' overflow='hidden' bgColor='rgba(0, 0, 0, 0.2)'>
				<Box maxW='512px' h='80px' display='flex' alignItems='center' px={2} gap={3}>
					<Avatar name={props.name} bgColor='lightGray' src={`http://localhost:8500/user-avatars/${props.avatarUrl}`} />
					<VStack alignItems='start' gap={0}>
						<Text fontSize={24} textColor='white'>{props.title}</Text>
						<Text fontSize={16} textColor='gray'>By: {props.name}</Text>
					</VStack>
				</Box>
				<Box w='512px'>
					<VStack alignItems='start'>
						{props.imgUrl ? (<Image w='768px' objectFit='cover' src={`http://localhost:8500/post-images/${props.imgUrl}`}/>) : null}
						<Text fontSize={16} px={4} pb={4} textColor='lightgray'>{props.description}</Text>
					</VStack>
				</Box>
			</Card>
		</Box>
	)
}
