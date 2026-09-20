import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProductLink } from '../../../components/product-link/product-link';
import { mockCollections } from '../../../data/mock-collections';
import { mockWishlist } from '../../../data/mock-wishlist';
import heartIcon from '../../../components/icon/heartHeader.png';
import cartIcon from '../../../components/icon/bag.png';
import { PagesTitle } from '../../../components';
import { getStoredValue, setStoredValue } from '../../../utils/local-storage';

const categoryFilters = [
	{ id: 'all', title: 'Все украшения' },
	{ id: 'rings', title: 'Кольца' },
	{ id: 'necklaces', title: 'Ожерелья' },
	{ id: 'earrings', title: 'Серьги' },
	{ id: 'bracelets', title: 'Браслеты' },
	{ id: 'wedding', title: 'Свадебные' },
	{ id: 'bestsellers', title: 'Бестселлеры' },
];

const materialFilters = [
	{ id: 'silver', title: 'Серебро' },
	{ id: 'gold', title: 'Золото' },
];

const sortOptions = [
	{ id: 'default', title: 'По популярности' },
	{ id: 'priceAscending', title: 'Сначала дешевле' },
	{ id: 'priceDescending', title: 'Сначала дороже' },
	{ id: 'title', title: 'По названию' },
];

const getProductMaterial = (product) => {
	const material = (product.material || '').toLowerCase();
	if (material.includes('серебр')) return 'silver';
	if (material.includes('золот')) return 'gold';
	return null;
};

