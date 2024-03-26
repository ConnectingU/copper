import { Avatar, Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { HistoryService } from '~/services';
import Cookies from 'js-cookie';

interface ChannelButtonProps {
	community: any,
	channel: any,
	activeButton: any,
	index: number,
}

export function ChannelButton(props: ChannelButtonProps) {
	const [notificationCount, setNotificationCount] = useState(0);
	useEffect(() => {
		const userId = Number(Cookies.get('userId'));
		HistoryService.getHistory(userId, Number(props.channel.id)).then((data): void => {
			setNotificationCount(data.count);
		});
		if (props.activeButton === props.index) {
			setNotificationCount(0);
		}
	}, [props.activeButton]);

	return (
		<Button
			w={236}
			h={8}
			as={Link}
			textColor='white'
			bgColor='rgba(0, 0, 0, 0.35)'
			to={`/community/${props.community.id}/${props.channel.id}`}
			style={
				props.activeButton === props.index
					? {
							borderRadius: '10px',
							background: 'rgba(33, 33, 33, 0.35)',
							boxShadow: '-3px -3px 6px #666666, 3px 3px 6px #666666',
					  }
					: {
							borderRadius: '10px',
							background: 'rgba(0, 0, 0, 0.35)',
							boxShadow: 'none',
					  }
			}>
			<Flex w='100%'>
				<Text>#{props.channel.name}</Text>
				<Spacer />
				<Text>{notificationCount}</Text>
			</Flex>
		</Button>
	)
}
