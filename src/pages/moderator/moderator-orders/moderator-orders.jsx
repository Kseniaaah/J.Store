import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const filters = [
	{ key: 'all', label: 'Все заказы' },
	{ key: 'new', label: 'Новые' },
	{ key: 'progress', label: 'В работе' },
	{ key: 'done', label: 'Завершённые' },
];

const ModeratorOrdersContainer = ({ className, orders }) => {
	const [activeFilter, setActiveFilter] = useState('all');
	const visibleOrders =
		activeFilter === 'all'
			? orders
			: orders.filter((order) => order.statusTone === activeFilter);

	return (
		<main className={className}>
			<header className="page-header">
				<div>
					<span className="eyebrow">J.Store · moderator</span>
					<h1>Заказы</h1>
					<p>
						Проверяйте новые заявки, состав заказов и текущий статус доставки.
					</p>
				</div>
				<div className="header-meta">
					<strong>{orders.length}</strong>
					<span>заказа в обзоре</span>
				</div>
			</header>

			<section className="toolbar" aria-label="Фильтры заказов">
				<div className="tabs">
					{filters.map((filter) => (
						<button
							key={filter.key}
							type="button"
							className={`tab${activeFilter === filter.key ? ' tab--active' : ''}`}
							onClick={() => setActiveFilter(filter.key)}
						>
							{filter.label}{' '}
							<span>
								{filter.key === 'all'
									? orders.length
									: orders.filter(
											(order) => order.statusTone === filter.key,
										).length}
							</span>
						</button>
					))}
				</div>
				<span className="updated-label">Обновлено сегодня, 12:40</span>
			</section>

			<section className="orders-table" role="table" aria-label="Список заказов">
				<div className="table-row table-head" role="row">
					<span>Заказ</span>
					<span>Клиент</span>
					<span>Состав</span>
					<span>Сумма</span>
					<span>Статус</span>
				</div>
				{visibleOrders.map((order) => (
					<article className="table-row" role="row" key={order.id}>
						<Link
							to={`/moderator/orders/${order.id.replace('#', '')}`}
							className="order-id"
						>
							{order.id}
						</Link>
						<span>{order.customer}</span>
						<span className="muted">{order.items}</span>
						<strong>{order.total}</strong>
						<span className={`status status--${order.statusTone}`}>
							<span />
							{order.status}
						</span>
					</article>
				))}
			</section>

			{visibleOrders.length === 0 && (
				<div className="empty-state">В этом статусе пока нет заказов.</div>
			)}
		</main>
	);
};

export const ModeratorOrders = styled(ModeratorOrdersContainer)`
	width: min(100% - 80px, 1200px);
	margin: 0 auto;
	padding: 58px 0 88px;
	color: #302c28;

	.page-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
		padding-bottom: 24px;
		border-bottom: 1px solid #d8cec2;
	}
	.eyebrow {
		display: block;
		margin-bottom: 12px;
		color: #8a7d70;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	h1 {
		margin: 0;
		font-size: clamp(38px, 4vw, 56px);
		font-weight: 500;
		font-family: 'Marck Script', cursive;
	}
	.page-header p {
		max-width: 520px;
		margin: 12px 0 0;
		color: #81756b;
		font-size: 14px;
		line-height: 1.6;
	}
	.header-meta {
		display: grid;
		gap: 3px;
		min-width: 120px;
		padding-left: 18px;
		border-left: 1px solid #d8cec2;
		color: #8a7d70;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.header-meta strong {
		color: #302c28;
		font-size: 28px;
		font-weight: 500;
		letter-spacing: 0;
		line-height: 1;
	}
	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin: 30px 0 20px;
	}
	.tabs {
		display: flex;
		gap: 22px;
		overflow-x: auto;
	}
	.tab {
		padding: 0 0 10px;
		border: 0;
		border-bottom: 1px solid transparent;
		background: transparent;
		color: #988b80;
		font: inherit;
		font-size: 12px;
		white-space: nowrap;
		cursor: pointer;
	}
	.tab span {
		margin-left: 5px;
		color: #b2a59a;
		font-size: 10px;
	}
	.tab--active {
		border-color: #302c28;
		color: #302c28;
	}
	.updated-label {
		color: #9b8e83;
		font-size: 11px;
	}
	.orders-table {
		border-top: 1px solid #302c28;
	}
	.table-row {
		display: grid;
		grid-template-columns: 0.7fr 1.25fr 2fr 1fr 1fr;
		gap: 18px;
		align-items: center;
		min-height: 74px;
		border-bottom: 1px solid #d8cec2;
		font-size: 13px;
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
	.order-id {
		font-size: 14px;
		font-weight: 600;
	}
	.status {
		justify-self: start;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 9px;
		font-size: 11px;
		white-space: nowrap;
	}
	.status span {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
	}
	.status--new {
		background: #f0e7df;
		color: #8a6349;
	}
	.status--progress {
		background: #f4efe8;
		color: #80694f;
	}
	.status--done {
		background: #eeeae4;
		color: #7a6f68;
	}
	.empty-state {
		margin-top: 24px;
		padding: 32px;
		border: 1px solid #e0d8cf;
		background: #fff;
		color: #81756b;
		text-align: center;
		font-size: 14px;
	}

	@media (max-width: 800px) {
		width: calc(100% - 40px);
		padding-top: 40px;
		.page-header,
		.toolbar {
			align-items: flex-start;
			flex-direction: column;
		}
		.header-meta {
			padding: 0;
			border: 0;
		}
		.orders-table {
			overflow-x: auto;
		}
		.table-row {
			min-width: 720px;
		}
	}

	@media (max-width: 480px) {
		width: calc(100% - 32px);
	}
`;
