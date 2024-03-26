import { Box, Card, Flex, VStack, Text, Image, Spacer, IconButton } from '@chakra-ui/react';
import SquareButton from './SquareButton';
import { useNavigate } from '@remix-run/react';
import { UserRound, UserRoundCheck } from 'lucide-react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { GoingService } from '~/services';
import config from '~/config';

interface EventProps {
	id: number;
	title: string;
	description: string;
	imgUrl?: string;
	fromDate: Date;
	toDate: Date;
	community: any
	goings: any[];
}

export function Event(props: EventProps) {
	const [goings, setGoings] = useState(props.goings);
	console.log(goings)
	const navigate = useNavigate();
	function formatDate(dateString: any): string {
		const date = new Date(dateString);
		let formatedDate: string = date.toDateString();
		if (formatedDate == new Date().toDateString()) {
			formatedDate = 'Today';
		}
		const time = new Date(date).toLocaleTimeString();
		return formatedDate + ' ' + time.split(':')[0] + ':' + time.split(':')[1] + ' ' + time.split(' ')[1];
	}

	return (
		<Box>
			<Card boxShadow='xl' maxW='512px' overflow='hidden' bgColor='rgba(0, 0, 0, 0.2)'>
				<Box maxW='512px' h='80px' display='flex' alignItems='center' px={4} pt={2}>
					<Flex gap={3}>
						<SquareButton
							w={14}
							h={14}
							onClick={() => {
								navigate(`/community/${props.community.id}/events`)
							}}
						>
							{props.community.avatarUrl ? (<Image maxW={14} maxH={14} src={`${config.api.baseUrl}/community-avatars/${props.community.avatarUrl}`}/>) : props.community.name.charAt(0) }
						</SquareButton>
						<VStack alignItems='start' gap={0}>
							<Text fontSize={24} textColor='white'>{props.title}</Text>
							<Text fontSize={16} textColor='gray'>{props.community.name}</Text>
						</VStack>
					</Flex>
				</Box>
				<Box w='512px'>
					<VStack alignItems='start'>
						{props.imgUrl ? (<Image w='768px' objectFit='cover' src={`${config.api.baseUrl}/event-images/${props.imgUrl}`}/>) : null}
						<Flex px={4} gap={3} justify='center' textColor='lightgray'>
							<Flex gap={2} alignItems='center'>
								{goings.find(element => element.userId == Cookies.get('userId')) ? 
									<IconButton
										bgColor='rgba(0, 0, 0, 0)'
										_hover={{ bg: 'rgba(0, 0, 0, 0)' }}
										p={0}
										aria-label={''}
										size='xs'
										icon={<UserRound style={{padding: 0, margin: 0}} size={25} color='lightgreen' />} 
										onClick={async () => {
											await GoingService.deleteGoing(goings.find(element => element.userId == Cookies.get('userId')).id);
											setGoings(goings.filter(element => element.userId != Cookies.get('userId')));
										}}
									/> : 
									<IconButton
										bgColor='rgba(0, 0, 0, 0)'
										_hover={{ bg: 'rgba(0, 0, 0, 0)' }}
										p={0}
										aria-label={''}
										size='xs'
										icon={<UserRoundCheck style={{padding: 0, margin: 0}} size={25} color='gray' />} 
										onClick={async () => {
											const going = await GoingService.createGoing(Number(Cookies.get('userId')), props.id);
											setGoings([...goings, going]);
										}}
									/>
								}
								<Text>{goings.length}</Text>
								<Text fontSize={14} textColor='gray'>When: {formatDate(props.fromDate)} to {formatDate(props.toDate)}</Text>
							</Flex>
						</Flex>
						<Text fontSize={16} px={4} pb={3} textColor='lightgray'>{props.description}</Text>
					</VStack>
				</Box>
			</Card>
		</Box>
	)
}
