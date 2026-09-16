import { useState } from 'react';
import styled from 'styled-components';
import { mockProducts as products } from '../../../data/mock-products';
import { mockWishlist } from '../../../data/mock-wishlist';
import deleteIcon from '../../../components/icon/delete.png';
import cartIcon from '../../../components/icon/bag.png';
import { PagesTitle } from '../../../components';
import { getStoredValue, setStoredValue } from '../../../utils/local-storage';

const FavouritesContainer = ({ className }) => {
	const [wishlistProductIds, setWishlistProductIds] = useState(() =>
		getStoredValue('wishlist', mockWishlist),
	);
	const [cartProductIds, setCartProductIds] = useState(() =>
		getStoredValue('cart', []),
	);
	const favouriteProducts = products.filter((product) =>
		wishlistProductIds.includes(product.id),
	);

	const removeFromWishlist = (productId) => {
		const nextWishlistProductIds = wishlistProductIds.filter(
			(id) => id !== productId,
		);

		setWishlistProductIds(nextWishlistProductIds);
		setStoredValue('wishlist', nextWishlistProductIds);
	};

	const toggleCartProduct = (productId) => {
		const nextCartProductIds = cartProductIds.includes(productId)
			? cartProductIds.filter((id) => id !== productId)
			: [...cartProductIds, productId];

		setCartProductIds(nextCartProductIds);
		setStoredValue('cart', nextCartProductIds);
	};

	return (
		<div className={className}>
			<PagesTitle eyebrow="Личное" title="Избранное" />
			<ResultsHeader>
				<ResultsCount>
					{favouriteProducts.length}{' '}
					{favouriteProducts.length === 1 ? 'украшение' : 'украшений'}
				</ResultsCount>
			</ResultsHeader>
			{favouriteProducts.length > 0 ? (
				favouriteProducts.map((product) => (
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
							<DeleteButton
								type="button"
								aria-label={`Убрать ${product.title} из избранного`}
								onClick={() => removeFromWishlist(product.id)}
							>
								<DeleteIcon src={deleteIcon} alt="" />
							</DeleteButton>
							<CartButton
								type="button"
								$active={cartProductIds.includes(product.id)}
								aria-label={
									cartProductIds.includes(product.id)
										? `Убрать ${product.title} из корзины`
										: `Добавить ${product.title} в корзину`
								}
								aria-pressed={cartProductIds.includes(product.id)}
								onClick={() => toggleCartProduct(product.id)}
							>
								<CartIcon
									src={cartIcon}
									alt=""
									$active={cartProductIds.includes(product.id)}
								/>
							</CartButton>
							<ImageIndicators aria-hidden="true">
								<ImageIndicator $active />
								<ImageIndicator />
							</ImageIndicators>
						</ImageWrapper>
						<ProductTitle>{product.title}</ProductTitle>
						<ProductPrice>
							{product.price.toLocaleString('ru-RU')} ₽
						</ProductPrice>
					</ProductCard>
				))
			) : (
				<EmptyState>
					<EmptyTitle>В избранном пока пусто</EmptyTitle>
					<EmptyText>
						Сохраняйте украшения, которые хотите рассмотреть позже.
					</EmptyText>
				</EmptyState>
			)}
		</div>
	);
};

const ResultsHeader = styled.div`
	grid-column: 1 / -1;
	margin: 0 0 -12px;
`;

const ResultsCount = styled.p`
	margin: 0;
	color: #81776e;
	font-size: 12px;
`;

const EmptyState = styled.div`
	grid-column: 1 / -1;
	padding: 40px 0 72px;
	border-bottom: 1px solid #d8cec2;
	text-align: center;
`;

const EmptyTitle = styled.h2`
	margin: 0 0 8px;
	color: #302c28;
	font-size: 20px;
	font-weight: 500;
`;

const EmptyText = styled.p`
	margin: 0;
	color: #81776e;
	font-size: 14px;
`;

const ProductCard = styled.article`
	min-width: 0;
`;

const ImageTrack = styled.div`
	display: flex;
	width: 200%;
	height: 100%;
	transition: transform 360ms ease;
`;

const ProductImage = styled.img`
	display: block;
	flex: 0 0 50%;
	width: 50%;
	height: 100%;
	object-fit: cover;
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

const DeleteButton = styled.button`
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

const DeleteIcon = styled.img`
	width: 19px;
	height: 19px;
	object-fit: contain;
`;

const CartButton = styled.button`
	position: absolute;
	top: 56px;
	right: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	padding: 0;
	border: 0;
	border-radius: 50%;
	background: ${({ $active }) => ($active ? '#b89b72' : 'rgba(255, 255, 255, 0.88)')};
	cursor: pointer;
	transition:
		transform 160ms ease,
		background 160ms ease;
`;

const CartIcon = styled.img`
	width: 19px;
	height: 19px;
	object-fit: contain;
	filter: ${({ $active }) => ($active ? 'brightness(0) invert(1)' : 'none')};
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

export const Favourites = styled(FavouritesContainer)`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 32px 20px;
	width: calc(100% - 48px);
	max-width: 1440px;
	margin: 0 auto 64px;

	@media (max-width: 900px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 28px 16px;
		width: calc(100% - 32px);
	}

	@media (max-width: 520px) {
		grid-template-columns: 1fr;
	}
`;
