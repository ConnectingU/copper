import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AuthRedirect } from '~/components/Util/AuthRedirect';
import { CommunityService } from '~/services';
import { EventFeed } from '~/components/Feed/EventFeed';
import { useParams } from '@remix-run/react';

export default function Index() {
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
	const [events, setEvents] = useState<any>([]);
	const [community, setCommunity] = useState<any>(null);

	useEffect(() => {
		CommunityService.getCommunity(currentCommunity).then((data): void => {
			setEvents(data.events);
		});
	}, [currentCommunity]);

	return (
		<AuthRedirect>
			<Flex w='100%'>
				<EventFeed events={events} />
			</Flex>
		</AuthRedirect>
	);
}
