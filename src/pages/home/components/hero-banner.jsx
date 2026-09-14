import { useState } from 'react';
import styled from 'styled-components';
import { mockBanners as slides } from '../../../data/mock-banners';

const HeroBannerContainer = ({ className }) => {
	const [activeSlide, setActiveSlide] = useState(0);

	const showSlide = (slideIndex) => {
		const nextSlide = (slideIndex + slides.length) % slides.length;
		setActiveSlide(nextSlide);
	};

	const currentSlide = slides[activeSlide];

	return (
		<section className={className}>
			<img
				className="hero-banner__image"
				src={currentSlide.image}
				alt={currentSlide.alt}
			/>
			<h1 className="hero-banner__title">{currentSlide.title}</h1>

			<button
				className="hero-banner__arrow hero-banner__arrow--previous"
				type="button"
				aria-label="Предыдущий слайд"
				onClick={() => showSlide(activeSlide - 1)}
			>
				←
			</button>
			<button
				className="hero-banner__arrow hero-banner__arrow--next"
				type="button"
				aria-label="Следующий слайд"
				onClick={() => showSlide(activeSlide + 1)}
			>
				→
			</button>

			<div className="hero-banner__dots" aria-label="Выбор слайда">
				{slides.map((slide, index) => (
					<button
						className={`hero-banner__dot${index === activeSlide ? ' hero-banner__dot--active' : ''}`}
						type="button"
						aria-label={`Слайд ${index + 1}`}
						aria-current={index === activeSlide ? 'true' : undefined}
						onClick={() => showSlide(index)}
						key={slide.title}
					/>
				))}
			</div>
		</section>
	);
};

export const HeroBanner = styled(HeroBannerContainer)`
	position: relative;
	width: 100%;
	height: min(44vw, 730px);
	min-height: 300px;
	overflow: hidden;

	.hero-banner__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-banner__title {
		position: absolute;
		top: 32px;
		right: 40px;
		margin: 0;
		color: #fff;
		font-size: clamp(24px, 3vw, 44px);
		font-weight: 500;
		line-height: 1.1;
	}

	.hero-banner__arrow {
		position: absolute;
		top: 50%;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border: 1px solid rgba(255, 255, 255, 0.7);
		border-radius: 50%;
		background: rgba(32, 27, 22, 0.24);
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		transform: translateY(-50%);
		transition: background 160ms ease;

		&:hover {
			background: rgba(32, 27, 22, 0.52);
		}
	}

	.hero-banner__arrow--previous {
		left: 24px;
	}

	.hero-banner__arrow--next {
		right: 24px;
	}

	.hero-banner__dots {
		position: absolute;
		bottom: 20px;
		left: 50%;
		display: flex;
		gap: 8px;
		transform: translateX(-50%);
	}

	.hero-banner__dot {
		width: 8px;
		height: 8px;
		padding: 0;
		border: 1px solid #fff;
		border-radius: 50%;
		background: transparent;
		cursor: pointer;
	}

	.hero-banner__dot--active {
		background: #fff;
	}
`;
