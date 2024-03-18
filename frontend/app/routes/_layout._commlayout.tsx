import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Globe2, Settings } from "lucide-react";
import { CommunityService, UserService } from "~/services";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from '@remix-run/react';
import { CreateCommunityModal } from "../components/Modals/CreateCommunityModal";
import { colours } from "~/ui-config";
import { SettingsModal } from "../components/Modals/SettingsModal";
import { CommunitySelector } from "~/components/Selectors/CommunitySelector";
import { FeedSelector } from "~/components/Selectors/FeedSelector";

export default function Layout() {
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
	const [community, setCommunity] = useState({});
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		CommunityService.getCommunity(currentCommunity).then((data): void => {
			setCommunity({...data, id: currentCommunity});
			setChannels(data.channels);
		});
	}, [currentCommunity]);
	
	return (
		<FeedSelector community={community} channels={channels}>
			<Outlet />
		</FeedSelector>
	)
}