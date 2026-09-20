import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ProductLink = styled(Link)`
	display: ${({ $image }) => ($image ? 'block' : 'inline')};
	height: ${({ $image }) => ($image ? '100%' : 'auto')};
	color: inherit;

	&:hover {
		color: #9c8264;
	}

	&:focus-visible {
		outline: 2px solid #9c8264;
		outline-offset: ${({ $image }) => ($image ? '-3px' : '4px')};
	}
`;
