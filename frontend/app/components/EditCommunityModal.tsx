import { useDisclosure, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import React from "react";
import Cookies from 'js-cookie';
import { PostService } from "~/services/services";

export function EditCommunityModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)
	const { communityId } = useParams();
    const { name } = useParams();
	const currentCommunity: number = Number(communityId);
    const userId: number = Number(Cookies.get('userId'));

	const formik = useFormik({
		initialValues: {
			title: '',
            content: '',
            image: ''
		},
		onSubmit: async (values) => {
			if (values.title !== '') {
				await PostService.createPost(values.title, values.content, values.image, currentCommunity, userId);
			}
			values.title = '';
			window.location.reload();
		}
	});

	return (
		<>
			<IconButton
                isRound={true}
                variant='solid'
                size="xs"
                aria-label='Edit Community'
                fontSize='5px'
                icon={<Pencil size={15} />}
                onClick={onOpen}
            />
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Community</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Community name</FormLabel>
								<Input id='title' ref={initialRef} onChange={formik.handleChange} value={formik.values.title} placeholder={name} />
							</FormControl>
                            <FormControl>
								<FormLabel>Bio</FormLabel>
								<Input id='content' ref={initialRef} onChange={formik.handleChange} value={formik.values.content} placeholder='post-content' />
							</FormControl>
                            <FormControl>
								<FormLabel>Community Icon</FormLabel>
								<Input id='image' ref={initialRef} onChange={formik.handleChange} value={formik.values.image} placeholder='post-image' />
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
