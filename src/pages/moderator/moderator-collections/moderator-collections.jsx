import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ModeratorCollectionsContainer = ({ className, collections }) => {
	const [activeFilter, setActiveFilter] = useState('all');
	const publishedCollections = collections.filter(
		(collection) => collection.status === 'published',
	);
	const visibleCollections =
		activeFilter === 'published'
			? publishedCollections
			: activeFilter === 'draft'
				? collections.filter((collection) => collection.status === 'draft')
				: collections;

	return (
		<main className={className}>
			<header className="page-header">
				<div>
					<span className="eyebrow">your jeweler · moderator</span>
					<h1>Коллекции</h1>
					<p>
						Тематические подборки украшений и их обложки в каталоге магазина.
					</p>
				</div>
				<div className="header-meta">
					<strong>{publishedCollections.length}</strong>
					<span>активных подборки</span>
				</div>
			</header>

			<section className="toolbar" aria-label="Фильтры коллекций">
				<div className="tabs">
					<button
						type="button"
						className={`tab${activeFilter === 'all' ? ' tab--active' : ''}`}
						onClick={() => setActiveFilter('all')}
					>
						Все коллекции <span>{collections.length}</span>
					</button>
					<button
						type="button"
						className={`tab${activeFilter === 'published' ? ' tab--active' : ''}`}
						onClick={() => setActiveFilter('published')}
					>
						Опубликованные <span>{publishedCollections.length}</span>
					</button>
					<button
						type="button"
						className={`tab${activeFilter === 'draft' ? ' tab--active' : ''}`}
						onClick={() => setActiveFilter('draft')}
					>
						Черновики{' '}
						<span>{collections.length - publishedCollections.length}</span>
					</button>
				</div>
				<Link className="add-button" to="/moderator/collections/add">
					<span aria-hidden="true">+</span> Добавить коллекцию
				</Link>
			</section>

			<section className="collection-grid" aria-label="Список коллекций">
				{visibleCollections.map(
					({ id, title, description, cover, status }, index) => (
						<article className="collection-card" key={id}>
							<div className="card-image">
								<img src={cover} alt={title} />
								<span className="position-badge">0{index + 1}</span>
								<span className={`status-badge status-badge--${status}`}>
									<span />{' '}
									{status === 'published' ? 'Опубликована' : 'Черновик'}
								</span>
							</div>
							<div className="card-content">
								<div>
									<span className="card-kicker">
										Подборка украшений
									</span>
									<h2>{title}</h2>
									<p>{description}</p>
								</div>
								<Link
									className="edit-link"
									to={`/moderator/collections/${id}/edit`}
								>
									Редактировать <span aria-hidden="true">→</span>
								</Link>
							</div>
						</article>
					),
				)}
			</section>
		</main>
	);
};

export const ModeratorCollections = styled(ModeratorCollectionsContainer)`
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
		max-width: 540px;
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
		margin: 30px 0 18px;
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
	.add-button {
		display: inline-flex;
		align-items: center;
		min-height: 40px;
		padding: 0 15px;
		border: 1px solid #302c28;
		background: #302c28;
		color: #fff;
		font: inherit;
		font-size: 12px;
		text-decoration: none;
		white-space: nowrap;
	}
	.add-button span {
		margin-right: 5px;
		font-size: 18px;
	}
	.collection-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}
	.collection-card {
		min-width: 0;
		background: #fff;
		border: 1px solid #e0d8cf;
	}
	.card-image {
		position: relative;
		aspect-ratio: 1.8 / 1;
		overflow: hidden;
		background: #eee8e0;
	}
	.card-image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 250ms ease;
	}
	.collection-card:hover .card-image img {
		transform: scale(1.03);
	}
	.position-badge,
	.status-badge {
		position: absolute;
		top: 12px;
		z-index: 1;
		padding: 6px 8px;
		background: rgba(255, 255, 255, 0.9);
		font-size: 10px;
	}
	.position-badge {
		left: 12px;
		color: #665d55;
		font-weight: 700;
	}
	.status-badge {
		right: 12px;
		color: #557054;
	}
	.status-badge span {
		display: inline-block;
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background: #769375;
	}
	.status-badge--draft {
		color: #896c4d;
	}
	.status-badge--draft span {
		background: #c39b6e;
	}
	.card-content {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		min-height: 128px;
		padding: 16px;
	}
	.card-kicker {
		color: #9b8e83;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	h2 {
		margin: 8px 0 0;
		font-size: 20px;
		font-weight: 500;
	}
	.card-content p {
		max-width: 360px;
		margin: 7px 0 0;
		color: #81756b;
		font-size: 12px;
		line-height: 1.5;
	}
	.edit-link {
		color: #665d55;
		font-size: 11px;
		white-space: nowrap;
	}
	.edit-link span {
		margin-left: 4px;
		font-size: 16px;
		vertical-align: -1px;
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
	}
	@media (max-width: 560px) {
		width: calc(100% - 32px);
		.collection-grid {
			grid-template-columns: 1fr;
		}
		.add-button {
			width: 100%;
			justify-content: center;
		}
	}
`;
