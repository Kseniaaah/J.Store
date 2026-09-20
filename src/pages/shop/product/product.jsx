import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { categories } from '../../../data/mock-products';
import { mockWishlist } from '../../../data/mock-wishlist';
import { getStoredValue, setStoredValue } from '../../../utils/local-storage';
import heartIcon from '../../../components/icon/heartHeader.png';
import cartIcon from '../../../components/icon/bag.png';

const getProductIds = (key) => {
	const value = getStoredValue(key, key === 'wishlist' ? mockWishlist : []);
	return Array.isArray(value) ? value : [];
};

const ProductDetails = ({ product, collections }) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [wishlistIds, setWishlistIds] = useState(() => getProductIds('wishlist'));
	const [cartIds, setCartIds] = useState(() => getProductIds('cart'));
	const images = (product.images || []).filter(Boolean);
	const category = categories.find((item) => item.id === product.category);
	const collection = collections.find((item) => item.id === product.collectionId);
	const isFavourite = wishlistIds.includes(product.id);
	const isInCart = cartIds.includes(product.id);
	const characteristics = [
		['Материал', product.material || 'Уточняется при заказе'],
		...(product.sizes ? [['Размеры', product.sizes.join(', ')]] : []),
		['Категория', category?.title || 'Украшения'],
		...(collection ? [['Коллекция', collection.title]] : []),
		['Артикул', `YJ-${String(product.id).padStart(4, '0')}`],
	];

	useEffect(() => {
		const syncLists = () => {
			setWishlistIds(getProductIds('wishlist'));
			setCartIds(getProductIds('cart'));
		};
		window.addEventListener('store-update', syncLists);
		window.addEventListener('storage', syncLists);
		return () => {
			window.removeEventListener('store-update', syncLists);
			window.removeEventListener('storage', syncLists);
		};
	}, []);

	const toggleFavourite = () => {
		const currentIds = getProductIds('wishlist');
		setStoredValue(
			'wishlist',
			currentIds.includes(product.id)
				? currentIds.filter((id) => id !== product.id)
				: [...currentIds, product.id],
		);
	};

	const addToCart = () => {
		const currentIds = getProductIds('cart');
		if (!currentIds.includes(product.id)) {
			setStoredValue('cart', [...currentIds, product.id]);
		}
	};

	return (
		<>
			<Breadcrumbs aria-label="Хлебные крошки">
				<Link to="/">Главная</Link>
				<span aria-hidden="true">/</span>
				<Link to="/jewelery">Украшения</Link>
				<span aria-hidden="true">/</span>
				<span aria-current="page">{product.title}</span>
			</Breadcrumbs>
			<ProductLayout>
				<Gallery aria-label={`Фотографии: ${product.title}`}>
					<MainImageFrame>
						{images.length > 0 ? (
							<MainImage
								src={images[activeImageIndex] || images[0]}
								alt={`${product.title}, фото ${activeImageIndex + 1}`}
							/>
						) : (
							<ImagePlaceholder>Фотография скоро появится</ImagePlaceholder>
						)}
						{product.bestseller && <Badge>Бестселлер</Badge>}
						{images.length > 1 && (
							<ImageCount aria-live="polite">
								{activeImageIndex + 1} / {images.length}
							</ImageCount>
						)}
					</MainImageFrame>
					{images.length > 1 && (
						<Thumbnails aria-label="Выбрать фотографию">
							{images.map((image, index) => (
								<Thumbnail
									key={`${image}-${index}`}
									type="button"
									$active={index === activeImageIndex}
									aria-label={`Показать фото ${index + 1}`}
									aria-pressed={index === activeImageIndex}
									onClick={() => setActiveImageIndex(index)}
								>
									<img src={image} alt="" />
								</Thumbnail>
							))}
						</Thumbnails>
					)}
				</Gallery>
				<ProductInfo>
					<Eyebrow>{category?.title || 'Украшения'}</Eyebrow>
					<ProductTitle>{product.title}</ProductTitle>
					<Price>{product.price.toLocaleString('ru-RU')} ₽</Price>
					<Description>
						{product.description || 'Описание скоро появится.'}
					</Description>
					<Actions>
						{isInCart ? (
							<BuyButton as={Link} to="/cart">
								В корзине — перейти <span aria-hidden="true">↗</span>
							</BuyButton>
						) : (
							<BuyButton type="button" onClick={addToCart}>
								<img src={cartIcon} alt="" /> В корзину
							</BuyButton>
						)}
						<FavoriteButton
							type="button"
							$active={isFavourite}
							aria-label={
								isFavourite
									? 'Убрать из избранного'
									: 'Добавить в избранное'
							}
							aria-pressed={isFavourite}
							onClick={toggleFavourite}
						>
							<img src={heartIcon} alt="" />
						</FavoriteButton>
					</Actions>
					<OrderNote>
						Наличие и детали украшения уточним при подтверждении заявки.
					</OrderNote>
					<DetailsSection aria-labelledby="characteristics-title">
						<SectionTitle id="characteristics-title">
							Детали украшения
						</SectionTitle>
						<Characteristics>
							{characteristics.map(([label, value]) => (
								<div key={label}>
									<dt>{label}</dt>
									<dd>{value}</dd>
								</div>
							))}
						</Characteristics>
					</DetailsSection>
					<Accordion>
						<summary>Бережный уход</summary>
						<p>
							Храните украшение отдельно в мягком мешочке или шкатулке.
							Избегайте контакта с парфюмерией и бытовой химией, снимайте
							перед спортом и купанием. Для ухода используйте мягкую сухую
							салфетку.
						</p>
					</Accordion>
					<Accordion>
						<summary>Доставка и оплата</summary>
						<p>
							Отправляем заказы по России в фирменной упаковке. Способ,
							стоимость доставки и оплату согласуем после подтверждения
							заявки.
						</p>
						<Link to="/deliveryAndPayments">
							Подробнее о доставке и оплате ↗
						</Link>
					</Accordion>
				</ProductInfo>
			</ProductLayout>
			<BackLink to="/jewelery">← Вернуться к украшениям</BackLink>
		</>
	);
};

