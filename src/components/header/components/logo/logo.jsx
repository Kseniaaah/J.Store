import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const AppName = styled.div`
	font-family: 'Marck Script', cursive;
	font-size: 30px;
	line-height: 1;
	color: #29251f;
	white-space: nowrap;
`;

const LogoContainer = ({ className }) => (
	<NavLink className={className} to="/" aria-label="На главную">
		<AppName>Your Jeweler</AppName>
	</NavLink>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	justify-self: center;
`;
