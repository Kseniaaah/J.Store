import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductLink } from '../../../components/product-link/product-link';
import { PagesTitle } from '../../../components';
import { getStoredValue, setStoredValue } from '../../../utils/local-storage';

const getCartProductIds = () => {
	const value = getStoredValue('cart', []);

	return Array.isArray(value) ? value : [];
};

const CartContainer = ({ className, products }) => {
	const [cartProductIds, setCartProductIds] = useState(getCartProductIds);
	const [isRequestOpen, setIsRequestOpen] = useState(false);
	const [isRequestSent, setIsRequestSent] = useState(false);
	const cartProducts = cartProductIds
		.map((productId) => products.find((product) => product.id === productId))
		.filter(Boolean);
	const totalPrice = cartProducts.reduce((total, product) => total + product.price, 0);

	useEffect(() => {
		if (!isRequestOpen) return undefined;

		const closeOnEscape = (event) => {
			if (event.key === 'Escape') setIsRequestOpen(false);
		};

		document.addEventListener('keydown', closeOnEscape);
		return () => document.removeEventListener('keydown', closeOnEscape);
	}, [isRequestOpen]);

	const removeFromCart = (productId) => {
		const nextCartProductIds = cartProductIds.filter((id) => id !== productId);

		setCartProductIds(nextCartProductIds);
		setStoredValue('cart', nextCartProductIds);
	};

	return (
		<div className={className}>
			<PagesTitle eyebrow="Личное" title="Корзина" />
			{cartProducts.length > 0 ? (
				<CartLayout>
					<CartListHeader>
						<CartCount>
							{cartProducts.length}{' '}
							{cartProducts.length === 1 ? 'украшение' : 'украшений'}
						</CartCount>
					</CartListHeader>
					<CartList aria-label="Товары в корзине">
						{cartProducts.map((product) => (
							<CartItem key={product.id}>
								<ProductLink to={`/products/${product.id}`} $image>
									<ProductImage
										src={product.images[0]}
										alt={product.title}
									/>
								</ProductLink>
								<ProductInfo>
									<ProductTitle>
										<ProductLink to={`/products/${product.id}`}>
											{product.title}
										</ProductLink>
									</ProductTitle>
									<ProductMeta>Украшение · в наличии</ProductMeta>
								</ProductInfo>
								<ItemPrice>
									{product.price.toLocaleString('ru-RU')} ₽
								</ItemPrice>
								<RemoveButton
									type="button"
									aria-label={`Удалить ${product.title} из корзины`}
									onClick={() => removeFromCart(product.id)}
								>
									×
								</RemoveButton>
							</CartItem>
						))}
					</CartList>
					<OrderSummary>
						<SummaryLabel>Итоговая стоимость</SummaryLabel>
						<SummaryPrice>
							{totalPrice.toLocaleString('ru-RU')} ₽
						</SummaryPrice>
						<SummaryNote>
							Доставка и окончательная стоимость уточняются после
							подтверждения заказа.
						</SummaryNote>
						<CheckoutButton
							type="button"
							onClick={() => {
								setIsRequestSent(false);
								setIsRequestOpen(true);
							}}
						>
							Оформить заявку
						</CheckoutButton>
					</OrderSummary>
				</CartLayout>
			) : (
				<EmptyState>
					<EmptyTitle>Корзина пока пуста</EmptyTitle>
					<EmptyText>
						Добавьте понравившиеся украшения, чтобы оформить заявку.
					</EmptyText>
				</EmptyState>
			)}
			{isRequestOpen && (
				<RequestOverlay onMouseDown={() => setIsRequestOpen(false)}>
					<RequestModal
						role="dialog"
						aria-modal="true"
						aria-labelledby="request-title"
						onMouseDown={(event) => event.stopPropagation()}
					>
						<CloseButton
							type="button"
							aria-label="Закрыть форму заявки"
							onClick={() => setIsRequestOpen(false)}
						>
							×
						</CloseButton>
						{isRequestSent ? (
							<SuccessState>
								<ModalEyebrow>Спасибо</ModalEyebrow>
								<ModalTitle>Заявка отправлена</ModalTitle>
								<ModalText>
									Мы свяжемся с вами, чтобы подтвердить наличие
									украшений и детали заказа.
								</ModalText>
								<ModalButton
									type="button"
									onClick={() => setIsRequestOpen(false)}
								>
									Закрыть
								</ModalButton>
							</SuccessState>
						) : (
							<RequestForm
								onSubmit={(event) => {
									event.preventDefault();
									setIsRequestSent(true);
								}}
							>
								<ModalEyebrow>Оформление заявки</ModalEyebrow>
								<ModalTitle id="request-title">
									Расскажите о себе
								</ModalTitle>
								<ModalText>
									Оставьте контакты, и мы свяжемся с вами для
									подтверждения заказа.
								</ModalText>
								<FormLabel>
									Имя
									<FormInput
										type="text"
										name="name"
										placeholder="Ваше имя"
										required
									/>
								</FormLabel>
								<FormLabel>
									Телефон
									<FormInput
										type="tel"
										name="phone"
										placeholder="+7 (___) ___-__-__"
										required
									/>
								</FormLabel>
								<FormLabel>
									Комментарий
									<FormTextarea
										name="comment"
										placeholder="Размер, пожелания или вопрос"
										rows="3"
									/>
								</FormLabel>
								<ModalButton type="submit">Отправить заявку</ModalButton>
							</RequestForm>
						)}
					</RequestModal>
				</RequestOverlay>
			)}
		</div>
	);
};

