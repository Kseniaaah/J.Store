import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	dashboardDate,
	dashboardDateTime,
	orderStatusLabels,
} from '../../../data/mock-moderator-dashboard';

const formatPrice = (value) => `${value.toLocaleString('ru-RU')} ₽`;
const formatItems = (items) =>
	items
		.map(({ title, quantity }) => (quantity > 1 ? `${title} ×${quantity}` : title))
		.join(' · ');

const ModeratorDashboardContainer = ({
	className,
	orders,
	products,
	collections,
	banners,
}) => {
	const sections = [
		{
			title: 'Новые заказы',
			to: '/moderator/orders',
			value: orders.filter((order) => order.status === 'new').length,
			caption: 'Требуют внимания',
			detail: `Всего заказов: ${orders.length}`,
		},
		{
			title: 'Каталог',
			to: '/moderator/products',
			value: products.length,
			caption: 'Позиций в каталоге',
			detail: `Бестселлеров: ${products.filter((product) => product.bestseller).length}`,
		},
		{
			title: 'Подборки',
			to: '/moderator/collections',
			value: collections.length,
			caption: 'Коллекции украшений',
			detail: `Опубликовано: ${collections.filter((collection) => collection.status === 'published').length}`,
		},
		{
			title: 'Промо',
			to: '/moderator/banners',
			value: banners.length,
			caption: 'Баннеры на главной',
			detail: `Опубликовано: ${banners.filter((banner) => banner.status === 'published').length}`,
		},
	];

	return (
		<main className={className}>
			<header className="dashboard-header">
				<div>
					<span className="eyebrow">your jeweler · moderator</span>
					<h1>Панель управления</h1>
				</div>
				<time dateTime={dashboardDateTime}>{dashboardDate}</time>
			</header>

			<section
				className="overview-grid"
				aria-label="Показатели и управление разделами"
			>
				{sections.map((section) => (
					<Link key={section.to} to={section.to} className="overview-card">
						<span className="card-arrow" aria-hidden="true">
							↗
						</span>
						<div className="card-summary">
							<strong className="card-value">
								{section.value.toLocaleString('ru-RU')}
							</strong>
							<div className="card-heading">
								<h2>{section.title}</h2>
								<span>{section.caption}</span>
							</div>
						</div>
						<span className="card-detail">{section.detail}</span>
					</Link>
				))}
			</section>

			<section className="orders-section" aria-labelledby="latest-orders-title">
				<div className="section-heading">
					<div>
						<span className="eyebrow">Обзор</span>
						<h2 id="latest-orders-title">Последние заказы</h2>
					</div>
					<Link to="/moderator/orders">
						Все заказы <span aria-hidden="true">→</span>
					</Link>
				</div>
				<div className="orders-table" role="table" aria-label="Последние заказы">
					<div className="table-row table-head" role="row">
						<span>Заказ</span>
						<span>Клиент</span>
						<span>Состав</span>
						<span>Сумма</span>
						<span>Статус</span>
					</div>
					{orders.map((order) => (
						<Link
							key={order.id}
							to={`/moderator/orders/${order.id}`}
							className="table-row order-row"
							role="row"
						>
							<strong>#{order.id}</strong>
							<span>{order.customer}</span>
							<span className="muted">{formatItems(order.items)}</span>
							<strong>{formatPrice(order.total)}</strong>
							<span className={`status status--${order.status}`}>
								{orderStatusLabels[order.status]}
							</span>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
};

export const ModeratorDashboard = styled(ModeratorDashboardContainer)`
	width: min(100% - 80px, 1440px);
	margin: 0 auto;
	padding: 58px 0 88px;
	color: #302c28;

	.dashboard-header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		padding-bottom: 34px;
		border-bottom: 1px solid #d8cec2;
	}

	.eyebrow {
		display: block;
		margin-bottom: 10px;
		color: #8a7d70;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	h1,
	h2 {
		margin: 0;
		font-weight: 500;
	}
	h1 {
		font-family: 'Marck Script', cursive;
		font-size: clamp(44px, 5vw, 68px);
		line-height: 1;
	}
	.dashboard-header time {
		color: #8a7d70;
		font-size: 13px;
	}

	.overview-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 16px;
		margin: 28px 0 48px;
	}

	.overview-card {
		position: relative;
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: 22px;
		text-decoration: none;
		color: #302c28;
		background: #f2ece2;
		border: 1px solid #e5dccc;
		border-radius: 12px;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.overview-card:hover {
		background: #ece3d5;
		border-color: #cdb898;
		transform: translateY(-2px);
	}

	.overview-card:focus-visible {
		outline: 2px solid #9c8264;
		outline-offset: 4px;
	}

	.card-summary {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		flex: 1;
		align-items: center;
		gap: 18px;
		margin: 24px 0 20px;
	}

	.card-value {
		color: #8b7055;
		font-size: 52px;
		font-weight: 400;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.05em;
		line-height: 1;
	}

	.card-heading h2 {
		margin-bottom: 6px;
		font-size: 17px;
	}

	.card-heading > span {
		display: block;
		color: #81776e;
		font-size: 12px;
		line-height: 1.5;
	}

	.card-arrow {
		position: absolute;
		top: 14px;
		right: 14px;
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: #faf7f1;
		color: #8b7055;
		font-size: 16px;
	}

	.card-detail {
		align-self: flex-start;
		padding: 6px 10px;
		border-radius: 5px;
		background: #faf7f1;
		color: #766b5e;
		font-size: 11px;
	}

	.section-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 16px;
		margin-bottom: 22px;
	}
	.section-heading .eyebrow {
		margin-bottom: 6px;
	}
	h2 {
		font-size: 26px;
	}
	.section-heading button,
	.section-heading a {
		border: 0;
		padding: 0 0 3px;
		color: #665d55;
		background: transparent;
		font: inherit;
		cursor: pointer;
		text-decoration: none;
	}
	.section-heading button span,
	.section-heading a span {
		margin-left: 8px;
		font-size: 18px;
	}
	.orders-table {
		border-top: 1px solid #302c28;
	}
	.table-row {
		display: grid;
		grid-template-columns: 0.7fr 1.2fr 2fr 1fr 0.9fr;
		gap: 20px;
		align-items: center;
		min-height: 67px;
		border-bottom: 1px solid #d8cec2;
		font-size: 13px;
		color: #302c28;
		text-decoration: none;
	}
	.order-row {
		transition: background-color 0.2s ease;
	}
	.order-row:hover {
		background: #faf7f1;
	}
	.order-row:focus-visible {
		outline: 2px solid #9c8264;
		outline-offset: -2px;
	}
	.table-head {
		min-height: 42px;
		color: #8a7d70;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.muted {
		color: #81776e;
	}
	.status {
		justify-self: start;
		padding: 6px 10px;
		font-size: 11px;
	}
	.status--new {
		background: #f0e7df;
		color: #594b3f;
	}
	.status--progress {
		background: #f4efe8;
		color: #6f5b48;
	}
	.status--done {
		background: #eeeae4;
		color: #7a6f68;
	}

	@media (max-width: 1100px) {
		.overview-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 800px) {
		width: calc(100% - 40px);
		padding-top: 40px;
		.dashboard-header {
			align-items: start;
			flex-direction: column;
			gap: 18px;
		}
		.overview-grid {
			margin-bottom: 36px;
		}
		.orders-table {
			overflow-x: auto;
		}
		.table-row {
			min-width: 700px;
		}
	}

	@media (max-width: 480px) {
		width: calc(100% - 32px);
		.overview-grid {
			grid-template-columns: 1fr;
			gap: 12px;
		}
		.overview-card {
			padding: 18px 20px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.overview-card {
			transition: none;
		}
		.overview-card:hover {
			transform: none;
		}
	}
`;
