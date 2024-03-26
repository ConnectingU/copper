import { Flex, Text, Box } from '@chakra-ui/react';
import { Frown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AuthRedirect } from '~/components/Util/AuthRedirect';
import { GlobalFeedService } from '~/services';
import Cookies from 'js-cookie';
import { Event } from '~/components/UI/Event';

export default function GlobalEvents() {
	const [events, setEvents] = useState<any>([])

	useEffect(() => {
		GlobalFeedService.getGlobalEventFeed(Number(Cookies.get('userId'))).then((data) => {
			setEvents(data);
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
					{events.length === 0 ? 
						(
							<Flex h='calc(100vh - 4rem)' alignItems='center'>
								<Flex alignItems='center' direction='column' gap={5}>
									<Frown color='white' size={80}/>
									<Text fontSize={16} textColor='white'>No events right now!</Text>
								</Flex>
							</Flex>
						) 
						: (events.map((event: any, index: number) => (
						<Event key={index} id={event.id} title={event.title} description={event.description} fromDate={event.fromDate} toDate={event.toDate} imgUrl={event.image} community={event.community} goings={event.going} />
					)))}
				</Flex>
		</AuthRedirect>
	);
}
