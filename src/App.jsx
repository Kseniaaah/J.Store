import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';
import { Home, About, Jewelery, Collections, DeliveryAndPayments } from './pages';
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
	width: min(100%, 1120px);
	margin: 64px auto 0;
	padding-top: 48px;
	flex-grow: 1;

	${({ $isHome }) =>
		$isHome &&
		`
		width: 100%;
		margin-top: 0;
		padding-top: 0;
	`}
`;

export const App = () => {
	const location = useLocation();

	/*function RequireAuth({ children }) {
		const isAuthenticated = useSelector(selectIsAuthenticated);

		if (!isAuthenticated) {
			return <Navigate to="/" replace />;
		}

		return children;
	}*/

	return (
		<AppColumn>
			<Header />
			<Content $isHome={location.pathname === '/'}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/jewelery" element={<Jewelery />} />
					<Route path="/collections" element={<Collections />} />
					<Route
						path="/deliveryAndPayments"
						element={<DeliveryAndPayments />}
					/>
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
