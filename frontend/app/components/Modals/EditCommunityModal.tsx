import { useDisclosure, Button, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { useFormik } from "formik";
import { Pencil, Square } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {CommunityService } from "~/services";
import SquareButton from "../UI/SquareButton";
import config from "~/config";

export function EditCommunityModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef(null);
	const finalRef = useRef(null);
	const hiddenFileInput = useRef(null);
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
	const [community, setCommunity] = useState<any>({});
	const [file, setFile] = useState<File | undefined>(undefined);

	useEffect(() => {
		CommunityService.getCommunity(currentCommunity).then((data) => {
			setCommunity(data);
		});
	}, []);

	const formik = useFormik({
		initialValues: {
			name: '',
			bio: '',
		},
		onSubmit: async (values) => {
			await CommunityService.updateCommunity(currentCommunity, values.name, values.bio, file);
			values.name = '';
			window.location.reload();
		}
	});

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
								<SquareButton
									w={14}
									h={14}
									onClick={() => {
										if (hiddenFileInput.current) {
											(hiddenFileInput.current as HTMLInputElement).click();
										}
									}}
								>
									{file ? <img src={URL.createObjectURL(file)} style={{width: '100%', height: '100%', objectFit: 'cover'}}/> : (community.avatarUrl ? <img src={`${config.api.baseUrl}/community-avatars/${community.avatarUrl}`} style={{width: '100%', height: '100%', objectFit: 'contain'}}/> : null)}
								</SquareButton>
								<Input
									id='image'
									type='file'
									display='none'
									accept='.jpg,.jpeg,.png'
									ref={hiddenFileInput}
									onChange={(event) => {setFile(event.target.files ? event.target.files[0] : undefined)}}
									placeholder='Image' 
								/>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button type='submit' onClick={onClose} colorScheme='blue' mr={3}>
								Submit
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
