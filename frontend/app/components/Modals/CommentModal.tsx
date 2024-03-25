import { useDisclosure, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, Flex, Textarea, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ArrowBigUp, Frown, MessageSquare, Pencil, Square } from 'lucide-react';
import React from 'react';
import { Comment } from '../UI/Comment';
import SquareButton from '../UI/SquareButton';
import { CommentService } from '~/services';
import Cookies from 'js-cookie';

interface CommentModalProps {
	id: number,
	comments: any[],
	setComments: any,
}

export function CommentModal(props: CommentModalProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)

	const formik = useFormik({
		initialValues: {
			comment: '',
		},
		onSubmit: async (values) => {
			const userId = Number(Cookies.get('userId'));
			const comment = await CommentService.createComment(values.comment, userId, props.id);
			props.setComments([comment, ...props.comments]);
			values.comment = '';
		}
	});

	return (
		<>
			<IconButton
				bgColor='rgba(0, 0, 0, 0)'
				_hover={{ bg: 'rgba(0, 0, 0, 0)' }}
				p={0}
				aria-label={''}
				size='xs'
				icon={<MessageSquare style={{padding: 0, margin: 0}} size={25} color='gray' />} 
				onClick={onOpen}
			/>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
				
			>
				<ModalOverlay />
				<ModalContent bgColor='rgba(0, 0, 0, 0.2)' backdropFilter='blur(12px)' textColor='white' minW='50%'>
					<ModalHeader>Comments</ModalHeader>
					<ModalCloseButton />
					<Flex
						direction='column'
						minH='50vh'
						maxH='50vh'
						gap={3}
						px={4}
						pt={2}
						overflow='scroll'
						alignItems='center'
						css={{
							'&::-webkit-scrollbar': {
								width: '0rem',
							},
						}}
					>
						{props.comments.length === 0 ? 
							(
								<Flex h='calc(100vh - 4rem)' alignItems='center'>
									<Flex alignItems='center' direction='column' gap={5}>
										<Frown color='white' size={80}/>
										<Text fontSize={16} textColor='white'>No comments yet! Be the first to make one!</Text>
									</Flex>
								</Flex>
							) 
							: (props.comments.map((comment: any, index: number) => (
							<Comment key={index} name={comment.user.displayName || comment.user.username} avatarUrl={comment.user.avatarUrl} date={comment.createdAt} content={comment.content} />
						)))}
					</Flex>
					<form onSubmit={formik.handleSubmit}>
						<ModalBody display='flex' gap={4} pb={8} alignItems='center'>
							<FormControl>
								<Textarea id='comment' ref={initialRef} onChange={formik.handleChange} value={formik.values.comment} placeholder='Comment' autoComplete='off' />
							</FormControl>
							<SquareButton type='submit' w={14} h={14}><ArrowBigUp /></SquareButton>
						</ModalBody>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