export const Product = ({ products, collections }) => {
	const { id } = useParams();
	const product = products.find((item) => String(item.id) === id);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
		const previousTitle = document.title;
		document.title = `${product?.title || 'Украшение не найдено'} | your jeweler`;
		return () => {
			document.title = previousTitle;
		};
	}, [id, product?.title]);

	return (
		<Page>
			{product ? (
				<ProductDetails key={id} product={product} collections={collections} />
			) : (
				<EmptyState>
					<Eyebrow>your jeweler</Eyebrow>
					<ProductTitle>Украшение не найдено</ProductTitle>
					<Description>
						Возможно, оно больше не представлено в каталоге.
					</Description>
					<BackLink to="/jewelery">← Вернуться к украшениям</BackLink>
				</EmptyState>
			)}
		</Page>
	);
};

const Page = styled.main`
	width: calc(100% - 48px);
	max-width: 1280px;
	margin: 0 auto 72px;
	color: #302c28;

	a:focus-visible,
	button:focus-visible,
	summary:focus-visible {
		outline: 2px solid #9c8264;
		outline-offset: 4px;
	}

	@media (max-width: 900px) {
		width: calc(100% - 32px);
		margin-bottom: 48px;
	}
`;

const Breadcrumbs = styled.nav`
	display: flex;
	flex-wrap: wrap;
	gap: 8px 12px;
	margin: 28px 0;
	color: #81776e;
	font-size: 12px;

	a {
		color: inherit;
	}
	a:hover {
		color: #302c28;
	}
	[aria-current] {
		color: #302c28;
	}
`;

const ProductLayout = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
	align-items: start;
	gap: clamp(32px, 5vw, 80px);

	@media (max-width: 760px) {
		grid-template-columns: 1fr;
		gap: 32px;
	}
`;

const Gallery = styled.section`
	min-width: 0;
`;

const MainImageFrame = styled.div`
	position: relative;
	aspect-ratio: 1 / 1;
	background: #f1ede7;
	overflow: hidden;
`;

const MainImage = styled.img`
	display: block;
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const ImagePlaceholder = styled.p`
	display: grid;
	place-items: center;
	height: 100%;
	margin: 0;
	color: #81776e;
	font-size: 14px;
`;

const Badge = styled.span`
	position: absolute;
	top: 20px;
	left: 20px;
	padding: 7px 12px;
	background: #faf8f5;
	font-size: 10px;
	letter-spacing: 0.12em;
	text-transform: uppercase;
`;

const ImageCount = styled.span`
	position: absolute;
	right: 16px;
	bottom: 16px;
	padding: 5px 10px;
	background: rgba(250, 248, 245, 0.9);
	font-size: 11px;
	letter-spacing: 0.12em;
`;

