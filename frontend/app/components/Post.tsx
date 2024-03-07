import { Avatar, Box, Card, Flex, VStack, Text, Image } from "@chakra-ui/react";

interface PostProps {
	name: string;
	title: string;
	description: string;
	imgUrl?: string;
	date: Date;
}

export function Post(props: PostProps) {
	return (
		<Box>
			<Card boxShadow='xl' w='768px' overflow='hidden'>
				<Box w='768px' h='80px' display='flex' alignItems='center' px={2} gap={3} borderBottom='1px' borderColor='lightgray'>
					<Avatar name={props.name} bgColor='lightGray' />
					<VStack alignItems='start' gap={0}>
						<Text fontSize={24}>{props.title}</Text>
						<Text fontSize={16}>By: {props.name}</Text>
					</VStack>
				</Box>
				<Box w='768px'>
					<VStack alignItems='start'>
						<Image w='768px' objectFit='cover' src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"/>
						{props.imgUrl ? null : (<img src={props.imgUrl}/>)}
						<Text fontSize={16} px={4} pb={4}>{props.description}</Text>
					</VStack>
				</Box>
			</Card>
		</Box>
	)
}
