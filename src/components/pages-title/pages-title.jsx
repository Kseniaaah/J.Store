import styled from 'styled-components';

const PagesTitleContainer = ({ className, eyebrow, title }) => (
	<div className={className}>
		{eyebrow && <span className="eyebrow">{eyebrow}</span>}
		<h1>{title}</h1>
		<div className="rule" />
	</div>
);

export const PagesTitle = styled(PagesTitleContainer)`
	grid-column: 1 / -1;
	width: calc(100% - 48px);
	max-width: 1440px;
	margin: 48px auto 32px;

	.eyebrow {
		display: block;
		margin-bottom: 8px;
		color: #8a7d70;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.16em;
		line-height: 1.4;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-family: 'Marck Script', cursive;
		color: #302c28;
		font-size: clamp(42px, 4vw, 56px);
		font-weight: 400;
		line-height: 1.1;
	}

	.rule {
		width: 100%;
		height: 1px;
		margin-top: 18px;
		background: #d8cec2;
	}

	@media (max-width: 900px) {
		width: calc(100% - 32px);
	}

	@media (max-width: 520px) {
		margin-top: 36px;

		h1 {
			font-size: 42px;
		}
	}
`;
