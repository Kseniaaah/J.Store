import { useParams } from 'react-router-dom';
import { ModeratorProductForm } from '../../../components/moderator-product-form/moderator-product-form';

export const ModeratorProductEdit = ({ products, setProducts }) => {
	const { id } = useParams();
	const product = products.find((item) => item.id === Number(id));

	return (
		<ModeratorProductForm
			product={product}
			setProducts={setProducts}
			isAdding={false}
		/>
	);
};