const CartLayout = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) 300px;
	gap: 56px;
	align-items: start;
	width: calc(100% - 48px);
	max-width: 1440px;
	margin: 0 auto 72px;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
		gap: 32px;
		width: calc(100% - 32px);
	}
`;

const CartList = styled.section``;

const CartListHeader = styled.div`
	grid-column: 1 / -1;
	padding-bottom: 14px;
	border-bottom: 1px solid #d8cec2;
`;

const CartCount = styled.p`
	margin: 0;
	color: #81776e;
	font-size: 12px;
`;

const CartItem = styled.article`
	display: grid;
	grid-template-columns: 88px minmax(0, 1fr) auto 28px;
	gap: 20px;
	align-items: center;
	padding: 18px 0;
	border-bottom: 1px solid #d8cec2;

	@media (max-width: 560px) {
		grid-template-columns: 68px minmax(0, 1fr) 28px;
		gap: 12px;
	}
`;

const ProductImage = styled.img`
	display: block;
	width: 88px;
	height: 104px;
	object-fit: cover;
	background: #f1ede7;

	@media (max-width: 560px) {
		width: 68px;
		height: 82px;
	}
`;

const ProductInfo = styled.div`
	min-width: 0;
`;

const ProductTitle = styled.h2`
	margin: 0 0 8px;
	color: #302c28;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.35;
`;

const ProductMeta = styled.p`
	margin: 0;
	color: #81776e;
	font-size: 12px;
`;

const ItemPrice = styled.p`
	margin: 0;
	color: #302c28;
	font-size: 15px;
	font-weight: 600;
	white-space: nowrap;

	@media (max-width: 560px) {
		grid-column: 2;
		grid-row: 2;
	}
`;

const RemoveButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	padding: 0;
	border: 1px solid transparent;
	border-radius: 50%;
	background: transparent;
	color: #81776e;
	font-size: 23px;
	font-weight: 300;
	line-height: 1;
	cursor: pointer;
	transition:
		color 160ms ease,
		border-color 160ms ease;

	&:hover {
		border-color: #d8cec2;
		color: #302c28;
	}
`;

const OrderSummary = styled.aside`
	padding: 24px;
	border: 1px solid #d8cec2;
	background: #faf8f5;

	@media (max-width: 900px) {
		max-width: 420px;
	}
`;

const SummaryLabel = styled.p`
	margin: 0 0 8px;
	color: #81776e;
	font-size: 12px;
`;

