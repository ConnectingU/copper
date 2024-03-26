import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Flex } from "@chakra-ui/react";
import { useParams } from "@remix-run/react";
import { Form, useFormik } from "formik";
import { CalendarPlus, ImagePlus } from "lucide-react";
import React, { useRef, useState } from "react";
import Cookies from 'js-cookie';
import { EventService, PostService } from "~/services";
import SquareButton from "../UI/SquareButton";

export function CreateEventModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const finalRef = useRef(null)
	const hiddenFileInput = useRef(null);
	const { communityId } = useParams();
	const currentCommunity: number = Number(communityId);
    const userId: number = Number(Cookies.get('userId'));
	const [file, setFile] = useState<File | null>(null);
	const [fromDate, setFromDate] = useState<Date | null>(null);
	const [toDate, setToDate] = useState<Date | null>(null);

		const formik = useFormik({
			initialValues: {
				title: '',
	            description: '',
			},
			onSubmit: async (values) => {
				if (values.title !== '' && values.description !== '') {
					const event = await EventService.createEvent(values.title, values.description, currentCommunity, fromDate!, toDate!);
					if (file) {
						await PostService.updatePost(event.data.id, undefined, undefined, file);
					}
				}
				values.title = '';
				values.description = '';
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
				<CalendarPlus width={18} />
			</SquareButton>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter="blur(12px)" textColor='white'>
					<ModalHeader>Create a new event</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody>
							<FormControl>
								<FormLabel>Event Title</FormLabel>
								<Input id='title' ref={initialRef} onChange={formik.handleChange} value={formik.values.title} placeholder='Title' autoComplete="off" />
							</FormControl>
							<FormControl pt={2}>
								<FormLabel>Event Description</FormLabel>
								<Input id='description' ref={initialRef} onChange={formik.handleChange} value={formik.values.description} placeholder='Description' autoComplete="off" />
							</FormControl>
							<FormControl pt={2}>
								<FormLabel>Event Image</FormLabel>
								<SquareButton
									w='100%'
									h='100%'
									onClick={() => {
										if (hiddenFileInput.current) {
											(hiddenFileInput.current as HTMLInputElement).click();
										}
									}}
								>	

									<Flex minH='15rem' alignItems='center'>{file ? <img src={URL.createObjectURL(file)} alt='Image' /> : <ImagePlus size={25} />}</Flex>
								</SquareButton>
								<Input
									id='image'
									type='file'
									display='none'
									accept='.jpg,.jpeg,.png'
									ref={hiddenFileInput}
									onChange={(event) => {setFile(event.target.files ? event.target.files[0] : null)}}
									placeholder='Image'
								/>
							</FormControl>
							<FormControl pt={2}>
								<FormLabel>From</FormLabel>
								<Input id='to' type="datetime-local" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setToDate(new Date(event.target.value))} placeholder='From' />
							</FormControl>
							<FormControl pt={2}>
								<FormLabel>To</FormLabel>
								<Input id='to' type="datetime-local" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFromDate(new Date(event.target.value))} placeholder='To' />
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
