import { Flex, Image } from "@chakra-ui/react";
import { Globe2 } from "lucide-react";
import { UserService } from "~/services";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from '@remix-run/react';
import { CreateCommunityModal } from "../Modals/CreateCommunityModal";
import { AcceptInvitationModal } from "../Modals/AcceptInvitationModal";
import { colours } from "~/ui-config";
import { SettingsModal } from "../Modals/SettingsModal";
import SquareButton from "../UI/SquareButton";
import config from "~/config";

interface CommunitySelectorProps {
	children: React.ReactNode;
}

export function CommunitySelector(props: CommunitySelectorProps) {
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
			<Flex minW='5rem' maxH='100vh' justifyItems='center' direction='column' bgColor='rgba(0, 0, 0, 0.35)' gap={3} py={3}>
				<Flex alignItems='center' gap={3} direction='column'>
					<SquareButton 
						w={14}
						h={14}
						onClick={() => {
							navigate('/')
						}}
					>
						<Globe2 color='white' />
					</SquareButton>
				</Flex>
				<Flex alignItems='center' gap={3} direction='column' h='full'>
					{communities.map((community: any, index: number) => (
						<SquareButton
							w={14}
							h={14}
							key={index}
							onClick={() => {
								navigate(`/community/${community.id}/posts`)
							}}
						>
							{community.avatarUrl ? (<Image maxW={14} maxH={14} src={`${config.api.baseUrl}/community-avatars/${community.avatarUrl}`}/>) : community.name.charAt(0) }
						</SquareButton>
					))}
					<CreateCommunityModal />
					<AcceptInvitationModal />
				</Flex>
				<Flex alignItems='center' gap={3} direction='column'>
					<SettingsModal />
				</Flex>
			</Flex>
			{props.children}
		</>
	)
}