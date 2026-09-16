import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const statusOptions = [
	{ value: 'new', label: 'Новая' },
	{ value: 'progress', label: 'В работе' },
	{ value: 'done', label: 'Завершён' },
];

const ModeratorOrderContainer = ({ className, orders, setOrders }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const order = orders.find((item) => item.id === `#${id}`);

	if (!order) return <main className={className}>Заказ не найден.</main>;

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const statusTone = formData.get('status');
		const status =
			statusOptions.find((option) => option.value === statusTone)?.label ||
			order.status;
		setOrders((currentOrders) =>
			currentOrders.map((currentOrder) =>
				currentOrder.id === order.id
					? {
							...currentOrder,
							statusTone,
							status,
							comment: formData.get('comment')?.toString().trim(),
							internalComment: formData
								.get('internalComment')
								?.toString()
								.trim(),
						}
					: currentOrder,
			),
		);
		navigate('/moderator/orders');
	};

	return (
		<main className={className}>
			<div className="page-shell">
				<header className="page-header">
					<div>
						<span className="eyebrow">J.Store · moderator</span>
						<h1>Заказ {order.id}</h1>
						<p>{order.date}</p>
					</div>
					<span className={`status status--${order.statusTone}`}>
						<span />
						{order.status}
					</span>
				</header>
				<div className="order-layout">
					<section className="summary-panel">
						<div className="section-heading">
							<span className="section-kicker">Сводка заказа</span>
							<span className="summary-total">{order.total}</span>
						</div>
						<div className="summary-list">
							<div>
								<span>Клиент</span>
								<strong>{order.customer}</strong>
							</div>
							<div>
								<span>Телефон</span>
								<strong>{order.phone}</strong>
							</div>
							<div>
								<span>Доставка</span>
								<strong>{order.address}</strong>
							</div>
						</div>
						<div className="items-block">
							<span className="section-kicker">Состав</span>
							<div className="order-item">
								<span>{order.items}</span>
								<strong>{order.total}</strong>
							</div>
						</div>
					</section>
					<form className="order-form" onSubmit={handleSubmit}>
						<div className="form-heading">
							<span className="section-kicker">Обработка</span>
							<span className="required-note">
								Изменения сохраняются локально
							</span>
						</div>
						<label>
							<span>Статус заказа</span>
							<select name="status" defaultValue={order.statusTone}>
								{statusOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</label>
						<label>
							<span>Комментарий клиента</span>
							<textarea
								name="comment"
								rows="4"
								defaultValue={order.comment}
								placeholder="Комментарий к заказу пока не добавлен"
							/>
						</label>
						<label>
							<span>Внутренний комментарий</span>
							<textarea
								name="internalComment"
								rows="4"
								defaultValue={order.internalComment}
								placeholder="Заметка для команды магазина"
							/>
						</label>
						<div className="actions">
							<button
								type="button"
								className="cancel-button"
								onClick={() => navigate('/moderator/orders')}
							>
								Назад к заказам
							</button>
							<button type="submit" className="submit-button">
								Сохранить изменения
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export const ModeratorOrder = styled(ModeratorOrderContainer)`
	width: min(100% - 80px, 1200px);
	margin: 0 auto;
	padding: 58px 0 88px;
	color: #302c28;

	.page-shell {
		padding: 30px;
		background: #fff;
		border: 1px solid #e0d8cf;
	}
	.page-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
		padding-bottom: 24px;
		border-bottom: 1px solid #d8cec2;
	}
	.eyebrow,
	.section-kicker {
		display: block;
		color: #8a7d70;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	.eyebrow {
		margin-bottom: 8px;
	}
	h1 {
		margin: 0;
		font-size: clamp(40px, 4vw, 60px);
		font-weight: 500;
		font-family: 'Marck Script', cursive;
	}
	.page-header p {
		margin: 10px 0 0;
		color: #81756b;
		font-size: 14px;
	}
	.status {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 10px;
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
	.order-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
		gap: 34px;
		padding-top: 30px;
	}
	.section-heading,
	.form-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding-bottom: 14px;
		border-bottom: 1px solid #e6ded5;
	}
	.summary-total {
		font-size: 20px;
		font-weight: 600;
	}
	.summary-list {
		display: grid;
		gap: 0;
		margin-top: 6px;
	}
	.summary-list div {
		display: grid;
		grid-template-columns: 110px 1fr;
		gap: 16px;
		padding: 16px 0;
		border-bottom: 1px solid #eee8e1;
		font-size: 13px;
	}
	.summary-list span {
		color: #9b8e83;
	}
	.summary-list strong {
		font-weight: 500;
	}
	.items-block {
		margin-top: 28px;
	}
	.order-item {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		margin-top: 14px;
		padding: 16px;
		background: #faf6f1;
		color: #665d55;
		font-size: 13px;
	}
	.order-item strong {
		color: #302c28;
		font-weight: 600;
		white-space: nowrap;
	}
	.order-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.required-note {
		color: #9b8e83;
		font-size: 11px;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: #665d55;
		font-size: 13px;
	}
	select,
	textarea {
		width: 100%;
		padding: 11px 13px;
		border: 1px solid #d8cec2;
		background: #faf6f1;
		color: #302c28;
		font: inherit;
		outline: none;
		box-sizing: border-box;
	}
	textarea {
		min-height: 100px;
		resize: vertical;
	}
	select:focus,
	textarea:focus {
		border-color: #bcae9d;
		box-shadow: 0 0 0 3px rgba(188, 174, 157, 0.12);
	}
	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		padding-top: 8px;
	}
	.cancel-button,
	.submit-button {
		min-height: 42px;
		padding: 0 16px;
		border: 1px solid #d8cec2;
		font: inherit;
		cursor: pointer;
	}
	.cancel-button {
		background: #f4efe8;
		color: #302c28;
	}
	.submit-button {
		border-color: #302c28;
		background: #302c28;
		color: #fff;
	}
	@media (max-width: 820px) {
		width: calc(100% - 40px);
		padding-top: 40px;
		.page-shell {
			padding: 22px;
		}
		.order-layout {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 520px) {
		.page-header {
			align-items: flex-start;
			flex-direction: column;
		}
		.actions {
			flex-direction: column-reverse;
		}
		.cancel-button,
		.submit-button {
			width: 100%;
		}
	}
`;
