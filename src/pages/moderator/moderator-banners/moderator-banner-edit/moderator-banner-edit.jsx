import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { categories } from '../../../../data/mock-products';

const ModeratorBannerEditContainer = ({
	className,
	banners,
	setBanners,
	collections = [],
	isAdding = false,
}) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const banner = isAdding
		? {
				title: '',
				alt: '',
				image: '',
				target: { type: 'category', id: 'all' },
				status: 'draft',
			}
		: banners.find((item) => item.id === Number(id));

	if (!banner) {
		return <main className={className}>Баннер не найден.</main>;
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const targetValue = formData.get('target')?.toString() || 'category:all';
		const [targetType, targetId] = targetValue.split(':');
		const nextBanner = {
			title: formData.get('title')?.toString().trim() || 'Новый баннер',
			alt: formData.get('alt')?.toString().trim() || 'Баннер магазина',
			image: formData.get('imageUrl')?.toString().trim(),
			target: {
				type: targetType,
				id: targetType === 'collection' ? Number(targetId) : targetId,
			},
			status: formData.get('status')?.toString() || 'draft',
		};

		if (isAdding) {
			setBanners((currentBanners) => [
				{ ...nextBanner, id: Date.now() },
				...currentBanners,
			]);
		} else {
			setBanners((currentBanners) =>
				currentBanners.map((currentBanner) =>
					currentBanner.id === banner.id
						? { ...currentBanner, ...nextBanner }
						: currentBanner,
				),
			);
		}

		navigate('/moderator/banners');
	};

	return (
		<main className={className}>
			<div className="page-shell">
				<header className="page-header">
					<div>
						<span className="eyebrow">your jeweler · moderator</span>
						<h1>{isAdding ? 'Добавить баннер' : 'Редактировать баннер'}</h1>
						<p>
							{isAdding
								? 'Создайте новый промо-блок для главного экрана.'
								: 'Обновите содержание и изображение промо-блока.'}
						</p>
					</div>
					<span className="status-badge">
						{banner.status === 'published' ? 'Опубликован' : 'Черновик'}
					</span>
				</header>

				<div className="editor-layout">
					<section className="preview-panel" aria-label="Предпросмотр баннера">
						<div className="section-heading">
							<span className="section-kicker">Предпросмотр</span>
							<span className="preview-size">1440 × 720</span>
						</div>
						<div className="banner-preview">
							<img src={banner.image} alt={banner.alt} />
							<div className="preview-overlay">
								<span>Главный баннер</span>
								<strong>{banner.title}</strong>
							</div>
						</div>
						<div className="preview-note">
							<span className="note-dot" />
							Изображение будет показано на главном экране магазина
						</div>
					</section>

					<form className="banner-form" onSubmit={handleSubmit}>
						<div className="form-heading">
							<span className="section-kicker">Содержание</span>
							<span className="required-note">* Обязательное поле</span>
						</div>

						<label>
							<span>
								Название баннера <em>*</em>
							</span>
							<input name="title" type="text" defaultValue={banner.title} />
						</label>

						<label>
							<span>
								Alt-текст <em>*</em>
							</span>
							<input name="alt" type="text" defaultValue={banner.alt} />
							<small>
								Короткое описание для доступности и поисковой выдачи
							</small>
						</label>

						<label>
							<span>
								Ссылка на изображение <em>*</em>
							</span>
							<input
								name="imageUrl"
								type="url"
								defaultValue={banner.image}
							/>
						</label>

						<label>
							<span>Ссылка баннера</span>
							<select
								name="target"
								defaultValue={`${banner.target?.type || 'category'}:${banner.target?.id || 'all'}`}
							>
								<option value="category:all">Все украшения</option>
								<optgroup label="Категории">
									{categories.map((category) => (
										<option
											key={category.id}
											value={`category:${category.id}`}
										>
											{category.title}
										</option>
									))}
								</optgroup>
								<optgroup label="Коллекции">
									{collections.map((collection) => (
										<option
											key={collection.id}
											value={`collection:${collection.id}`}
										>
											{collection.title}
										</option>
									))}
								</optgroup>
							</select>
						</label>

						<label>
							<span>Статус публикации</span>
							<select name="status" defaultValue="published">
								<option value="published">Опубликован</option>
								<option value="draft">Черновик</option>
							</select>
						</label>

						<div className="actions">
							<button
								type="button"
								className="cancel-button"
								onClick={() => navigate('/moderator/banners')}
							>
								Отмена
							</button>
							<button type="submit" className="submit-button">
								{isAdding ? 'Добавить баннер' : 'Сохранить изменения'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export const ModeratorBannerAdd = (props) => <ModeratorBannerEdit {...props} isAdding />;

export const ModeratorBannerEdit = styled(ModeratorBannerEditContainer)`
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
		border-radius: 999px;
		background: #f1f7f0;
		color: #557054;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.05em;
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
	.required-note,
	small {
		color: #9b8e83;
		font-size: 11px;
	}

	.banner-preview {
		position: relative;
		aspect-ratio: 2 / 1;
		margin-top: 20px;
		overflow: hidden;
		background: #eee8e0;
	}

	.banner-preview img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.banner-preview::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, rgba(25, 20, 17, 0.48), transparent 70%);
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
		font-size: clamp(20px, 2.4vw, 34px);
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

	.banner-form {
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
	select {
		width: 100%;
		min-height: 44px;
		padding: 11px 13px;
		border: 1px solid #d8cec2;
		background: #faf6f1;
		color: #302c28;
		font: inherit;
		outline: none;
	}

	input:focus,
	select:focus {
		border-color: #bcae9d;
		box-shadow: 0 0 0 3px rgba(188, 174, 157, 0.12);
	}

	small {
		margin-top: -2px;
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