const Thumbnails = styled.div`
	display: flex;
	gap: 12px;
	padding: 5px;
	margin: 11px -5px -5px;
	overflow-x: auto;
`;

const Thumbnail = styled.button`
	flex: 0 0 76px;
	height: 88px;
	padding: 3px;
	border: 1px solid ${({ $active }) => ($active ? '#9c8264' : '#d8cec2')};
	background: ${({ $active }) => ($active ? '#ede4d6' : 'transparent')};
	cursor: pointer;

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&:hover {
		border-color: #9c8264;
	}
`;

const ProductInfo = styled.section`
	min-width: 0;
	padding-top: 12px;

	@media (max-width: 760px) {
		padding-top: 0;
	}
`;

const Eyebrow = styled.p`
	margin: 0 0 12px;
	color: #8a7d70;
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.16em;
	text-transform: uppercase;
`;

const ProductTitle = styled.h1`
	margin: 0;
	font-family: 'Marck Script', cursive;
	font-size: clamp(36px, 3.8vw, 54px);
	font-weight: 400;
	line-height: 1.1;
	overflow-wrap: anywhere;
`;

const Price = styled.p`
	margin: 24px 0 20px;
	font-size: 24px;
	font-weight: 500;
`;

const Description = styled.p`
	margin: 0 0 28px;
	color: #665f57;
	font-size: 14px;
	line-height: 1.8;
`;

const Actions = styled.div`
	display: flex;
	gap: 12px;
`;

const BuyButton = styled.button`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	gap: 12px;
	min-height: 52px;
	padding: 14px 16px;
	border: 1px solid #302c28;
	background: #302c28;
	color: #fff;
	font: inherit;
	font-size: 13px;
	cursor: pointer;
	transition:
		background 160ms ease,
		border-color 160ms ease;

	img {
		width: 19px;
		height: 19px;
		object-fit: contain;
		filter: brightness(0) invert(1);
	}
	&:hover {
		background: #9c8264;
		border-color: #9c8264;
	}
`;

const FavoriteButton = styled.button`
	display: grid;
	place-items: center;
	flex: 0 0 52px;
	padding: 0;
	border: 1px solid ${({ $active }) => ($active ? '#b89b72' : '#d8cec2')};
	background: ${({ $active }) => ($active ? '#b89b72' : 'transparent')};
	cursor: pointer;
	transition:
		background 160ms ease,
		border-color 160ms ease;

	img {
		width: 21px;
		height: 21px;
		object-fit: contain;
		filter: ${({ $active }) => ($active ? 'brightness(0) invert(1)' : 'none')};
	}
	&:hover {
		border-color: #9c8264;
	}
`;

const OrderNote = styled.p`
	margin: 12px 0 30px;
	color: #81776e;
	font-size: 11px;
	line-height: 1.6;
`;

const DetailsSection = styled.section`
	padding: 24px 0;
	border-top: 1px solid #d8cec2;
`;

const SectionTitle = styled.h2`
	margin: 0 0 18px;
	font-size: 15px;
	font-weight: 500;
`;

const Characteristics = styled.dl`
	display: grid;
	gap: 12px;
	margin: 0;
	font-size: 13px;

	div {
		display: grid;
		grid-template-columns: 1fr 1.3fr;
		gap: 16px;
	}
	dt {
		color: #81776e;
	}
	dd {
		margin: 0;
		text-align: right;
		overflow-wrap: anywhere;
	}
`;

const Accordion = styled.details`
	padding: 20px 0;
	border-top: 1px solid #d8cec2;
	font-size: 13px;

	&:last-child {
		border-bottom: 1px solid #d8cec2;
	}
	summary {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary::after {
		content: '+';
		color: #81776e;
	}
	&[open] summary::after {
		content: '−';
	}
	p {
		margin: 16px 0 0;
		color: #665f57;
		line-height: 1.8;
	}
	a {
		display: inline-block;
		margin-top: 12px;
		color: #9c8264;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
`;

const BackLink = styled(Link)`
	display: inline-block;
	margin-top: 36px;
	padding-bottom: 5px;
	border-bottom: 1px solid #d8cec2;
	color: #665f57;
	font-size: 13px;

	&:hover {
		color: #9c8264;
		border-color: #9c8264;
	}
`;

const EmptyState = styled.div`
	padding: 96px 0;
	text-align: center;

	${Description} {
		margin: 20px 0 0;
	}
`;
