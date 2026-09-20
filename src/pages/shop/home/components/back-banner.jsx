import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { mockBackBanners } from '../../../../data/mock-banners';

const getBannerUrl = (target) =>
	target?.type === 'collection'
		? `/jewelery?collection=${target.id}`
		: `/jewelery?category=${target?.id || 'all'}`;

const BackBannerContainer = ({ className }) => {
	return (
		<section className={className}>
			{mockBackBanners.map(({ id, title, alt, image, target }) => (
				<NavLink className="category-card" to={getBannerUrl(target)} key={id}>
					<img src={image} alt={alt} />
					<h2>{title}</h2>
				</NavLink>
			))}
		</section>
	);
};

export const BackBanner = styled(BackBannerContainer)`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr;
	grid-template-rows: repeat(2, minmax(220px, 1fr));
	gap: 2px;
	width: 100%;
	margin-top: 48px;
	margin-bottom: 104px;

	.category-card {
		position: relative;
		min-height: 220px;
		overflow: hidden;
		color: #fff;
		text-decoration: none;
		background: #ddd;
	}

	.category-card:first-child {
		grid-row: span 2;
	}

	.category-card img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 300ms ease;
	}

	.category-card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.25),
			transparent 45%,
			rgba(0, 0, 0, 0.2)
		);
	}

	.category-card h2 {
		position: absolute;
		top: 40px;
		left: 32px;
		z-index: 1;
		margin: 0;
		font-size: 18px;
		font-weight: 600;
	}

	.category-card:hover img {
		transform: scale(1.03);
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(3, 220px);

		.category-card h2 {
			top: 24px;
			left: 20px;
		}

		.category-card:first-child {
			grid-column: span 2;
			grid-row: span 1;
		}
	}
`;
