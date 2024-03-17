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
	useBoolean,
} from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { AuthService, UserService } from '~/services';

export default function Signup() {
	const navigate = useNavigate();
	const [passwordInvalid, setPasswordInvalid] = useBoolean();
	const [usernameInvalid, setUsernameInvalid] = useBoolean();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmpassword: '',
			username: '',
		},
		onSubmit: async (values) => {
			if (values.password !== values.confirmpassword) {
				setPasswordInvalid.on();
			}
			if (values.username.length < 3 || values.username.length > 20 || values.username.includes('@')) {
				setUsernameInvalid.on();
			}
			if (!passwordInvalid && !usernameInvalid) {
				await UserService.signup(values.email, values.password, values.username);
				await AuthService.login(values.email, values.password);
				if(Cookies.get('auth')) {
					navigate('/');
				}
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
					<Heading fontSize='4xl'>Sign up for an account</Heading>
					<Text color='gray'>
						Already have an account? <Link color='lightblue' href='/login'>Sign in</Link>
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
					{passwordInvalid && (<Text color='red'>Passwords do not match</Text>)}
					{usernameInvalid && (<Text color='red'>Username must be between 3 and 20 characters and not contain '@'</Text>)}
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
									id='username'
									type='text'
									placeholder='Username'
									onChange={formik.handleChange}
									value={formik.values.username}
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
							<FormControl>
								<Input
									id='confirmpassword'
									type='password'
									placeholder='Confirm Password'
									onChange={formik.handleChange}
									value={formik.values.confirmpassword}
									autoComplete="off"
								/>
							</FormControl>
							<Button type='submit' bgColor='orange'>Sign up</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	)
}
