import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Globe2, PlusSquare } from "lucide-react";
import { UserService } from "~/services/services";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from '@remix-run/react';
import { CreateCommunityModal } from "./CreateCommunityModal";
import { colours } from "~/ui-config";

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
			<Box minW='5rem' h='100vh' justifyItems='center' bgColor={colours['community-bar']} borderRight='1px' borderColor='gray'>
				<Flex alignItems='center' gap={3} direction='column' h='100%' pt={3}>
					<Button 
						w={14} 
						h={14}
						onClick={() => {
							navigate('/')
						}}
					>
						<Globe2 />
					</Button>
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
			</Box>
			{props.children}
		</>
	)
}