import styled from 'styled-components';
import { BackBanner, Bestsellers, HeroBanner } from './components';

const HomeContainer = ({ className, products }) => {
	return (
		<div className={className}>
			<HeroBanner />
			<Bestsellers products={products} />
			<BackBanner />
		</div>
	);
};

export const Home = styled(HomeContainer)`
	width: 100%;
`;
