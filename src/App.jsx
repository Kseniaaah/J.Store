import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer, Header } from './components';
import { mockProducts } from './data/mock-products';
import { mockBanners } from './data/mock-banners';
import { mockCollections } from './data/mock-collections';
import { latestOrders } from './data/mock-moderator-dashboard';
import {
	Home,
	About,
	Jewelery,
	Collections,
	DeliveryAndPayments,
	Favourites,
	Cart,
	ModeratorLogin,
	ModeratorDashboard,
	ModeratorProducts,
	ModeratorProductAdd,
	ModeratorProductEdit,
	ModeratorBanners,
	ModeratorBannerEdit,
	ModeratorBannerAdd,
	ModeratorCollections,
	ModeratorCollectionEdit,
	ModeratorCollectionAdd,
	ModeratorOrders,
	ModeratorOrder,
} from './pages';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
	background-color: #f9f6ef;
`;

const Content = styled.div`
	width: 100%;
	margin: 0;
	padding: 0;
	flex-grow: 1;
`;

export const App = () => {
	/*function RequireAuth({ children }) {
		const isAuthenticated = useSelector(selectIsAuthenticated);

		if (!isAuthenticated) {
			return <Navigate to="/" replace />;
		}

		return children;
	}*/

	const [products, setProducts] = useState(mockProducts);
	const [banners, setBanners] = useState(() =>
		mockBanners.map((banner) => ({ ...banner, status: 'published' })),
	);
	const [collections, setCollections] = useState(() =>
		mockCollections.map((collection) => ({ ...collection, status: 'published' })),
	);
	const [orders, setOrders] = useState(() =>
		latestOrders.map((order) => ({
			...order,
			date: '15 сентября 2026, 12:40',
			phone: '+7 (900) 123-45-67',
			address: 'Москва, ул. Петровка, 18',
			comment: '',
			internalComment: '',
		})),
	);

	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/jewelery" element={<Jewelery />} />
					<Route path="/collections" element={<Collections />} />
					<Route path="/favourites" element={<Favourites />} />
					<Route path="/cart" element={<Cart />} />
					<Route
						path="/deliveryAndPayments"
						element={<DeliveryAndPayments />}
					/>
					<Route path="/moderator/login" element={<ModeratorLogin />} />
					<Route
						path="/moderator/dashboard"
						element={<ModeratorDashboard orders={orders} />}
					/>
					<Route
						path="/moderator/products"
						element={
							<ModeratorProducts
								products={products}
								setProducts={setProducts}
							/>
						}
					/>
					<Route
						path="/moderator/products/add"
						element={<ModeratorProductAdd setProducts={setProducts} />}
					/>
					<Route
						path="/moderator/products/:id/edit"
						element={
							<ModeratorProductEdit
								products={products}
								setProducts={setProducts}
							/>
						}
					/>
					<Route
						path="/moderator/banners"
						element={<ModeratorBanners banners={banners} />}
					/>
					<Route
						path="/moderator/banners/:id/edit"
						element={
							<ModeratorBannerEdit
								banners={banners}
								setBanners={setBanners}
							/>
						}
					/>
					<Route
						path="/moderator/banners/add"
						element={<ModeratorBannerAdd setBanners={setBanners} />}
					/>
					<Route
						path="/moderator/collections"
						element={<ModeratorCollections collections={collections} />}
					/>
					<Route
						path="/moderator/collections/:id/edit"
						element={
							<ModeratorCollectionEdit
								collections={collections}
								setCollections={setCollections}
							/>
						}
					/>
					<Route
						path="/moderator/collections/add"
						element={
							<ModeratorCollectionAdd setCollections={setCollections} />
						}
					/>
					<Route
						path="/moderator/orders"
						element={<ModeratorOrders orders={orders} />}
					/>
					<Route
						path="/moderator/orders/:id"
						element={<ModeratorOrder orders={orders} setOrders={setOrders} />}
					/>
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
