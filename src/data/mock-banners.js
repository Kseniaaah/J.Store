import banner1 from '../components/icon/banner1.jpg';
import banner2 from '../components/icon/banner2.jpg';
import banner3 from '../components/icon/banner3.jpg';

import backEarings from '../components/icon/backEarings.png';
import backRings from '../components/icon/backRings.png';
import backBracelets from '../components/icon/backBracelets.png';
import backNecklaces from '../components/icon/backNecklaces.png';
import backWedding from '../components/icon/backWedding.jpg';

export const mockBanners = [
	{
		id: 1,
		title: 'Новая коллекция',
		alt: 'Новая коллекция украшений',
		image: banner1,
		target: { type: 'collection', id: 2 },
		status: 'published',
	},
	{
		id: 2,
		title: 'Украшения на каждый день',
		alt: 'Украшения на каждый день',
		image: banner2,
		target: { type: 'collection', id: 3 },
		status: 'published',
	},
	{
		id: 3,
		title: 'Особенные моменты',
		alt: 'Украшения для особенных моментов',
		image: banner3,
		target: { type: 'category', id: 'wedding' },
		status: 'published',
	},
];

export const mockBackBanners = [
	{
		id: 1,
		title: 'Серьги',
		alt: 'Серьги каталог',
		image: backEarings,
		target: { type: 'category', id: 'earrings' },
	},
	{
		id: 2,
		title: 'Кольца',
		alt: 'Кольца каталог',
		image: backRings,
		target: { type: 'category', id: 'rings' },
	},
	{
		id: 3,
		title: 'Подвески',
		alt: 'Подвески каталог',
		image: backNecklaces,
		target: { type: 'category', id: 'necklaces' },
	},
	{
		id: 4,
		title: 'Браслеты',
		alt: 'Браслеты каталог',
		image: backBracelets,
		target: { type: 'category', id: 'bracelets' },
	},
	{
		id: 5,
		title: 'Свадебные',
		alt: 'Свадебные украшения каталог',
		image: backWedding,
		target: { type: 'category', id: 'wedding' },
	},
];
