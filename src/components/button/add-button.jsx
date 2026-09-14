import { Children } from 'react';
import addIcon from '../icon/add-book.png';
import styled from 'styled-components';

const AddButtonContainer = ({
	className,
	type = 'button',
	icon,
	src,
	alt = 'Add',
	children,
	...props
}) => {
	const iconSrc = icon || src || addIcon;
	const visibleChildren = Children.toArray(children).filter(
		(child) => typeof child !== 'string' || child.trim() !== '',
	);
	const hasCustomContent = visibleChildren.length > 0;

	return (
		<button
			className={className}
			type={type}
			//onClick={() => ()}
			{...props}
		>
			{hasCustomContent ? (
				visibleChildren
			) : (
				<img className="add-icon" src={iconSrc} alt={alt} />
			)}
		</button>
	);
};

export const AddButton = styled(AddButtonContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	padding: 12px;
	border: none;
	border-radius: 50%;
	background-color: #79855d;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #8b9770;
	}

	& .add-icon {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;
