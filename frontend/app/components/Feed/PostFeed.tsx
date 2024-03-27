import { Flex, Box, Text, Spacer } from '@chakra-ui/react';
import { Post } from '../UI/Post';
import { Frown } from 'lucide-react';
import { CreatePostModal } from '../Modals/CreatePostModal';

interface PostFeed {
	posts: any[];
}

export function PostFeed(props: PostFeed) {
	return (
		<Box w='100%'>
			<Box w='100%' h='4rem' bgColor='rgba(0, 0, 0, 0.2)' display='flex' alignItems='center' boxShadow='2xl' px={4}>
				<Text fontSize={16} fontWeight='bold' textColor='white'>Posts</Text>
				<Spacer />
				<CreatePostModal />
			</Box>
			<Flex
				direction='column'
				minH='calc(100vh - 4rem)'
				maxH='calc(100vh - 4rem)'
				gap={3}
				px={4}
				pt={2}
				overflow='scroll'
				alignItems='center'
				css={{
					'&::-webkit-scrollbar': {
						width: '0rem',
					},
				}}
			>
				{props.posts.length === 0 ? 
					(
						<Flex h='calc(100vh - 4rem)' alignItems='center'>
							<Flex alignItems='center' direction='column' gap={5}>
								<Frown color='white' size={80}/>
								<Text fontSize={16} textColor='white'>No posts yet! Be the first to make one!</Text>
							</Flex>
						</Flex>
					) 
					: (props.posts.map((post: any, index: number) => (
					<Post key={index} id={post.id} title={post.title} description={post.content} name={post.user.displayName || post.user.username} avatarUrl={post.user.avatarUrl} date={post.createdAt} imgUrl={post.image} likes={post.likes} />
				)))}
			</Flex>
		</Box>
	);
}