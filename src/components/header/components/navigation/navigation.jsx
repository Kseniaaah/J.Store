import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
	position: relative;
	color: #665f57;
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.02em;
	padding: 8px 12px;
	text-decoration: none;
	transition: color 160ms ease;

	&:hover {
		color: #1f1c18;
	}

	&.active {
		color: #1f1c18;
		text-decoration: none;
	}

	&.active::after {
		content: '';
		position: absolute;
		left: 12px;
		right: 12px;
		bottom: 1px;
		height: 2px;
		background: #b89b72;
	}
`;

const NavContainer = ({ className }) => {
	return (
		<nav className={className}>
			<StyledNavLink to="/about">О бренде</StyledNavLink>
			<StyledNavLink to="/jewelery">Украшения</StyledNavLink>
			<StyledNavLink to="/collections">Коллекции</StyledNavLink>
			<StyledNavLink to="/deliveryAndPayments">Доставка и оплата</StyledNavLink>
		</nav>
	);
};

export const Navigation = styled(NavContainer)`
	display: flex;
	gap: 4px;
	min-width: 0;
	justify-self: start;

	@media (max-width: 760px) {
		gap: 0;

		${StyledNavLink} {
			padding: 8px 7px;
			font-size: 11px;
		}

		${StyledNavLink}.active::after {
			left: 7px;
			right: 7px;
		}
	}
`;
