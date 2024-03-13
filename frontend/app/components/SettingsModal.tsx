import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { useFormik } from "formik";
import { Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { UserService, PostService } from "~/services/services";

export function SettingsModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)
	const [currentUser, setCurrentUser] = useState<any>({});
    const userId: number = Number(Cookies.get('userId'));
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		const userId = Number(Cookies.get('userId'));
		UserService.getUser(userId).then((data) => {
			setCurrentUser(data);
		});
	}, []);

	const formik = useFormik({
		initialValues: {
			displayName: '',
		},
		onSubmit: async (values) => {
			if (values.displayName !== '') {
				// await UserService.updateUser(values.displayName, values.content, userId);
			}
			values.displayName = '';
			window.location.reload();
		}
	});

	return (
		<>
			<Button 
				w={14} 
				h={14}
				onClick={onOpen}
			>
				<Settings />
			</Button>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Settings</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Display Name</FormLabel>
								<Input id='title' ref={initialRef} onChange={formik.handleChange} value={formik.values.displayName} placeholder={currentUser.displayName || 'Display Name'} />
							</FormControl>
							<FormControl>
								<FormLabel>Avatar</FormLabel>
								<Input id='image' type='file' ref={initialRef} onChange={(event) => {setFile(event.target.files ? event.target.files[0] : null)}} placeholder='Image' />
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								type='submit'
								onClick={() => {
									Cookies.remove('userId');
									Cookies.remove('auth');
									window.location.reload();
								}}
								colorScheme='red'
								mr={3}
							>
								Logout
							</Button>
							<Button type='submit' onClick={onClose} colorScheme='blue' mr={3}>
								Save
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
