import styled from 'styled-components';
import { mockProducts as products } from '../../../../data/mock-products';
import heartIcon from '../../../../components/icon/heartHeader.png';
import { PagesTitle } from '../../../../components';

const BestsellersContainer = ({ className }) => {
	const bestsellers = products.filter((product) => product.bestseller);

	return (
		<section className={className}>
			<PagesTitle eyebrow="Популярное" title="Бестселлеры" />
			<div className="products-grid">
				{bestsellers.map((product) => (
					<ProductCard key={product.id}>
						<ImageWrapper>
							<ImageTrack>
								{product.images.slice(0, 2).map((image, imageIndex) => (
									<ProductImage
										key={image}
										src={image}
										alt={
											imageIndex === 0
												? product.title
												: `${product.title}, фото ${imageIndex + 1}`
										}
									/>
								))}
							</ImageTrack>
							<FavoriteButton
								type="button"
								aria-label={`Добавить ${product.title} в избранное`}
							>
								<FavoriteIcon src={heartIcon} alt="" />
							</FavoriteButton>
							<ImageIndicators aria-hidden="true">
								<ImageIndicator $active />
								<ImageIndicator />
							</ImageIndicators>
						</ImageWrapper>
						<ProductTitle>{product.title}</ProductTitle>
						<ProductPrice>{product.price.toLocaleString('ru-RU')} ₽</ProductPrice>
					</ProductCard>
				))}
			</div>
		</section>
	);
};

const ProductCard = styled.article`
	min-width: 0;
`;

const ImageTrack = styled.div`
	display: flex;
	width: 200%;
	height: 100%;
	transition: transform 360ms ease;
`;

const ImageIndicators = styled.div`
	position: absolute;
	bottom: 12px;
	left: 50%;
	display: flex;
	gap: 6px;
	transform: translateX(-50%);
`;

const ImageIndicator = styled.span`
	display: block;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: ${({ $active }) => ($active ? '#302c28' : 'rgba(48, 44, 40, 0.35)')};
	transition: background 360ms ease;
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: 3 / 4;
	overflow: hidden;
	background: #f1ede7;

	&:hover ${ImageTrack} {
		transform: translateX(-50%);
	}

	&:hover ${ImageIndicator}:first-child {
		background: rgba(48, 44, 40, 0.35);
	}

	&:hover ${ImageIndicator}:last-child {
		background: #302c28;
	}
`;

const ProductImage = styled.img`
	display: block;
	flex: 0 0 50%;
	width: 50%;
	height: 100%;
	object-fit: cover;
`;

const FavoriteButton = styled.button`
	position: absolute;
	top: 12px;
	right: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	padding: 0;
	border: 0;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.88);
	cursor: pointer;
	transition:
		transform 160ms ease,
		background 160ms ease;

	&:hover {
		background: #fff;
		transform: scale(1.06);
	}
`;

const FavoriteIcon = styled.img`
	width: 19px;
	height: 19px;
	object-fit: contain;
`;

const ProductTitle = styled.h3`
	margin: 12px 0 6px;
	color: #302c28;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.3;
`;

const ProductPrice = styled.p`
	margin: 0;
	color: #302c28;
	font-size: 15px;
	font-weight: 600;
	line-height: 1.3;
`;

export const Bestsellers = styled(BestsellersContainer)`
	width: 100%;
	padding-top: 32px;
	margin-bottom: 80px;

	.products-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 32px 20px;
		width: calc(100% - 48px);
		max-width: 1440px;
		margin: 0 auto;
	}

	@media (max-width: 900px) {
		.products-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 28px 16px;
			width: calc(100% - 32px);
		}
	}

	@media (max-width: 520px) {
		.products-grid {
			grid-template-columns: 1fr;
		}
	}
`;
