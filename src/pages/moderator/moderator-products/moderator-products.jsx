import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;
const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`;

const ModeratorProductsContainer = ({ className, products, setProducts }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const currentProducts = useMemo(
		() => products.slice(startIndex, startIndex + ITEMS_PER_PAGE),
		[products, startIndex],
	);

	const handlePrev = () => setCurrentPage((page) => Math.max(1, page - 1));
	const handleNext = () => setCurrentPage((page) => Math.min(totalPages, page + 1));
	const handleDelete = (productId) => {
		setProducts((currentProducts) =>
			currentProducts.filter(({ id }) => id !== productId),
		);
	};

	useEffect(() => {
		setCurrentPage((page) => Math.min(page, totalPages));
	}, [totalPages]);

	return (
		<main className={className}>
			<header className="page-header">
				<div>
					<span className="eyebrow">your jeweler · moderator</span>
					<h1>Товары</h1>
				</div>
				<Link to="/moderator/products/add" className="primary-button">
					Добавить новый
				</Link>
			</header>

			<section className="table-panel" aria-label="Список товаров">
				<div className="table-row table-head" role="row">
					<span>Товар</span>
					<span>Цена</span>
					<span>Статус</span>
					<span>Действия</span>
				</div>

				{currentProducts.map((product) => (
					<div className="table-row" role="row" key={product.id}>
						<div className="product-cell">
							<img src={product.images[0]} alt={product.title} />
							<div>
								<strong>{product.title}</strong>
								<span>{product.category}</span>
							</div>
						</div>

						<span className="price-cell">{formatPrice(product.price)}</span>

						<span
							className={`status ${product.stock === 0 ? 'status--out' : product.bestseller ? 'status--featured' : 'status--regular'}`}
						>
							{product.stock === 0
								? 'Нет в наличии'
								: product.bestseller
									? 'Лучший'
									: 'Обычный'}
						</span>

						<div className="actions-cell">
							<Link
								to={`/moderator/products/${product.id}/edit`}
								className="edit-button"
							>
								Редактировать
							</Link>
							<button
								type="button"
								className="delete-button"
								onClick={() => handleDelete(product.id)}
							>
								Удалить
							</button>
						</div>
					</div>
				))}
			</section>

			<div className="pagination" aria-label="Пагинация товаров">
				<button type="button" onClick={handlePrev} disabled={currentPage === 1}>
					Назад
				</button>
				<span>
					{currentPage} / {totalPages}
				</span>
				<button
					type="button"
					onClick={handleNext}
					disabled={currentPage === totalPages}
				>
					Вперёд
				</button>
			</div>
		</main>
	);
};

export const ModeratorProducts = styled(ModeratorProductsContainer)`
	width: min(100% - 80px, 1200px);
	margin: 0 auto;
	padding: 58px 0 88px;
	color: #302c28;

	.page-header {
		display: flex;
		align-items: end;
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

	.primary-button,
	.edit-button,
	.delete-button {
		border: none;
		cursor: pointer;
		font: inherit;
	}

	.primary-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 42px;
		padding: 0 18px;
		background: #302c28;
		color: #fff;
		font-size: 14px;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
	}

	.primary-button:hover {
		transform: translateY(-1px);
		opacity: 0.96;
	}

	.table-panel {
		margin-top: 24px;
		border: 1px solid #e0d8cf;
		background: #fff;
	}

	.table-row {
		display: grid;
		grid-template-columns: 2.2fr 0.8fr 0.8fr 1.3fr;
		align-items: center;
		gap: 18px;
		padding: 16px 18px;
		border-bottom: 1px solid #e8dfd4;
	}

	.table-row:last-child {
		border-bottom: none;
	}

	.table-head {
		color: #8a7d70;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		background: #faf6f2;
	}

	.product-cell {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.product-cell img {
		display: block;
		width: 56px;
		height: 56px;
		object-fit: cover;
		border-radius: 6px;
		background: #f2ece5;
	}

	.product-cell div {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.product-cell strong {
		display: block;
		font-size: 15px;
		font-weight: 500;
	}

	.product-cell span {
		color: #81776e;
		font-size: 11px;
		text-transform: capitalize;
	}

	.price-cell {
		font-size: 15px;
		font-weight: 500;
	}

	.status {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		padding: 7px 10px;
		font-size: 11px;
	}

	.status--featured {
		background: #f0e7df;
		color: #594b3f;
	}

	.status--regular {
		background: #f3eee8;
		color: #6f5b48;
	}

	.actions-cell {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.edit-button,
	.delete-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 34px;
		padding: 0 12px;
		font-size: 12px;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease,
			background 0.2s ease;
	}

	.edit-button {
		background: #f5efe9;
		color: #302c28;
		border: 1px solid #d8cec2;
	}

	.delete-button {
		background: #f9f1ef;
		color: #5f423c;
		border: 1px solid #e0c7c0;
	}

	.edit-button:hover,
	.delete-button:hover {
		transform: translateY(-1px);
		opacity: 0.95;
	}

	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 18px;
		margin-top: 24px;
		padding-top: 12px;
		border-top: 1px solid #e8dfd4;
	}

	.pagination button {
		height: 38px;
		padding: 0 14px;
		border: 1px solid #d8cec2;
		background: #f7f2ee;
		color: #302c28;
		font: inherit;
		cursor: pointer;
	}

	.pagination button:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.pagination span {
		color: #665d55;
		font-size: 13px;
	}

	@media (max-width: 900px) {
		width: calc(100% - 40px);
		padding-top: 40px;

		.table-row {
			grid-template-columns: 1.8fr 0.7fr 0.7fr;
		}

		.table-head :last-child,
		.actions-cell {
			display: none;
		}
	}

	@media (max-width: 620px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.table-row {
			grid-template-columns: 1fr;
			padding: 16px;
		}

		.product-cell {
			align-items: flex-start;
		}

		.table-head {
			display: none;
		}
	}
`;
