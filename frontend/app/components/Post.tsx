import { Avatar, Box, Card, VStack, Text, Image } from "@chakra-ui/react";

interface PostProps {
	name: string;
	title: string;
	description: string;
	imgUrl?: string;
	date: Date;
}

export function Post(props: PostProps) {
	let date = new Date(props.date).toDateString();
	if (date == new Date().toDateString()) {
		date = 'Today';
	}
	const time = new Date(props.date).toLocaleTimeString();
	let formatedDate: string = date + ' ' + time.split(':')[0] + ':' + time.split(':')[1] + ' ' + time.split(' ')[1];

	console.log(props.imgUrl);
	return (
	<Box>
		<Card boxShadow='xl' maxW='512px' overflow='hidden'>
		  	<Box maxW='512px' display='grid' gridTemplateColumns='1fr max-content' borderBottom='1px' borderColor='lightgray'>
				<Box px={2} py={2}>
			  		<Box display='flex' alignItems='center' gap={3}>
						<Avatar name={props.name} bgColor='lightGray' />
						<VStack alignItems='start' gap={0}>
							<Text fontSize={24}>{props.title}</Text>
							<Text fontSize={16}>By: {props.name}</Text>
						</VStack>
			  		</Box>
				</Box>
				<Text fontSize={12} px={2} py={1}>{formatedDate}</Text>
		  	</Box>
		  	<Box w='512px'>
				<VStack alignItems='start'>
					{props.imgUrl ? (<Image w='768px' objectFit='cover' src={`http://localhost:8500/post-images/${props.imgUrl}`}/>) : null}
					<Text fontSize={16} px={4} pb={4}>{props.description}</Text>
				</VStack>
		  	</Box>
		</Card>
	</Box>
	  

	)
}
