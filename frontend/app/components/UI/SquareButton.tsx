import { Button } from "@chakra-ui/react";

interface SquareButtonProps {
	onClick: () => void;
	children: React.ReactNode;
	w: number;
	h: number;
}

export default function SquareButton(props: SquareButtonProps) {
	return (
		<Button 
			w={props.w}
			h={props.h}
			bgColor='rgba(0, 0, 0, 0.35)'
			_hover={{bg: 'rgba(0, 0, 0, 0.45)'}}
			overflow='hidden'
			onClick={props.onClick}
			textColor='white'
			p={0}
		>
			{props.children}
		</Button>
	)
}