import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { useFormik } from "formik";
import React from "react";
import {InvitationService } from "~/services";

export function SendInvitationModal() {
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	

	const formik = useFormik({
		initialValues: {
			username: '',
		},
		onSubmit: async (values) => {
			await InvitationService.createInvitation(values.username, currentCommunity);
			values.username = '';
			window.location.reload();
		}
	});

	return (
		<>	
			<Button
				w={236}
				h={8}
				onClick={onOpen}
				textColor='white'
				bgColor='rgba(0, 0, 0, 0.35)'
				style={
						{
						borderRadius: '10px',
						background: 'rgba(0, 0, 0, 0.35)',
						boxShadow: 'none',
					}
				}>
				Invite User
			</Button>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
				
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter="blur(12px)" textColor='white'>
					<ModalHeader>Invite User</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody pb={1}>
							<FormControl>
								<FormLabel>Username</FormLabel>
								<Input id='username' ref={initialRef} onChange={formik.handleChange} value={formik.values.username} placeholder='Username' autoComplete="off" />
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button type='submit' colorScheme='blue' mr={3}>
								Send Invite
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
