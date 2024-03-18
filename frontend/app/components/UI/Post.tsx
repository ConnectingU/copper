import { Avatar, Box, Card, Flex, VStack, Text, Image, Button, IconButton } from "@chakra-ui/react";
import { Heart, MessageCircle, MessageSquare, Speech } from "lucide-react";
import Cookies from "js-cookie";
import { LikeService } from "~/services";
import { useEffect, useState } from "react";

interface PostProps {
	id: number;
	name: string;
	title: string;
	description: string;
	avatarUrl?: string;
	imgUrl?: string;
	date: Date;
	likes: any[];
}

export function Post(props: PostProps) {
	const [likes, setLikes] = useState(props.likes);

	return (
		<Box>
			<Card boxShadow='xl' maxW='512px' overflow='hidden' bgColor='rgba(0, 0, 0, 0.2)'>
				<Box maxW='512px' h='80px' display='flex' alignItems='center' px={4} gap={3}>
					<Avatar name={props.name} bgColor='lightGray' src={`http://localhost:8500/user-avatars/${props.avatarUrl}`} />
					<VStack alignItems='start' gap={0}>
						<Text fontSize={24} textColor='white'>{props.title}</Text>
						<Text fontSize={16} textColor='gray'>By: {props.name}</Text>
					</VStack>
				</Box>
				<Box w='512px'>
					<VStack alignItems='start'>
						{props.imgUrl ? (<Image w='768px' objectFit='cover' src={`http://localhost:8500/post-images/${props.imgUrl}`}/>) : null}
						<Flex px={4} gap={3} justify='center' textColor='lightgray'>
							<Flex gap={2}>
								{likes.find(element => element.userId == Cookies.get('userId')) ? 
									<IconButton
										bgColor='rgba(0, 0, 0, 0)'
										_hover={{ bg: 'rgba(0, 0, 0, 0)' }}
										p={0}
										aria-label={""}
										size='xs'
										icon={<Heart style={{padding: 0, margin: 0}} size={25} color='hotpink' fill='hotpink' />} 
										onClick={async () => {
											console.log()
											await LikeService.deleteLike(likes.find(element => element.userId == Cookies.get('userId')).id);
											setLikes(likes.filter(element => element.userId != Cookies.get('userId')));
										}}
									/> : 
									<IconButton
										bgColor='rgba(0, 0, 0, 0)'
										_hover={{ bg: 'rgba(0, 0, 0, 0)' }}
										p={0}
										aria-label={""}
										size='xs'
										icon={<Heart style={{padding: 0, margin: 0}} size={25} color='hotpink' />} 
										onClick={async () => {
											const like = await LikeService.createLike(Number(Cookies.get('userId')), props.id);
											setLikes([...likes, like]);
										}}
									/>
								}
								<Text>{likes.length}</Text>
							</Flex>
							<Flex gap={2}>
								<MessageSquare size={25} color='gray' />
								<Text>3</Text>
							</Flex>
						</Flex>
						<Text fontSize={16} px={4} pb={4} textColor='lightgray'>{props.description}</Text>
					</VStack>
				</Box>
			</Card>
		</Box>
	)
}
