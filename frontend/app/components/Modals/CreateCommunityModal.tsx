import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { PlusSquare } from 'lucide-react';
import Cookies from 'js-cookie';
import React from 'react';
import { CommunityService, CommunityUserService } from '~/services';
import SquareButton from '../UI/SquareButton';

export function CreateCommunityModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)

	const formik = useFormik({
		initialValues: {
			name: '',
			bio: '',
		},
		onSubmit: async (values) => {
			if (values.name !== '') {
				const community = await CommunityService.createCommunity(values.name, values.bio);
				await CommunityUserService.createCommunityUser(Number(Cookies.get('userId')), community.id);
			}
			values.name = '';
			values.bio = '';
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
				<PlusSquare color='white' />
			</SquareButton>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter='blur(12px)' textColor='white'>
					<ModalHeader>Create a new Community</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Community Name</FormLabel>
								<Input id='name' ref={initialRef} onChange={formik.handleChange} value={formik.values.name} placeholder='Name' autoComplete='off' />
							</FormControl>
							<FormControl>
								<FormLabel>Community Bio</FormLabel>
								<Input id='bio' ref={initialRef} onChange={formik.handleChange} value={formik.values.bio} placeholder='Bio' autoComplete='off' />
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
	);
}
