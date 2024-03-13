import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Globe2, Settings } from "lucide-react";
import { UserService } from "~/services/services";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from '@remix-run/react';
import { CreateCommunityModal } from "./CreateCommunityModal";
import { colours } from "~/ui-config";
import { SettingsModal } from "./SettingsModal";

interface MainLayoutProps {
	children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
	const [communities, setCommunities] = useState([]);
	const navigate = useNavigate();
	
	useEffect(() => {
		const userId = Number(Cookies.get('userId'));
		UserService.getCommunities(userId).then((data) => {
			setCommunities(data);
		});
	}, []);

	return (
		<>
			<Flex minW='5rem' maxH='100vh' justifyItems='center' direction='column' bgColor={colours['community-bar']} borderRight='1px' borderColor='gray' gap={3} py={3}>
				<Flex alignItems='center' gap={3} direction='column'>
					<Button 
						w={14}
						h={14}
						onClick={() => {
							navigate('/')
						}}
					>
						<Globe2 />
					</Button>
				</Flex>
				<Flex alignItems='center' gap={3} direction='column' h='full' overflow='scroll'>
					{communities.map((community: any, index: number) => (
						<Button
							key={index}
							w={14}
							h={14}
							overflow='hidden'
							onClick={() => {
								navigate(`/community/${community.id}/posts`)
							}}
						>
							{community.avatarUrl ? (<Image maxW={14} maxH={14} src={`http://localhost:8500/community-avatars/${community.avatarUrl}`}/>) : community.name.charAt(0) }
						</Button>
					))}
					<CreateCommunityModal />
				</Flex>
				<Flex alignItems='center' gap={3} direction='column'>
					<SettingsModal />
				</Flex>
			</Flex>
			{props.children}
		</>
	)
}