const SummaryPrice = styled.p`
	margin: 0;
	color: #302c28;
	font-size: 24px;
	font-weight: 600;
`;

const SummaryNote = styled.p`
	margin: 18px 0 24px;
	color: #81776e;
	font-size: 12px;
	line-height: 1.6;
`;

const CheckoutButton = styled.button`
	width: 100%;
	padding: 13px 16px;
	border: 1px solid #302c28;
	background: #302c28;
	color: #fff;
	font: inherit;
	font-size: 13px;
	cursor: pointer;
	transition:
		background 160ms ease,
		color 160ms ease;

	&:hover {
		border-color: #b89b72;
		background: #b89b72;
	}
`;

const EmptyState = styled.div`
	width: calc(100% - 48px);
	max-width: 1180px;
	padding: 56px 0 72px;
	margin: 0 auto 72px;
	border-bottom: 1px solid #d8cec2;
	text-align: center;

	@media (max-width: 900px) {
		width: calc(100% - 32px);
	}
`;

const EmptyTitle = styled.h2`
	margin: 0 0 8px;
	color: #302c28;
	font-size: 22px;
	font-weight: 500;
`;

const EmptyText = styled.p`
	margin: 0;
	color: #81776e;
	font-size: 14px;
`;

const RequestOverlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px;
	background: rgba(48, 44, 40, 0.34);
`;

const RequestModal = styled.div`
	position: relative;
	width: min(100%, 480px);
	max-height: calc(100vh - 48px);
	overflow-y: auto;
	padding: 36px;
	background: #faf8f5;
	box-shadow: 0 18px 60px rgba(48, 44, 40, 0.18);

	@media (max-width: 520px) {
		padding: 32px 20px 24px;
	}
`;

const CloseButton = styled.button`
	position: absolute;
	top: 12px;
	right: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	padding: 0;
	border: 1px solid transparent;
	border-radius: 50%;
	background: transparent;
	color: #81776e;
	font-size: 24px;
	font-weight: 300;
	line-height: 1;
	cursor: pointer;

	&:hover {
		border-color: #d8cec2;
		color: #302c28;
	}
`;

const RequestForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const ModalEyebrow = styled.span`
	display: block;
	margin-bottom: 8px;
	color: #9c8264;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
`;

const ModalTitle = styled.h2`
	margin: 0 0 10px;
	color: #302c28;
	font-size: 25px;
	font-weight: 500;
`;

const ModalText = styled.p`
	margin: 0 0 8px;
	color: #81776e;
	font-size: 13px;
	line-height: 1.6;
`;

const FormLabel = styled.label`
	display: flex;
	flex-direction: column;
	gap: 7px;
	color: #665f57;
	font-size: 12px;
`;

const FormInput = styled.input`
	width: 100%;
	padding: 11px 12px;
	border: 1px solid #d8cec2;
	border-radius: 2px;
	outline: 0;
	background: #fffdf9;
	color: #302c28;
	font: inherit;

	&:focus {
		border-color: #b89b72;
		box-shadow: 0 0 0 3px rgba(184, 155, 114, 0.14);
	}
`;

const FormTextarea = styled.textarea`
	width: 100%;
	padding: 11px 12px;
	border: 1px solid #d8cec2;
	border-radius: 2px;
	outline: 0;
	resize: vertical;
	background: #fffdf9;
	color: #302c28;
	font: inherit;

	&:focus {
		border-color: #b89b72;
		box-shadow: 0 0 0 3px rgba(184, 155, 114, 0.14);
	}
`;

const ModalButton = styled.button`
	width: 100%;
	margin-top: 4px;
	padding: 13px 16px;
	border: 1px solid #302c28;
	background: #302c28;
	color: #fff;
	font: inherit;
	font-size: 13px;
	cursor: pointer;
	transition:
		background 160ms ease,
		border-color 160ms ease;

	&:hover {
		border-color: #b89b72;
		background: #b89b72;
	}
`;

const SuccessState = styled.div`
	padding: 18px 0 4px;
`;

export const Cart = styled(CartContainer)``;
