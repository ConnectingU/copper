import { Flex, Box, Text, Input, FormControl, Button, Spacer, AbsoluteCenter } from '@chakra-ui/react';
import { Event } from '../UI/Event';
import { ArrowBigRight, Frown, SquarePen } from 'lucide-react';
import SquareButton from '../UI/SquareButton';
import { CreateEventModal } from '../Modals/CreateEventModal';

interface EventFeed {
	events: any[];
}

export function EventFeed(props: EventFeed) {
	console.log(props.events);
	return (
		<Box w='100%'>
			<Box w='100%' h='4rem' bgColor='rgba(0, 0, 0, 0.2)' display='flex' alignItems='center' boxShadow='2xl' px={4}>
				<Text fontSize={16} fontWeight='bold' textColor='white'>Events</Text>
				<Spacer />
				<CreateEventModal />
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
				{props.events.length === 0 ? 
					(
						<Flex h='calc(100vh - 4rem)' alignItems='center'>
							<Flex alignItems='center' direction='column' gap={5}>
								<Frown color='white' size={80}/>
								<Text fontSize={16} textColor='white'>No events right now!</Text>
							</Flex>
						</Flex>
					) 
					: (props.events.map((event: any, index: number) => (
					<Event key={index} id={event.id} title={event.title} description={event.description} fromDate={event.fromDate} toDate={event.toDate} imgUrl={event.image} community={event.community} goings={event.going} />
				)))}
			</Flex>
		</Box>
	);
}