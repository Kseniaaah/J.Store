export const dashboardDate = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
}).format(new Date());
export const dashboardDateTime = new Date().toISOString().split('T')[0];
export const getOrdersUpdatedLabel = () => {
	const updatedAt = new Date();
	const time = new Intl.DateTimeFormat('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	}).format(updatedAt);

	return `Обновлено сегодня, ${time}`;
};

export const orderStatusLabels = {
	new: 'Новая',
	progress: 'В работе',
	done: 'Завершён',
};

export const mockOrders = [
	{
		id: 1048,
		customer: 'Анна Петрова',
		phone: '+7 (900) 123-45-67',
		address: 'Москва, ул. Петровка, 18',
		items: [{ productId: 1, title: 'Кольцо с зелёным камнем', quantity: 1, price: 12000 }],
		total: 12000,
		status: 'new',
		createdAt: '2026-09-15T12:40:00+03:00',
		comment: '',
		internalComment: '',
	},
	{
		id: 1047,
		customer: 'Мария Смирнова',
		phone: '+7 (900) 123-45-67',
		address: 'Москва, ул. Петровка, 18',
		items: [
			{ productId: 23, title: 'Мини-браслет', quantity: 1, price: 8700 },
			{ productId: 24, title: 'Жемчужный браслет', quantity: 1, price: 15100 },
		],
		total: 23800,
		status: 'progress',
		createdAt: '2026-09-15T12:40:00+03:00',
		comment: '',
		internalComment: '',
	},
	{
		id: 1046,
		customer: 'Екатерина Волкова',
		phone: '+7 (900) 123-45-67',
		address: 'Москва, ул. Петровка, 18',
		items: [{ productId: 17, title: 'Жемчужная коллекция', quantity: 1, price: 21500 }],
		total: 21500,
		status: 'done',
		createdAt: '2026-09-15T12:40:00+03:00',
		comment: '',
		internalComment: '',
	},
	{
		id: 1045,
		customer: 'Ольга Иванова',
		phone: '+7 (900) 123-45-67',
		address: 'Москва, ул. Петровка, 18',
		items: [{ productId: 7, title: 'Волнистое кольцо', quantity: 1, price: 9200 }],
		total: 9200,
		status: 'new',
		createdAt: '2026-09-15T12:40:00+03:00',
		comment: '',
		internalComment: '',
	},
];
