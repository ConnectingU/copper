import { Flex, Box, Text, Input, FormControl, Button } from "@chakra-ui/react";
import { Post } from "./Post";
import { ArrowBigRight } from "lucide-react";

interface ChatFeed {
	posts: any;
}

export function PostFeed(props: ChatFeed) {
	return (
		<Box w='75%'>
			<Flex direction='column' h='100vh' gap={3} px={4} pt={2} overflow='scroll' alignItems='center'>
				{props.posts.map((post: any, index: number) => (
					<Post key={index} title={post.title} description={post.content} name={post.user.displayName || post.user.username} date={post.createdAt} />
				))}
			</Flex>
		</Box>
	);
}