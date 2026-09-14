import styled from 'styled-components';
import { BackBanner, HeroBanner } from './components';

const HomeContainer = ({ className }) => {
	return (
		<div className={className}>
			<HeroBanner />
			<BackBanner />
		</div>
	);
};

export const Home = styled(HomeContainer)`
	width: 100%;
`;
