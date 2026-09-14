import { Logo, ControlPanel, Navigation } from './components';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Navigation />
		<Logo />
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
	align-items: center;
	width: 100%;
	min-height: 72px;
	padding: 0 40px;
	background-color: #fff;
	border-bottom: 1px solid #eeeae4;

	@media (max-width: 900px) {
		padding: 0 20px;
	}
`;
