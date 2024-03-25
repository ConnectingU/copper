import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserService, PostService } from '~/services';
import SquareButton from '../UI/SquareButton';

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
			await UserService.updateUser(userId, values.displayName, file || undefined);
			values.displayName = '';
			window.location.reload();
		}
	});

	return (
		<>
			<SquareButton 
				w={14}
				h={14}
				onClick={onOpen}
			>
				<Settings color='white' />
			</SquareButton>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter='blur(12px)' textColor='white'>
					<ModalHeader>Settings</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody pb={1}>
							<FormControl>
								<FormLabel>Display Name</FormLabel>
								<Input id='displayName' ref={initialRef} onChange={formik.handleChange} value={formik.values.displayName} placeholder={currentUser.displayName || 'Display Name'} autoComplete='off' />
							</FormControl>
							<FormControl pt={2}>
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
