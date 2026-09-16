import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModeratorProductAddContainer = ({ className, setProducts }) => {
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const title = formData.get('title')?.toString().trim();
		const price = Number(formData.get('price')) || 0;
		const category = formData.get('category')?.toString() || 'rings';
		const description =
			formData.get('description')?.toString().trim() || 'Описание товара';
		const imageUrl = formData.get('imageUrl')?.toString().trim();

		const newProduct = {
			id: Date.now(),
			title,
			price,
			category,
			collectionId: null,
			bestseller: false,
			description,
			images: [imageUrl],
		};

		setProducts((prev) => [newProduct, ...prev]);
		navigate('/moderator/products');
	};

	return (
		<main className={className}>
			<div className="page-shell">
				<header className="page-header">
					<div>
						<span className="eyebrow">J.Store · moderator</span>
						<h1>Добавить товар</h1>
					</div>
				</header>

				<form className="product-form" onSubmit={handleSubmit}>
					<div className="field-row">
						<label>
							<span>Название</span>
							<input
								name="title"
								type="text"
								placeholder="Например: Кольцо Aura"
								required
							/>
						</label>
						<label>
							<span>Цена</span>
							<input
								name="price"
								type="number"
								placeholder="18000"
								required
							/>
						</label>
					</div>

					<div className="field-row">
						<label>
							<span>Категория</span>
							<select name="category" defaultValue="rings">
								<option value="rings">Кольца</option>
								<option value="bracelets">Браслеты</option>
								<option value="necklaces">Ожерелья</option>
								<option value="earrings">Серьги</option>
								<option value="wedding">Свадебные украшения</option>
							</select>
						</label>
						<label>
							<span>Статус</span>
							<select name="status" defaultValue="regular">
								<option value="regular">Обычный</option>
								<option value="featured">Лучший</option>
								<option value="out">Нет в наличии</option>
							</select>
						</label>
					</div>

					<label>
						<span>Ссылка на изображение</span>
						<input
							name="imageUrl"
							type="url"
							placeholder="https://example.com/image.jpg"
							required
						/>
					</label>

					<label>
						<span>Описание</span>
						<textarea
							name="description"
							rows="5"
							placeholder="Краткое описание товара"
						/>
					</label>

					<div className="actions">
						<button type="button" className="cancel-button">
							Отмена
						</button>
						<button type="submit" className="submit-button">
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export const ModeratorProductAdd = styled(ModeratorProductAddContainer)`
	width: min(100% - 80px, 1200px);
	margin: 0 auto;
	padding: 58px 0 88px;
	color: #302c28;

	.page-shell {
		max-width: 860px;
		margin: 0 auto;
		padding: 24px;
		background: #fff;
		border: 1px solid #e0d8cf;
	}

	.page-header {
		padding-bottom: 20px;
		border-bottom: 1px solid #d8cec2;
	}

	.eyebrow {
		display: block;
		margin-bottom: 8px;
		color: #8a7d70;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: clamp(40px, 4vw, 60px);
		font-weight: 500;
		font-family: 'Marck Script', cursive;
	}

	.product-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding-top: 24px;
	}

	.field-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: #665d55;
		font-size: 13px;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 12px 14px;
		border: 1px solid #d8cec2;
		background: #faf6f1;
		color: #302c28;
		font: inherit;
		box-sizing: border-box;
		outline: none;
	}

	input:focus,
	select:focus,
	textarea:focus {
		border-color: #bcae9d;
		box-shadow: 0 0 0 3px rgba(188, 174, 157, 0.12);
	}

	textarea {
		resize: vertical;
		min-height: 110px;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		padding-top: 8px;
	}

	.cancel-button,
	.submit-button {
		height: 42px;
		padding: 0 18px;
		border: none;
		font: inherit;
		cursor: pointer;
	}

	.cancel-button {
		background: #f4efe8;
		color: #302c28;
		border: 1px solid #d8cec2;
	}

	.submit-button {
		background: #302c28;
		color: #fff;
	}

	@media (max-width: 720px) {
		width: calc(100% - 40px);
		padding-top: 40px;

		.page-shell {
			padding: 18px;
		}

		.field-row {
			grid-template-columns: 1fr;
		}
	}
`;
