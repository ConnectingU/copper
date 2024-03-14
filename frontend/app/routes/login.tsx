import {
	Box,
	Button,
	FormControl,
	Heading,
	Input,
	Stack,
	Text,
	Flex,
	Link,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { AuthService } from '~/services/services';

export default function Login() {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			await AuthService.login(values.email, values.password);
			if(Cookies.get('auth')) {
				navigate('/');
			}
		}
	});

	useEffect(() => {
		if(Cookies.get('auth')) {
			navigate('/');
		}
	}, []);

	return (
		<Flex as='main' w='100%' h='100vh' flexDir='column' justify='center' alignItems='center' p={6}>
			<Stack spacing={8}>
				<Stack spacing={4} textAlign='center'>
					<img src='\logo-transparent.png' alt='logo' width='400px' />
					<Heading fontSize='4xl'>Log in to your account</Heading>
					<Text color='gray'>
						Don't have an account? <Link color='lightblue' href='/signup'>Sign up</Link>
					</Text>
				</Stack>
				<Box
					boxShadow='md'
					borderRadius='xl'
					p={6}
					rounded='md'
					bg='white'
					maxW='lg'
					width='100%'
				>
					<form onSubmit={formik.handleSubmit}>
						<Stack spacing={2}>
							<FormControl>
								<Input
									id='email'
									type='email'
									placeholder='E-Mail'
									onChange={formik.handleChange}
									value={formik.values.email}
									autoComplete="off"
								/>
							</FormControl>
							<FormControl>
								<Input
									id='password'
									type='password'
									placeholder='Password'
									onChange={formik.handleChange}
									value={formik.values.password}
									autoComplete="off"
								/>
							</FormControl>
							<Button type='submit' bgColor='orange'>Sign in</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	)
}