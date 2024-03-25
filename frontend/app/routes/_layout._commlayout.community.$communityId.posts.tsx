import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AuthRedirect } from '~/components/Util/AuthRedirect';
import { CommunityService } from '~/services';
import { PostFeed } from '~/components/Feed/PostFeed';
import { useParams } from '@remix-run/react';

export default function Index() {
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
	const [community, setCommunity] = useState({});
	const [channels, setChannels] = useState([]);
	const [posts, setPosts] = useState<any>([]);

	useEffect(() => {
		CommunityService.getCommunity(currentCommunity).then((data): void => {
			setCommunity({...data, id: currentCommunity});
			setChannels(data.channels);
			setPosts(data.posts);
		});
	}, [currentCommunity]);

	return (
		<AuthRedirect>
			<Flex w='100%'>
				<PostFeed posts={posts} />
			</Flex>
		</AuthRedirect>
	);
}
