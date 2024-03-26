import { Flex } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { CommunitySelector } from '~/components/Selectors/CommunitySelector';

export default function Layout() {
	return (
		<Flex>
			<CommunitySelector>
				<Outlet />
			</CommunitySelector>
		</Flex>
	)
}