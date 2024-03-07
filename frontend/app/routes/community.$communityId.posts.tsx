import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AuthRedirect } from '~/components/AuthRedirect';
import { CommunityService } from '~/services/services';
import { MainLayout } from '~/components/MainLayout';
import { FeedSelector } from '~/components/FeedSelector';
import { PostFeed } from '~/components/PostFeed';
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
			<Flex>
				<MainLayout>
					<FeedSelector community={community} channels={channels} />
					<PostFeed posts={posts} />
				</MainLayout>
			</Flex>
		</AuthRedirect>
	);
}
