import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { dashboardStats } from '../../../data/mock-moderator-dashboard';

const quickActions = [
	{ label: 'Товары', to: '/moderator/products', detail: 'Каталог' },
	{ label: 'Баннеры', to: '/moderator/banners', detail: 'Главная' },
	{ label: 'Коллекции', to: '/moderator/collections', detail: 'Разделы' },
	{ label: 'Заказы', to: '/moderator/orders', detail: 'Статусы' },
];

const ModeratorDashboardContainer = ({ className, orders }) => (
	<main className={className}>
		<header className="dashboard-header">
			<div>
				<span className="eyebrow">J.Store · moderator</span>
				<h1>Панель управления</h1>
			</div>
			<time dateTime="2026-09-15">15 сентября 2026</time>
		</header>

		<section className="stats" aria-label="Общие показатели">
			{dashboardStats.map((stat) => (
				<article className={`stat-card stat-card--${stat.tone}`} key={stat.label}>
					<span>{stat.label}</span>
					<strong>{stat.value}</strong>
				</article>
			))}
		</section>

		<section className="actions-section" aria-labelledby="quick-actions-title">
			<div className="section-heading">
				<div>
					<span className="eyebrow">Управление</span>
					<h2 id="quick-actions-title">Быстрые действия</h2>
				</div>
			</div>
			<div className="actions-grid">
				{quickActions.map((action) => (
					<Link key={action.to} to={action.to} className="action-card">
						<span className="action-kicker">Раздел</span>
						<strong>{action.label}</strong>
						<small>{action.detail}</small>
					</Link>
				))}
			</div>
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
					<div className="table-row" role="row" key={order.id}>
						<Link to={`/moderator/orders/${order.id.replace('#', '')}`}>
							<strong>{order.id}</strong>
						</Link>
						<span>{order.customer}</span>
						<span className="muted">{order.items}</span>
						<strong>{order.total}</strong>
						<span className={`status status--${order.statusTone}`}>
							{order.status}
						</span>
					</div>
				))}
			</div>
		</section>
	</main>
);

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

	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
		margin: 28px 0 56px;
	}

	.stat-card {
		min-height: 120px;
		padding: 18px 18px 16px;
		border: 1px solid #e0d8cf;
		background: #fff;
	}
	.stat-card span {
		display: block;
		max-width: 150px;
		color: #665d55;
		font-size: 12px;
		line-height: 1.4;
	}
	.stat-card strong {
		display: block;
		margin-top: 18px;
		font-size: 34px;
		font-weight: 500;
		line-height: 1;
	}
	.stat-card--dark {
		background: #f5efe9;
		color: #302c28;
		border-color: #d8cec2;
	}
	.stat-card--dark span {
		color: #665d55;
	}
	.stat-card--warm {
		background: #f3eee8;
	}
	.stat-card--sage {
		background: #f1eee7;
	}
	.stat-card--rose {
		background: #f7f1ee;
	}

	.actions-section {
		margin-bottom: 56px;
	}

	.actions-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
	}

	.action-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 110px;
		padding: 14px 16px;
		text-decoration: none;
		color: #302c28;
		background: #f8f3ee;
		border: 1px solid #d8cec2;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.action-card:hover {
		background: #f1e8df;
		border-color: #cabcae;
		transform: translateY(-1px);
	}

	.action-kicker {
		display: block;
		color: #8a7d70;
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.action-card strong {
		display: block;
		margin-top: 12px;
		font-size: 18px;
		font-weight: 500;
		color: #302c28;
	}

	.action-card small {
		display: block;
		margin-top: 6px;
		color: #665d55;
		font-size: 11px;
		line-height: 1.4;
	}

	.section-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
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
	}
	.table-row a {
		color: #302c28;
		text-decoration: none;
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

	@media (max-width: 800px) {
		width: calc(100% - 40px);
		padding-top: 40px;
		.dashboard-header {
			align-items: start;
			flex-direction: column;
			gap: 18px;
		}
		.stats {
			grid-template-columns: repeat(2, 1fr);
			margin-bottom: 54px;
		}
		.actions-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.orders-table {
			overflow-x: auto;
		}
		.table-row {
			min-width: 700px;
		}
	}

	@media (max-width: 480px) {
		.actions-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		width: calc(100% - 32px);
		.stats {
			gap: 8px;
		}
		.stat-card {
			min-height: 126px;
			padding: 16px;
		}
		.stat-card strong {
			margin-top: 20px;
			font-size: 36px;
		}
	}
`;
