import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { useFormik } from "formik";
import { PlusCircle } from "lucide-react";
import React from "react";
import { ChannelService } from "~/services";

export function CreateChannelModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);

	const formik = useFormik({
		initialValues: {
			name: ''
		},
		onSubmit: async (values) => {
			if (values.name !== '') {
				await ChannelService.createChannel(values.name, currentCommunity);
			}
			values.name = '';
			window.location.reload();
		}
	});

	return (
		<>
			<Button
				w={236}
				h={8}
				textColor='white'
				bgColor='rgba(0, 0, 0, 0.35)'
				onClick={onOpen}
			>
				<PlusCircle />
			</Button>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter="blur(12px)" textColor='white'>
					<ModalHeader>Create a new channel</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Channel Name</FormLabel>
								<Input id='name' ref={initialRef} onChange={formik.handleChange} value={formik.values.name} placeholder='#channel-name' autoComplete="off" />
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button type='submit' onClick={onClose} colorScheme='blue' mr={3}>
								Create
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
