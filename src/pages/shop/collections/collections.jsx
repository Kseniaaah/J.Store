import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { mockCollections as collections } from '../../../data/mock-collections';
import { PagesTitle } from '../../../components';

const CollectionsContainer = ({ className }) => {
	return (
		<div className={className}>
			<PagesTitle eyebrow="Коллекции" title="Истории в деталях" />
			{collections.map((collection) => (
				<CollectionCard key={collection.id} collection={collection} />
			))}
		</div>
	);
};

const CollectionCardContainer = ({ className, collection }) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const slideshowInterval = useRef(null);
	const imageCount = collection.images.length;

	useEffect(() => {
		return () => clearInterval(slideshowInterval.current);
	}, []);

	const startSlideshow = () => {
		if (imageCount < 2) return;

		setActiveImageIndex(1);
		slideshowInterval.current = setInterval(() => {
			setActiveImageIndex((currentIndex) => (currentIndex + 1) % imageCount);
		}, 1200);
	};

	const stopSlideshow = () => {
		clearInterval(slideshowInterval.current);
		slideshowInterval.current = null;
		setActiveImageIndex(0);
	};

	return (
		<article className={className}>
			<CollectionImageWrapper
				onMouseEnter={startSlideshow}
				onMouseLeave={stopSlideshow}
				$isInteractive={imageCount > 1}
			>
				<CollectionImageTrack
					$activeImageIndex={activeImageIndex}
					$imageCount={imageCount}
				>
					{collection.images.map((image, imageIndex) => (
						<CollectionCover
							key={`${image}-${imageIndex}`}
							$imageCount={imageCount}
							src={image}
							alt={
								imageIndex === 0
									? collection.title
									: `${collection.title}, фото ${imageIndex + 1}`
							}
						/>
					))}
				</CollectionImageTrack>
				{imageCount > 1 && (
					<CollectionIndicators
						aria-label={`Фотографии коллекции «${collection.title}»`}
					>
						{collection.images.map((image, imageIndex) => (
							<CollectionIndicator
								key={`${image}-${imageIndex}`}
								type="button"
								$active={imageIndex === activeImageIndex}
								aria-label={`Показать фото ${imageIndex + 1}`}
								onClick={(event) => {
									event.stopPropagation();
									setActiveImageIndex(imageIndex);
								}}
							/>
						))}
					</CollectionIndicators>
				)}
			</CollectionImageWrapper>
			<CollectionTitle>{collection.title}</CollectionTitle>
			<CollectionDescription>{collection.description}</CollectionDescription>
		</article>
	);
};

const CollectionCard = styled(CollectionCardContainer)`
	min-width: 0;
`;

const CollectionImageTrack = styled.div`
	display: flex;
	width: ${({ $imageCount }) => `${$imageCount * 100}%`};
	height: 100%;
	transform: ${({ $activeImageIndex, $imageCount }) =>
		`translateX(-${($activeImageIndex * 100) / $imageCount}%)`};
	transition: transform 360ms ease;
`;

const CollectionImageWrapper = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: 3 / 4;
	overflow: hidden;
	background: #f1ede7;
	cursor: ${({ $isInteractive }) => ($isInteractive ? 'pointer' : 'default')};
`;

const CollectionCover = styled.img`
	display: block;
	flex: 0 0 ${({ $imageCount }) => `${100 / $imageCount}%`};
	width: ${({ $imageCount }) => `${100 / $imageCount}%`};
	height: 100%;
	object-fit: cover;
`;

const CollectionIndicators = styled.div`
	position: absolute;
	bottom: 12px;
	left: 50%;
	display: flex;
	max-width: calc(100% - 24px);
	gap: 6px;
	transform: translateX(-50%);
`;

const CollectionIndicator = styled.button`
	width: 6px;
	height: 6px;
	padding: 0;
	border: 0;
	border-radius: 50%;
	background: ${({ $active }) => ($active ? '#302c28' : 'rgba(48, 44, 40, 0.35)')};
	cursor: pointer;
`;

const CollectionTitle = styled.h2`
	margin: 12px 0 6px;
	color: #302c28;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.3;
`;

const CollectionDescription = styled.p`
	margin: 0;
	color: #302c28;
	font-size: 15px;
	font-weight: 400;
	line-height: 1.3;
`;

export const Collections = styled(CollectionsContainer)`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 32px 20px;
	width: calc(100% - 48px);
	max-width: 1440px;
	margin: 0 auto 64px;

	@media (max-width: 900px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 28px 16px;
		width: calc(100% - 32px);
	}

	@media (max-width: 520px) {
		grid-template-columns: 1fr;
	}
`;
