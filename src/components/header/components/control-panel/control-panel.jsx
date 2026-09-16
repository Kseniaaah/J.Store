import heartIcon from '../../../icon/heartHeader.png';
import cartIcon from '../../../icon/bag.png';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getStoredValue } from '../../../../utils/local-storage';
import { mockWishlist } from '../../../../data/mock-wishlist';

const getStoredListCount = (key) => {
	const value = getStoredValue(key, key === 'wishlist' ? mockWishlist : []);

	return Array.isArray(value) ? value.length : 0;
};

const ActionButton = styled.button`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	padding: 0;
	border: 1px solid #e9e2d9;
	border-radius: 50%;
	background: #faf8f5;
	cursor: pointer;
	transition:
		background 160ms ease,
		border-color 160ms ease,
		transform 160ms ease;

	&:hover {
		border-color: #cdb898;
		background: #f2ece4;
		transform: translateY(-1px);
	}
`;

const StyledIcon = styled.img`
	width: 21px;
	height: 21px;
	object-fit: contain;
	filter: ${({ $active }) => ($active ? 'sepia(0.35) saturate(1.5)' : 'none')};
`;

const ItemCount = styled.span`
	position: absolute;
	top: -4px;
	right: -3px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 17px;
	height: 17px;
	border: 2px solid #fff;
	border-radius: 50%;
	background: #b89b72;
	color: #fff;
	font-size: 9px;
	font-weight: 700;
	line-height: 1;
`;

const ControlPanelLinks = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const ControlPanelContainer = ({ className }) => {
	const location = useLocation();
	const isFavouritesPage = location.pathname === '/favourites';
	const [wishlistCount, setWishlistCount] = useState(() =>
		getStoredListCount('wishlist'),
	);
	const [cartCount, setCartCount] = useState(() => getStoredListCount('cart'));

	useEffect(() => {
		const updateCount = ({ detail }) => {
			if (!detail || !Array.isArray(detail.value)) return;

			if (detail.key === 'wishlist') setWishlistCount(detail.value.length);
			if (detail.key === 'cart') setCartCount(detail.value.length);
		};

		window.addEventListener('store-update', updateCount);

		return () => window.removeEventListener('store-update', updateCount);
	}, []);

	return (
		<div className={className}>
			<ControlPanelLinks>
				<FavouritesLink
					to="/favourites"
					$active={isFavouritesPage}
					aria-label="Избранное"
					aria-current={isFavouritesPage ? 'page' : undefined}
				>
					<StyledIcon src={heartIcon} alt="" $active={isFavouritesPage} />
					<ItemCount>{wishlistCount}</ItemCount>
				</FavouritesLink>
				<CartLink
					to="/cart"
					$active={location.pathname === '/cart'}
					aria-label="Корзина"
					aria-current={location.pathname === '/cart' ? 'page' : undefined}
				>
					<StyledIcon src={cartIcon} alt="" />
					<ItemCount>{cartCount}</ItemCount>
				</CartLink>
			</ControlPanelLinks>
		</div>
	);
};

const FavouritesLink = styled(Link)`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	padding: 0;
	border: 1px solid #e9e2d9;
	border-radius: 50%;
	background: ${({ $active }) => ($active ? '#f2e8d8' : '#faf8f5')};
	box-shadow: ${({ $active }) => ($active ? 'inset 0 0 0 1px #cdb898' : 'none')};
	cursor: pointer;
	transition:
		background 160ms ease,
		border-color 160ms ease,
		transform 160ms ease;

	&:hover {
		border-color: #cdb898;
		background: #f2ece4;
		transform: translateY(-1px);
	}
`;

const CartLink = styled(Link)`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	padding: 0;
	border: 1px solid #e9e2d9;
	border-radius: 50%;
	background: ${({ $active }) => ($active ? '#f2e8d8' : '#faf8f5')};
	box-shadow: ${({ $active }) => ($active ? 'inset 0 0 0 1px #cdb898' : 'none')};
	transition:
		background 160ms ease,
		border-color 160ms ease,
		transform 160ms ease;

	&:hover {
		border-color: #cdb898;
		background: #f2ece4;
		transform: translateY(-1px);
	}
`;

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	justify-self: end;
`;
