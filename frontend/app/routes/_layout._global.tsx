import { Box, Button } from "@chakra-ui/react";
import { Link, Outlet, useMatches } from '@remix-run/react';

export default function Layout() {
	const matches = useMatches();

	// Get the active button index from the current URL
	let activeButton = null;
	if (matches.findIndex((match) => match.pathname.includes('/posts')) !== -1) {
		activeButton = 'posts';
	} else if (matches.findIndex((match) => match.pathname.includes('/events')) !== -1) {
		activeButton = 'events';
	}
	
	return (
		<Box w='100%'>
			<Box w='100%' h='4rem' bgColor='rgba(0, 0, 0, 0.2)' display='flex' alignItems='center' justifyContent='center' boxShadow='2xl' px={4} gap={3}>
				<Button
					w={200}
					h={8}
					as={Link}
					textColor='white'
					bgColor='rgba(0, 0, 0, 0.35)'
					to={`/posts`}
					style={
						activeButton === 'posts'
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
					Posts
				</Button>
				<Button
					w={200}
					h={8}
					as={Link}
					textColor='white'
					bgColor='rgba(0, 0, 0, 0.35)'
					to={`/events`}
					style={
						activeButton === 'events'
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
					Events
				</Button>
			</Box>
			<Outlet />
		</Box>
	)
}