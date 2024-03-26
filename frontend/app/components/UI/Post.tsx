import { Avatar, Box, Card, Flex, VStack, Text, Image, Button, IconButton, Link } from "@chakra-ui/react";
import { Heart, MessageCircle, MessageSquare, Speech } from "lucide-react";
import Cookies from "js-cookie";
import { LikeService, CommentService } from "~/services";
import { useEffect, useState } from "react";
import { CommentModal } from "../Modals/CommentModal";
import config from "~/config";

interface PostProps {
	id: number;
	name: string;
	title: string;
	description: string;
	avatarUrl?: string;
	imgUrl?: string;
	date: Date;
	likes: any[];
	community?: any
}

export function Post(props: PostProps) {
	const [likes, setLikes] = useState(props.likes);
	const [comments, setComments] = useState<any>([]);

	useEffect(() => {
		CommentService.getComments(props.id).then((data) => {
			console.log(data)
			setComments(data);
		});
	}, []);

	let date = new Date(props.date).toDateString();
	if (date == new Date().toDateString()) {
		date = 'Today';
	}
	let formatedDate: string = date + ' ';

	return (
		<Box>
			<Card boxShadow='xl' maxW='512px' overflow='hidden' bgColor='rgba(0, 0, 0, 0.2)'>
				<Box maxW='512px' h='80px' display='flex' alignItems='center' px={4} gap={3}>
					<Avatar name={props.name} bgColor='lightGray' src={`${config.api.baseUrl}/user-avatars/${props.avatarUrl}`} />
					<VStack alignItems='start' gap={0}>
						<Text fontSize={24} textColor='white'>{props.title}</Text>
						<Flex><Text fontSize={16} textColor='gray'>By: {props.name}</Text>{props.community ? <Text textColor='gray' pl={1}>in <Link href={`/community/${props.community.id}/posts`}>{props.community.name}</Link></Text> : null}</Flex>
					</VStack>
				</Box>
				<Box w='512px'>
					<VStack alignItems='start'>
						{props.imgUrl ? (<Image w='768px' objectFit='cover' src={`${config.api.baseUrl}/post-images/${props.imgUrl}`}/>) : null}
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
								<CommentModal id={props.id} comments={comments} setComments={setComments} />
								<Text>{comments.length}</Text>
							</Flex>
						</Flex>
						<Text fontSize={16} px={4} pb={1} textColor='lightgray'>{props.description}</Text>
						<Text fontSize={16} px={4} pb={2} textColor='gray'>{formatedDate}</Text>
					</VStack>
				</Box>
			</Card>
		</Box>
	)
}
