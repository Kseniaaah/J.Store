import collectionPearls from '../components/icon/products/collections/collection-pearls.jpg';
import collectionMuse from '../components/icon/products/collections/collection-muse.jpg';
import collectionMinimalism from '../components/icon/products/collections/collection-minimalism.jpg';
import collectionGarden from '../components/icon/products/collections/collection-garden.jpg';
import { mockProducts } from './mock-products';

const getCollectionImages = (cover, collectionId) => [
	cover,
	...mockProducts
		.filter((product) => product.collectionId === collectionId)
		.flatMap((product) => product.images),
];

export const mockCollections = [
	{
		id: 1,
		cover: collectionPearls,
		images: getCollectionImages(collectionPearls, 1),
		title: 'Жемчуг',
		description: 'Украшения с мягким сиянием жемчуга',
	},
	{
		id: 2,
		cover: collectionMuse,
		images: getCollectionImages(collectionMuse, 2),
		title: 'Муза',
		description: 'Выразительные украшения для особенных моментов',
	},
	{
		id: 3,
		cover: collectionMinimalism,
		images: getCollectionImages(collectionMinimalism, 3),
		title: 'Минимализм',
		description: 'Лаконичные украшения на каждый день',
	},
	{
		id: 4,
		cover: collectionGarden,
		images: getCollectionImages(collectionGarden, 4),
		title: 'Сад',
		description: 'Украшения, вдохновлённые красотой природы',
	},
];
