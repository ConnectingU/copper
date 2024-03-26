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
import { useEffect, useState } from 'react';
import { AuthService } from '~/services';
import { IncorrectPasswordModal } from '~/components/Modals/IncorrectPasswordModal';

export default function Login() {
	const [txt, setTxt] = useState<string>('');
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			try {
				await AuthService.login(values.email, values.password);
				setTxt('')
				if(Cookies.get('auth')) {
					navigate('/');
				}
			}
			catch {
				setTxt(' Incorrect username or password \n Please try again! ')
			}
		}
	});


	useEffect(() => {
		if(Cookies.get('auth')) {
			navigate('/');
		}
	}, []);

	const removeError = async () => {
        setTxt('');
    };

	return (
		<Flex as='main' w='100%' h='100vh' flexDir='column' justify='center' alignItems='center'>
			<Stack spacing={8}>
				<Stack spacing={3} textAlign='center'>
					<img src='\logo-transparent.png' alt='logo' width='400px' />
					<Heading color='white' fontSize='4xl'>Log in to your account</Heading>
					<Text color='gray'>
						Don't have an account? <Link color='lightblue' href='/signup'>Sign up</Link>
					</Text>
					<Text
						color={'gray'}
						fontSize={'xl'}
						>{txt}
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
					bgColor='rgba(0, 0, 0, 0.2)'
				>
					<form onSubmit={formik.handleSubmit}>
						<Stack spacing={2} textColor='white'>
							<FormControl>
								<Input
									id='email'
									type='email'
									placeholder='E-Mail'
									onChange={formik.handleChange}
									value={formik.values.email}
									autoComplete='off'
									onClick={removeError}
									border='1px solid rgba(0, 0, 0, 0.2)'
								/>
							</FormControl>
							<FormControl>
								<Input
									id='password'
									type='password'
									placeholder='Password'
									onChange={formik.handleChange}
									value={formik.values.password}
									autoComplete='off'
									onClick={removeError}
									border='1px solid rgba(0, 0, 0, 0.2)'
								/>
							</FormControl>
							<Button type='submit' textColor='lightgray' bgColor='rgba(0, 0, 0, 0.35)' _hover={{bg: 'rgba(0, 0, 0, 0.45)'}}>Sign in</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	)
}