const JeweleryContainer = ({ className, products }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [wishlistProductIds, setWishlistProductIds] = useState(() =>
		getStoredValue('wishlist', mockWishlist),
	);
	const [cartProductIds, setCartProductIds] = useState(() =>
		getStoredValue('cart', []),
	);
	const [activeCategory, setActiveCategory] = useState('all');
	const [activeMaterial, setActiveMaterial] = useState('all');
	const [sortOrder, setSortOrder] = useState('default');
	const requestedCollection = searchParams.get('collection');
	const activeCollection = mockCollections.some(
		(collection) => String(collection.id) === requestedCollection,
	)
		? requestedCollection
		: 'all';

	const selectCollection = (collectionId) => {
		setSearchParams((currentParams) => {
			const nextParams = new URLSearchParams(currentParams);
			if (collectionId === 'all') {
				nextParams.delete('collection');
			} else {
				nextParams.set('collection', collectionId);
			}
			return nextParams;
		});
	};

	const filteredProducts = products
		.filter((product) => {
			const matchesCategory =
				activeCategory === 'all' ||
				(activeCategory === 'bestsellers'
						? product.bestseller
						: product.category === activeCategory);
			const matchesMaterial =
				activeMaterial === 'all' ||
				getProductMaterial(product) === activeMaterial;
			const requestedCategory = searchParams.get('category');
			const matchesRequestedCategory =
				!requestedCategory || requestedCategory === product.category;
			const matchesCollection =
				activeCollection === 'all' ||
				product.collectionId === Number(activeCollection);

			return (
				matchesCategory &&
				matchesMaterial &&
				matchesRequestedCategory &&
				matchesCollection
			);
		})
		.sort((firstProduct, secondProduct) => {
			if (sortOrder === 'priceAscending')
				return firstProduct.price - secondProduct.price;
			if (sortOrder === 'priceDescending')
				return secondProduct.price - firstProduct.price;
			if (sortOrder === 'title')
				return firstProduct.title.localeCompare(secondProduct.title, 'ru');

			return Number(secondProduct.bestseller) - Number(firstProduct.bestseller);
		});

	const toggleCartProduct = (productId) => {
		const nextCartProductIds = cartProductIds.includes(productId)
			? cartProductIds.filter((id) => id !== productId)
			: [...cartProductIds, productId];

		setCartProductIds(nextCartProductIds);
		setStoredValue('cart', nextCartProductIds);
	};

	const toggleWishlistProduct = (productId) => {
		const nextWishlistProductIds = wishlistProductIds.includes(productId)
			? wishlistProductIds.filter((id) => id !== productId)
			: [...wishlistProductIds, productId];

		setWishlistProductIds(nextWishlistProductIds);
		setStoredValue('wishlist', nextWishlistProductIds);
	};

	return (
		<div className={className}>
			<PagesTitle eyebrow="Украшения" title="Выбери то, что ближе" />
			<FiltersPanel aria-label="Фильтры каталога">
				<CategoryFilters aria-label="Категории">
					{categoryFilters.map((filter) => (
						<FilterButton
							key={filter.id}
							type="button"
							$active={activeCategory === filter.id}
							onClick={() => setActiveCategory(filter.id)}
						>
							{filter.title}
						</FilterButton>
					))}
				</CategoryFilters>
				<OptionsRow>
					<FilterGroup>
						<FilterLabel htmlFor="material-filter">Материал</FilterLabel>
						<SelectWrap>
							<FilterSelect
								id="material-filter"
								value={activeMaterial}
								onChange={(event) =>
									setActiveMaterial(event.target.value)
								}
							>
								<option value="all">Все материалы</option>
								{materialFilters.map((filter) => (
									<option key={filter.id} value={filter.id}>
										{filter.title}
									</option>
								))}
							</FilterSelect>
						</SelectWrap>
					</FilterGroup>
					<FilterGroup>
						<FilterLabel htmlFor="collection-filter">Коллекция</FilterLabel>
						<SelectWrap>
							<FilterSelect
								id="collection-filter"
								value={activeCollection}
								onChange={(event) =>
									selectCollection(event.target.value)
								}
							>
								<option value="all">Все коллекции</option>
								{mockCollections.map((collection) => (
									<option key={collection.id} value={collection.id}>
										{collection.title}
									</option>
								))}
							</FilterSelect>
						</SelectWrap>
					</FilterGroup>
					<FilterGroup $sort>
						<FilterLabel htmlFor="sort-order">Сортировка</FilterLabel>
						<SelectWrap>
							<FilterSelect
								id="sort-order"
								value={sortOrder}
								onChange={(event) => setSortOrder(event.target.value)}
							>
								{sortOptions.map((option) => (
									<option key={option.id} value={option.id}>
										{option.title}
									</option>
								))}
							</FilterSelect>
						</SelectWrap>
					</FilterGroup>
				</OptionsRow>
			</FiltersPanel>
			<ResultsHeader>
				<ResultsCount>
					{filteredProducts.length}{' '}
					{filteredProducts.length === 1 ? 'украшение' : 'украшений'}
				</ResultsCount>
			</ResultsHeader>
			{filteredProducts.length > 0 ? (
				filteredProducts.map((product) => (
					<JewelryCard key={product.id}>
						<ImageWrapper>
							<ProductLink to={`/products/${product.id}`} $image>
								<ImageTrack>
									{[
										product.images[0],
										product.images[1] || product.images[0],
									].map((image, imageIndex) => (
										<ProductImage
											key={`${image}-${imageIndex}`}
											src={image}
											alt={
												imageIndex === 0
													? product.title
													: `${product.title}, фото ${imageIndex + 1}`
											}
										/>
									))}
								</ImageTrack>
							</ProductLink>
							<FavoriteButton
								type="button"
								$active={wishlistProductIds.includes(product.id)}
								aria-label={
									wishlistProductIds.includes(product.id)
										? `Убрать ${product.title} из избранного`
										: `Добавить ${product.title} в избранное`
								}
								aria-pressed={wishlistProductIds.includes(product.id)}
								onClick={() => toggleWishlistProduct(product.id)}
							>
								<FavoriteIcon
									src={heartIcon}
									alt=""
									$active={wishlistProductIds.includes(product.id)}
								/>
							</FavoriteButton>
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
						<ProductTitle>
							<ProductLink to={`/products/${product.id}`}>
								{product.title}
							</ProductLink>
						</ProductTitle>
						<ProductPrice>
							{product.price.toLocaleString('ru-RU')} ₽
						</ProductPrice>
					</JewelryCard>
				))
			) : (
				<EmptyState>По этим параметрам украшений пока нет.</EmptyState>
			)}
		</div>
	);
};

