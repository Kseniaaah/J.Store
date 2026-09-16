import styled from 'styled-components';
import { aboutSections } from '../../../data/mock-about-page';

const AboutContainer = ({ className }) => {
	return (
		<div className={className}>
			<main>
				{aboutSections.map((section) => (
					<section key={section.id}>
						<img src={section.image} alt={section.title} />

						<div>
							<h2>{section.title}</h2>
							<h3>{section.subtitle}</h3>
							<p>{section.text}</p>
						</div>
					</section>
				))}
			</main>
		</div>
	);
};

export const About = styled(AboutContainer)`
	width: 100vw;
	margin: 0 0 64px calc(50% - 50vw);

	main {
		overflow: hidden;
	}

	section {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		min-height: 460px;
		background: #fffdf9;

		&:nth-child(even) {
			background: #f1e9df;

			img {
				grid-column: 2;
				grid-row: 1;
			}

			div {
				grid-column: 1;
				grid-row: 1;
			}
		}
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 460px;
		object-fit: cover;
	}

	section > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: clamp(40px, 5vw, 76px) clamp(28px, 7vw, 104px);
	}

	h2 {
		margin: 0 0 18px;
		font-family: 'Marck Script', cursive;
		font-size: clamp(36px, 4vw, 56px);
		font-weight: 400;
		line-height: 1.1;
		color: #332d27;
	}

	h3 {
		max-width: 440px;
		margin: 0 0 24px;
		font-size: clamp(18px, 2vw, 25px);
		font-weight: 500;
		line-height: 1.3;
		color: #665f57;
	}

	p {
		max-width: 520px;
		margin: 0;
		font-size: 17px;
		line-height: 1.75;
		white-space: pre-line;
		color: #756d64;
	}

	@media (max-width: 700px) {
		margin-bottom: 40px;

		section,
		section:nth-child(even) {
			display: flex;
			flex-direction: column;
			min-height: 0;

			img,
			section:nth-child(even) img {
				order: 1;
				width: 100%;
				height: min(82vw, 400px);
				min-height: 0;
			}

			div,
			section:nth-child(even) div {
				order: 2;
				padding: 42px 24px 48px;
			}
		}

		h2 {
			font-size: 42px;
		}

		p {
			font-size: 16px;
			line-height: 1.75;
		}
	}
`;
