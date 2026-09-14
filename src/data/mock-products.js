import banner1 from '../components/icon/banner1.jpg';
import banner2 from '../components/icon/banner2.jpg';
import banner3 from '../components/icon/banner3.jpg';

export const mockProducts = [
	{
		id: 1,
		title: 'Золотое кольцо',
		price: 12000,
		category: 'rings',
		collectionId: 1,
		image: banner1,
		isFavorite: false,
	},
	{
		id: 2,
		title: 'Серебряная подвеска',
		price: 8500,
		category: 'pendants',
		collectionId: 1,
		image: banner2,
		isFavorite: false,
	},
	{
		id: 3,
		title: 'Серьги с камнями',
		price: 14600,
		category: 'earrings',
		collectionId: 2,
		image: banner3,
		isFavorite: false,
	},
];
