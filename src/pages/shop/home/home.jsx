import styled from 'styled-components';
import { BackBanner, Bestsellers, HeroBanner } from './components';

const HomeContainer = ({ className }) => {
	return (
		<div className={className}>
			<HeroBanner />
			<Bestsellers />
			<BackBanner />
		</div>
	);
};

export const Home = styled(HomeContainer)`
	width: 100%;
`;
