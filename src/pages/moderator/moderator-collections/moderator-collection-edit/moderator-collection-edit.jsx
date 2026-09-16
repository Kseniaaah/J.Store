import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ModeratorCollectionEditContainer = ({
	className,
	collections,
	setCollections,
	isAdding = false,
}) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const collection = isAdding
		? { title: '', description: '', cover: '', status: 'draft' }
		: collections.find((item) => item.id === Number(id));

	if (!collection) return <main className={className}>Коллекция не найдена.</main>;

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const title = formData.get('title')?.toString().trim() || 'Новая коллекция';
		const description =
			formData.get('description')?.toString().trim() || 'Описание коллекции';
		const cover = formData.get('cover')?.toString().trim();
		const status = formData.get('status')?.toString() || 'draft';
		const nextCollection = { title, description, cover, status, images: [cover] };

		if (isAdding) {
			setCollections((currentCollections) => [
				{ ...nextCollection, id: Date.now() },
				...currentCollections,
			]);
		} else {
			setCollections((currentCollections) =>
				currentCollections.map((currentCollection) =>
					currentCollection.id === collection.id
						? { ...currentCollection, ...nextCollection }
						: currentCollection,
				),
			);
		}

		navigate('/moderator/collections');
	};

	return (
		<main className={className}>
			<div className="page-shell">
				<header className="page-header">
					<div>
						<span className="eyebrow">J.Store · moderator</span>
						<h1>
							{isAdding ? 'Добавить коллекцию' : 'Редактировать коллекцию'}
						</h1>
						<p>
							{isAdding
								? 'Создайте новую тематическую подборку украшений.'
								: 'Обновите описание и обложку коллекции.'}
						</p>
					</div>
					<span className="status-badge">
						{collection.status === 'published' ? 'Опубликована' : 'Черновик'}
					</span>
				</header>
				<div className="editor-layout">
					<section
						className="preview-panel"
						aria-label="Предпросмотр коллекции"
					>
						<div className="section-heading">
							<span className="section-kicker">Предпросмотр</span>
							<span className="preview-size">Обложка коллекции</span>
						</div>
						<div className="collection-preview">
							{collection.cover ? (
								<img src={collection.cover} alt={collection.title} />
							) : (
								<span>Здесь появится обложка</span>
							)}
							<div className="preview-overlay">
								<span>Коллекция</span>
								<strong>
									{collection.title || 'Название коллекции'}
								</strong>
							</div>
						</div>
						<div className="preview-note">
							<span className="note-dot" />
							Обложка будет показана в каталоге коллекций
						</div>
					</section>
					<form className="collection-form" onSubmit={handleSubmit}>
						<div className="form-heading">
							<span className="section-kicker">Содержание</span>
							<span className="required-note">* Обязательное поле</span>
						</div>
						<label>
							<span>
								Название коллекции <em>*</em>
							</span>
							<input
								name="title"
								type="text"
								defaultValue={collection.title}
								required
							/>
						</label>
						<label>
							<span>
								Описание <em>*</em>
							</span>
							<textarea
								name="description"
								rows="4"
								defaultValue={collection.description}
								required
							/>
						</label>
						<label>
							<span>
								Ссылка на обложку <em>*</em>
							</span>
							<input
								name="cover"
								type="url"
								defaultValue={collection.cover}
								required
							/>
						</label>
						<label>
							<span>Статус публикации</span>
							<select name="status" defaultValue={collection.status}>
								<option value="published">Опубликована</option>
								<option value="draft">Черновик</option>
							</select>
						</label>
						<div className="actions">
							<button
								type="button"
								className="cancel-button"
								onClick={() => navigate('/moderator/collections')}
							>
								Отмена
							</button>
							<button type="submit" className="submit-button">
								{isAdding ? 'Добавить коллекцию' : 'Сохранить изменения'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export const ModeratorCollectionEdit = styled(ModeratorCollectionEditContainer)`
	width: min(100% - 80px, 1200px);
	margin: 0 auto;
	padding: 58px 0 88px;
	color: #302c28;
	.page-shell {
		padding: 30px;
		background: #fff;
		border: 1px solid #e0d8cf;
	}
	.page-header,
	.form-heading,
	.section-heading {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 20px;
	}
	.page-header {
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
	.status-badge {
		padding: 7px 11px;
		border: 1px solid #c9d8c9;
		background: #f1f7f0;
		color: #557054;
		font-size: 11px;
		white-space: nowrap;
	}
	.editor-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
		gap: 34px;
		padding-top: 30px;
	}
	.section-heading,
	.form-heading {
		align-items: center;
		padding-bottom: 14px;
		border-bottom: 1px solid #e6ded5;
	}
	.preview-size,
	.required-note {
		color: #9b8e83;
		font-size: 11px;
	}
	.collection-preview {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1.6 / 1;
		margin-top: 20px;
		overflow: hidden;
		background: #eee8e0;
		color: #9b8e83;
	}
	.collection-preview img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.collection-preview::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, rgba(25, 20, 17, 0.5), transparent 75%);
	}
	.preview-overlay {
		position: absolute;
		bottom: 24px;
		left: 24px;
		z-index: 1;
		display: grid;
		gap: 4px;
		color: #fff;
	}
	.preview-overlay span {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.preview-overlay strong {
		font-size: clamp(22px, 2.4vw, 36px);
		font-weight: 500;
	}
	.preview-note {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 14px;
		color: #81756b;
		font-size: 12px;
	}
	.note-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #bcae9d;
	}
	.collection-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: #665d55;
		font-size: 13px;
	}
	label em {
		color: #ad6f5e;
		font-style: normal;
	}
	input,
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
		min-height: 106px;
		resize: vertical;
	}
	input:focus,
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
		.editor-layout {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 520px) {
		.page-header {
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

export const ModeratorCollectionAdd = (props) => (
	<ModeratorCollectionEdit {...props} isAdding />
);
