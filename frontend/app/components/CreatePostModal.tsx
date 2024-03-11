import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { useFormik } from "formik";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { PostService } from "~/services/services";

export function CreatePostModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
    const userId: number = Number(Cookies.get('userId'));
	const [file, setFile] = useState<File | null>(null);

		const formik = useFormik({
			initialValues: {
				title: '',
	            content: '',
			},
			onSubmit: async (values) => {
				if (values.title !== '') {
					const post = await PostService.createPost(values.title, values.content, currentCommunity, userId);
					if (file) {
						await PostService.updatePost(post.data.id, undefined, undefined, file);
					}
				}
				values.title = '';
				window.location.reload();
			}
		});

	return (
		<>
			<Button
				w={236}
				h={8}
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
				<ModalContent>
					<ModalHeader>Create a new post</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Post Title</FormLabel>
								<Input id='title' ref={initialRef} onChange={formik.handleChange} value={formik.values.title} placeholder='Title' />
							</FormControl>
							<FormControl>
								<FormLabel>Post Content</FormLabel>
								<Input id='content' ref={initialRef} onChange={formik.handleChange} value={formik.values.content} placeholder='Content' />
							</FormControl>
							<FormControl>
								<FormLabel>Post Image</FormLabel>
								<Input id='image' type='file' ref={initialRef} onChange={(event) => {setFile(event.target.files ? event.target.files[0] : null)}} placeholder='Image' />
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
