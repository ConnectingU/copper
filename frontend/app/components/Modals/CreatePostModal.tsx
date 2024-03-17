import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { useFormik } from "formik";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { PostService } from "~/services";
import SquareButton from "../UI/SquareButton";

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
			<SquareButton
				w={10}
				h={10}
				onClick={onOpen}
			>
				<SquarePen width={18} />
			</SquareButton>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter="blur(12px)" textColor='white'>
					<ModalHeader>Create a new post</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody>
							<FormControl>
								<FormLabel>Post Title</FormLabel>
								<Input id='title' ref={initialRef} onChange={formik.handleChange} value={formik.values.title} placeholder='Title' autoComplete="off" />
							</FormControl>
							<FormControl pt={2}>
								<FormLabel>Post Content</FormLabel>
								<Input id='content' ref={initialRef} onChange={formik.handleChange} value={formik.values.content} placeholder='Content' autoComplete="off" />
							</FormControl>
							<FormControl pt={2}>
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
