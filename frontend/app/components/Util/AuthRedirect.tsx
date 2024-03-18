import { useNavigate } from '@remix-run/react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

interface AuthRedirectProps {
	children: React.ReactNode;
}

export function AuthRedirect(props: AuthRedirectProps) {
	const navigate = useNavigate();
	useEffect(() => {
		if(!Cookies.get('auth')) {
			navigate('/login');
		}
	}, []);
	
	return (
		<>
			{props.children}
		</>
	)
}