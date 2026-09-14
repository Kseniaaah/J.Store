import styled from 'styled-components';

const CollectionsContainer = ({ className }) => {

	return (
		<div className={className}>
			<p>
				Collections
			</p>
		</div>
	);
};

export const Collections = styled(CollectionsContainer)`
	margin-bottom: 64px;

`;