const FiltersPanel = styled.section`
	grid-column: 1 / -1;
	width: 100%;
	margin: 0 0 24px;
	padding: 0 0 18px;
	border-bottom: 1px solid #d8cec2;
`;

const CategoryFilters = styled.nav`
	display: flex;
	gap: 8px 22px;
	overflow-x: auto;
	padding-bottom: 4px;
	scrollbar-width: thin;
`;

const FilterButton = styled.button`
	flex: 0 0 auto;
	padding: 0 0 7px;
	border: 0;
	border-bottom: 1px solid ${({ $active }) => ($active ? '#302c28' : 'transparent')};
	background: transparent;
	color: ${({ $active }) => ($active ? '#302c28' : '#81776e')};
	font: inherit;
	font-size: 13px;
	cursor: pointer;
	transition:
		color 160ms ease,
		border-color 160ms ease;

	&:hover {
		color: #302c28;
	}
`;

const OptionsRow = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 28px;
	margin-top: 18px;

	@media (max-width: 900px) {
		gap: 16px 20px;
	}

	@media (max-width: 560px) {
		align-items: stretch;
		flex-direction: column;
	}
`;

const FilterGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	${({ $sort }) => $sort && 'margin-left: auto;'}

	@media (max-width: 560px) {
		justify-content: space-between;
		margin-left: 0;
	}
`;

const FilterLabel = styled.label`
	color: #9c8264;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
`;

const SelectWrap = styled.div`
	position: relative;

	&::after {
		position: absolute;
		top: 50%;
		right: 12px;
		width: 6px;
		height: 6px;
		border-right: 1px solid #81776e;
		border-bottom: 1px solid #81776e;
		content: '';
		pointer-events: none;
		transform: translateY(-65%) rotate(45deg);
	}
`;

const FilterSelect = styled.select`
	min-width: 150px;
	padding: 9px 34px 9px 12px;
	border: 1px solid #d8cec2;
	border-radius: 2px;
	outline: 0;
	background: #faf8f5;
	color: #302c28;
	font: inherit;
	font-size: 13px;
	appearance: none;
	cursor: pointer;
	transition:
		border-color 160ms ease,
		background 160ms ease;

	&:hover,
	&:focus {
		border-color: #b89b72;
		background: #fff;
	}

	@media (max-width: 560px) {
		flex: 1;
		min-width: 0;
	}
`;

const ResultsHeader = styled.div`
	grid-column: 1 / -1;
	margin: 0 0 -12px;
`;

const ResultsCount = styled.p`
	margin: 0;
	color: #81776e;
	font-size: 12px;
`;

const EmptyState = styled.p`
	grid-column: 1 / -1;
	margin: 24px 0 0;
	color: #665f57;
	font-size: 15px;
`;

const JewelryCard = styled.article`
	min-width: 0;
`;

const ImageTrack = styled.div`
	display: flex;
	width: 200%;
	height: 100%;
	transition: transform 360ms ease;
`;

const ImageIndicators = styled.div`
	pointer-events: none;
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
	background: ${({ $active }) => ($active ? '#b89b72' : 'rgba(255, 255, 255, 0.88)')};
	cursor: pointer;
	transition:
		transform 160ms ease,
		background 160ms ease;

	&:hover {
		background: ${({ $active }) => ($active ? '#a48662' : '#fff')};
		transform: scale(1.06);
	}
`;

const FavoriteIcon = styled.img`
	width: 19px;
	height: 19px;
	object-fit: contain;
	filter: ${({ $active }) => ($active ? 'brightness(0) invert(1)' : 'none')};
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

	&:hover {
		background: ${({ $active }) => ($active ? '#a48662' : '#fff')};
		transform: scale(1.06);
	}
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

export const Jewelery = styled(JeweleryContainer)`
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
	margin-bottom: 64px;
`;
