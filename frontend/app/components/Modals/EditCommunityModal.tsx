import { useDisclosure, Button, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, HStack } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import React, { memo, useState } from "react";
import {CommunityService, CommunityUserService, UserService } from "~/services";
import SquareButton from "../UI/SquareButton";
import Cookies from "js-cookie";
import { useNavigate } from '@remix-run/react';

export function EditCommunityModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
	const [file, setFile] = useState<File | undefined>(undefined);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: '',
			bio: '',
		},
		onSubmit: async (values) => {
			const post = await CommunityService.updateCommunity(currentCommunity, values.name, values.bio, file);
			values.name = '';
			window.location.reload();
		}
	});

	const leaveCommunity = async () => {
        const userId = Number(Cookies.get('userId'));
		const communityUserIds = await UserService.getUsersCommunitiesMembershipIds(userId);
		communityUserIds.forEach(async function (id : number) {
			try {
				await CommunityUserService.removeCommunityUser(id, currentCommunity);
			}
			catch {}
		});
		window.location.reload();
    };

	return (
		<>
			<SquareButton
				w={9}
				h={9}
                onClick={onOpen}
            >
				<Pencil size={15} />
			</SquareButton>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
				
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter="blur(12px)" textColor='white'>
					<ModalHeader>Edit Community</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody pb={1}>
							<FormControl>
								<FormLabel>Community Name</FormLabel>
								<Input id='name' ref={initialRef} onChange={formik.handleChange} value={formik.values.name} placeholder='Name' autoComplete="off" />
							</FormControl>
							<FormControl pt={2}>
								<FormLabel>Community Bio</FormLabel>
								<Input id='bio' ref={initialRef} onChange={formik.handleChange} value={formik.values.bio} placeholder='Bio' autoComplete="off" />
							</FormControl>
							<FormControl pt={2}>
								<FormLabel>Community Avatar</FormLabel>
								<Input id='image' type='file' ref={initialRef} onChange={(event) => {setFile(event.target.files ? event.target.files[0] : undefined)}} placeholder='Image' autoComplete="off" />
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<HStack>
								<Button onClick={leaveCommunity} mr={184} colorScheme='red' >
									Leave Group
								</Button>
								<Button type='submit' onClick={onClose} colorScheme='blue'>
									Submit
								</Button>
							</HStack>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
