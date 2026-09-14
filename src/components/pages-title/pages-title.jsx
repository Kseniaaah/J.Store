import styled from 'styled-components';

const PagesTitleContainer = ({ className, title }) => (
	<div className={className}>
		<h1 className="title">{title}</h1>
	</div>
);

export const PagesTitle = styled(PagesTitleContainer)`
	margin: 40px 0 30px 0;
	& .title {
		margin: 0;
		font-family: 'Marck Script', cursive;
		font-size: 40px;
  		font-weight: 400;
		line-height: 1.25;
  		font-style: normal;
	}
`;
