import styled from 'styled-components';

const AboutContainer = ({ className }) => {

	return (
		<div className={className}>
			<p>
				About
			</p>

		</div>
	);
};

export const About = styled(AboutContainer)`
	margin-bottom: 64px;

`;
