import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

const navigation = [
	{ label: 'Обзор', to: '/moderator/dashboard', end: true },
	{ label: 'Заказы', to: '/moderator/orders' },
	{ label: 'Товары', to: '/moderator/products' },
	{ label: 'Коллекции', to: '/moderator/collections' },
	{ label: 'Баннеры', to: '/moderator/banners' },
];

const ModeratorHeaderContainer = ({ className, onLogout }) => (
	<header className={className}>
		<Link
			className="brand"
			to="/moderator/dashboard"
			aria-label="your jeweler, обзор"
		>
			<span className="brand-mark">J</span>
			<span>
				<strong>your jeweler</strong>
				<small>Управление магазином</small>
			</span>
		</Link>

		<nav aria-label="Навигация панели управления">
			{navigation.map(({ label, to, end }) => (
				<NavLink key={to} to={to} end={end}>
					{label}
				</NavLink>
			))}
		</nav>

		<div className="header-actions">
			<Link className="store-link" to="/">
				В магазин <span aria-hidden="true">↗</span>
			</Link>
			<button
				type="button"
				className="logout-button"
				onClick={() => {
					onLogout();
					window.location.assign('/moderator/login');
				}}
			>
				Выйти
			</button>
		</div>
	</header>
);

export const ModeratorHeader = styled(ModeratorHeaderContainer)`
	display: grid;
	grid-template-columns: auto minmax(0, 1fr) auto;
	align-items: center;
	gap: 32px;
	width: 100%;
	min-height: 72px;
	padding: 0 40px;
	border-bottom: 1px solid #e1ddd7;
	background: #fff;
	color: #302c28;

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: inherit;
		text-decoration: none;
	}

	.brand-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border: 1px solid #c9bdae;
		border-radius: 50%;
		color: #75695f;
		font-family: Georgia, serif;
		font-size: 18px;
	}

	.brand strong,
	.brand small {
		display: block;
	}

	.brand strong {
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 0.02em;
	}

	.brand small {
		margin-top: 2px;
		color: #8a8179;
		font-size: 10px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	nav {
		display: flex;
		justify-content: center;
		gap: 4px;
	}

	nav a,
	.store-link {
		padding: 8px 10px;
		color: #756d65;
		font-size: 13px;
		text-decoration: none;
		transition:
			color 160ms ease,
			background 160ms ease;
	}

	nav a:hover,
	nav a.active {
		background: #f5f2ee;
		color: #302c28;
	}

	.store-link {
		border-left: 1px solid #e1ddd7;
		padding-left: 20px;
		white-space: nowrap;
	}

	.store-link:hover {
		color: #302c28;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logout-button {
		padding: 8px 0;
		border: 0;
		background: transparent;
		color: #756d65;
		font: inherit;
		font-size: 13px;
		cursor: pointer;
	}

	.logout-button:hover {
		color: #302c28;
	}

	@media (max-width: 960px) {
		grid-template-columns: auto auto;
		gap: 16px;
		padding: 12px 20px;

		nav {
			grid-column: 1 / -1;
			grid-row: 2;
			justify-content: flex-start;
			overflow-x: auto;
			padding-bottom: 2px;
		}
	}

	@media (max-width: 520px) {
		.brand small {
			display: none;
		}

		nav a,
		.store-link {
			font-size: 12px;
		}

		.store-link {
			padding-left: 12px;
		}
	}
`;
