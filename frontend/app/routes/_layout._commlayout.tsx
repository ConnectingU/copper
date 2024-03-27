import { CommunityService } from '~/services';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from '@remix-run/react';
import { FeedSelector } from '~/components/Selectors/FeedSelector';

export default function Layout() {
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
	const [community, setCommunity] = useState({});
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		CommunityService.getCommunity(currentCommunity).then((data): void => {
			setCommunity({...data, id: currentCommunity});
			setChannels(data.channels);
		});
	}, [currentCommunity]);
	
	return (
		<FeedSelector community={community} channels={channels}>
			<Outlet />
		</FeedSelector>
	)
}