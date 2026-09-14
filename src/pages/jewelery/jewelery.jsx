import styled from 'styled-components';

const JeweleryContainer = ({ className }) => {

	return (
		<div className={className}>
			<p>
				Jewelery
			</p>

		</div>
	);
};

export const Jewelery = styled(JeweleryContainer)`
	margin-bottom: 64px;

`;
