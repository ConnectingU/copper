import { Wrap, Flex, Text, Image, Heading, Box, Button} from '@chakra-ui/react';
import { Globe2 } from 'lucide-react';
import { AuthRedirect } from '~/components/AuthRedirect';

export default function Index() {
	return (
		<AuthRedirect>
			<Box w='80px' h='100vh' justifyItems='center' bgColor='darkOrange'>
				<Flex justify='center' align='top' direction='column' h='100%' pt={5}>
					<Button w={14} h={14}><Globe2 /></Button>
					<Button w={14} h={14}><Globe2 /></Button>
				</Flex>
			</Box>
		</AuthRedirect>
	);
}
