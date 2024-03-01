import { Box, Button, Flex } from "@chakra-ui/react";
import { Globe2 } from "lucide-react";
import { UserService } from "~/services/services";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from '@remix-run/react';
import { keyframes } from '@emotion/react';

interface MainLayoutProps {
	children: React.ReactNode;
}

const heat = keyframes`
	0% { box-shadow: 0 0 10px #B87333; }
	50% { box-shadow: 0 0 15px #FF4500; }
	100% { box-shadow: 0 0 20px #B22222; }
`;

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
			<Box w='5vw' h='100vh' justifyItems='center' style={{background: 'linear-gradient(to right, #B87333, white, #B87333)'}} borderRight='1px' borderColor='gray'>
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
						borderColor={'gray'}
						borderWidth={3}
						_hover={{
							transform: "scale(1.10)",
							animation: `${heat} 10s linear forwards`
						}}		
						onClick={() => {
							navigate(`/community/${community.id}`)
						}}
						transition="all 0.5s ease-out"
						>
						{community.name.charAt(0)}
						</Button>
					))}
				</Flex>
			</Box>
			{props.children}
		</>
	)
}