import { Flex, Text, Box } from '@chakra-ui/react';
import { Frown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AuthRedirect } from '~/components/Util/AuthRedirect';
import { GlobalFeedService } from '~/services';
import Cookies from 'js-cookie';
import { Post } from '~/components/UI/Post';

export default function GlobalPosts() {
	const [posts, setPosts] = useState<any>([])

	useEffect(() => {
		GlobalFeedService.getGlobalPostFeed(Number(Cookies.get('userId'))).then((data) => {
			setPosts(data);
		});
	}, []);

	return (
		<AuthRedirect>
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
				{posts.length === 0 ? 
					(
						<Flex h='calc(100vh - 4rem)' alignItems='center'>
							<Flex alignItems='center' direction='column' gap={5}>
								<Frown color='white' size={80}/>
								<Text fontSize={16} textColor='white'>No posts yet! Be the first to make one!</Text>
							</Flex>
						</Flex>
					) 
					: (posts.map((post: any, index: number) => (
					<Post key={index} id={post.id} title={post.title} description={post.content} name={post.user.displayName || post.user.username} avatarUrl={post.user.avatarUrl} date={post.createdAt} imgUrl={post.image} likes={post.likes} community={post.community} />
				)))}
			</Flex>
		</AuthRedirect>
	);
}
