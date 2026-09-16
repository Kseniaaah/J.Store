import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ModeratorBannersContainer = ({ className, banners }) => {
	const [activeFilter, setActiveFilter] = useState('all');
	const publishedBanners = banners.filter((banner) => banner.status === 'published');
	const visibleBanners =
		activeFilter === 'published'
			? publishedBanners
			: activeFilter === 'draft'
				? banners.filter((banner) => banner.status === 'draft')
				: banners;

	return (
		<main className={className}>
			<header className="page-header">
				<div>
					<span className="eyebrow">J.Store · moderator</span>
					<h1>Баннеры</h1>
					<p>
						Главные промо-блоки и изображения, которые видят посетители
						магазина.
					</p>
				</div>
				<div className="header-meta">
					<strong>{publishedBanners.length}</strong>
					<span>активных баннера</span>
				</div>
			</header>

			<section className="toolbar" aria-label="Фильтры баннеров">
				<div className="tabs">
					<button
						type="button"
						className={`tab${activeFilter === 'all' ? ' tab--active' : ''}`}
						onClick={() => setActiveFilter('all')}
					>
						Все баннеры <span>{banners.length}</span>
					</button>
					<button
						type="button"
						className={`tab${activeFilter === 'published' ? ' tab--active' : ''}`}
						onClick={() => setActiveFilter('published')}
					>
						Опубликованные <span>{publishedBanners.length}</span>
					</button>
					<button
						type="button"
						className={`tab${activeFilter === 'draft' ? ' tab--active' : ''}`}
						onClick={() => setActiveFilter('draft')}
					>
						Черновики <span>{banners.length - publishedBanners.length}</span>
					</button>
				</div>
				<Link className="add-button" to="/moderator/banners/add">
					<span aria-hidden="true">+</span> Добавить баннер
				</Link>
			</section>

			<section className="banner-grid" aria-label="Список баннеров">
				{visibleBanners.map(({ id, title, alt, image, status }, index) => (
					<article className="banner-card" key={id}>
						<div className="card-image">
							<img src={image} alt={alt} />
							<span className="position-badge">0{index + 1}</span>
							<span
								className={`published-badge published-badge--${status}`}
							>
								<span />{' '}
								{status === 'published' ? 'Опубликован' : 'Черновик'}
							</span>
						</div>
						<div className="card-content">
							<div>
								<span className="card-kicker">Главный экран</span>
								<h2>{title}</h2>
							</div>
							<Link
								className="edit-link"
								to={`/moderator/banners/${id}/edit`}
							>
								Редактировать <span aria-hidden="true">→</span>
							</Link>
						</div>
					</article>
				))}
			</section>
		</main>
	);
};

export const ModeratorBanners = styled(ModeratorBannersContainer)`
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
		text-transform: uppercase;
		letter-spacing: 0.08em;
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
		cursor: pointer;
		white-space: nowrap;
	}

	.add-button span {
		margin-right: 5px;
		font-size: 18px;
		vertical-align: -1px;
	}

	.banner-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	.banner-card {
		min-width: 0;
		background: #fff;
		border: 1px solid #e0d8cf;
	}

	.card-image {
		position: relative;
		aspect-ratio: 1.55 / 1;
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

	.banner-card:hover .card-image img {
		transform: scale(1.03);
	}

	.position-badge,
	.published-badge {
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

	.published-badge {
		right: 12px;
		color: #557054;
	}

	.published-badge span {
		display: inline-block;
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background: #769375;
	}

	.card-content {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 12px;
		min-height: 110px;
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
		font-size: 18px;
		font-weight: 500;
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

		.banner-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 520px) {
		width: calc(100% - 32px);

		.banner-grid {
			grid-template-columns: 1fr;
		}

		.add-button {
			width: 100%;
		}

		.card-content {
			min-height: 96px;
		}
	}
`;
