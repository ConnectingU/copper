import { Box, Button, Flex } from "@chakra-ui/react";
import { Globe2, PlusSquare } from "lucide-react";
import { UserService } from "~/services/services";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from '@remix-run/react';
import { CreateCommunityModal } from "./CreateCommunityModal";

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
			<Box w='5vw' h='100vh' justifyItems='center' bgColor='#FF6600' borderRight='1px' borderColor='gray'>
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
							onClick={() => {
								navigate(`/community/${community.id}/posts`)
							}}
						>
							{community.name.charAt(0)}
						</Button>
					))}
					<CreateCommunityModal />
				</Flex>
			</Box>
			{props.children}
		</>
	)
}