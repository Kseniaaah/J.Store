import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Footer, Header, ModeratorHeader } from './components';
import { mockProducts } from './data/mock-products';
import { mockBanners } from './data/mock-banners';
import { mockCollections } from './data/mock-collections';
import { mockOrders } from './data/mock-moderator-dashboard';
import {
	Home,
	About,
	Jewelery,
	Product,
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
import { isModeratorAuthenticated, logoutModerator } from './utils/moderator-auth';

const RequireModeratorAuth = ({ children }) => {
	const location = useLocation();

	if (!isModeratorAuthenticated()) {
		return (
			<Navigate
				to={`/moderator/login?from=${encodeURIComponent(location.pathname)}`}
				replace
			/>
		);
	}

	return children;
};

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
	const location = useLocation();
	const isModeratorRoute = location.pathname.startsWith('/moderator');
	const isModeratorLogin = location.pathname === '/moderator/login';

	const [products, setProducts] = useState(mockProducts);
	const [banners, setBanners] = useState(mockBanners);
	const [collections, setCollections] = useState(mockCollections);
	const [orders, setOrders] = useState(mockOrders);

	return (
		<AppColumn>
			{isModeratorRoute ? (
				!isModeratorLogin && <ModeratorHeader onLogout={logoutModerator} />
			) : (
				<Header />
			)}
			<Content>
				<Routes>
					<Route path="/" element={<Home products={products} />} />
					<Route path="/about" element={<About />} />
					<Route path="/jewelery" element={<Jewelery products={products} />} />
					<Route
						path="/products/:id"
						element={
							<Product products={products} collections={collections} />
						}
					/>
					<Route path="/collections" element={<Collections />} />
					<Route
						path="/favourites"
						element={<Favourites products={products} />}
					/>
					<Route path="/cart" element={<Cart products={products} />} />
					<Route
						path="/deliveryAndPayments"
						element={<DeliveryAndPayments />}
					/>
					<Route path="/moderator/login" element={<ModeratorLogin />} />
					<Route
						path="/moderator/dashboard"
						element={
							<RequireModeratorAuth>
								<ModeratorDashboard
									orders={orders}
									products={products}
									collections={collections}
									banners={banners}
								/>
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/products"
						element={
							<RequireModeratorAuth>
								<ModeratorProducts
									products={products}
									setProducts={setProducts}
								/>
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/products/add"
						element={
							<RequireModeratorAuth>
								<ModeratorProductAdd setProducts={setProducts} />
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/products/:id/edit"
						element={
							<RequireModeratorAuth>
								<ModeratorProductEdit
									products={products}
									setProducts={setProducts}
								/>
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/banners"
						element={
							<RequireModeratorAuth>
								<ModeratorBanners banners={banners} />
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/banners/:id/edit"
						element={
							<RequireModeratorAuth>
								<ModeratorBannerEdit
									banners={banners}
									setBanners={setBanners}
									collections={collections}
								/>
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/banners/add"
						element={
							<RequireModeratorAuth>
								<ModeratorBannerAdd
									setBanners={setBanners}
									collections={collections}
								/>
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/collections"
						element={
							<RequireModeratorAuth>
								<ModeratorCollections collections={collections} />
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/collections/:id/edit"
						element={
							<RequireModeratorAuth>
								<ModeratorCollectionEdit
									collections={collections}
									setCollections={setCollections}
								/>
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/collections/add"
						element={
							<RequireModeratorAuth>
								<ModeratorCollectionAdd setCollections={setCollections} />
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/orders"
						element={
							<RequireModeratorAuth>
								<ModeratorOrders orders={orders} />
							</RequireModeratorAuth>
						}
					/>
					<Route
						path="/moderator/orders/:id"
						element={
							<RequireModeratorAuth>
								<ModeratorOrder orders={orders} setOrders={setOrders} />
							</RequireModeratorAuth>
						}
					/>
				</Routes>
			</Content>
			{!isModeratorRoute && <Footer />}
		</AppColumn>
	);
};
