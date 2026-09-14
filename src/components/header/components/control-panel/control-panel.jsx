import heartIcon from '../../../icon/heartHeader.png';
import cartIcon from '../../../icon/bag.png';
import styled from 'styled-components';

const ActionButton = styled.button`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	padding: 0;
	border: 1px solid #e9e2d9;
	border-radius: 50%;
	background: #faf8f5;
	cursor: pointer;
	transition:
		background 160ms ease,
		border-color 160ms ease,
		transform 160ms ease;

	&:hover {
		border-color: #cdb898;
		background: #f2ece4;
		transform: translateY(-1px);
	}
`;

const StyledIcon = styled.img`
	width: 21px;
	height: 21px;
	object-fit: contain;
`;

const ItemCount = styled.span`
	position: absolute;
	top: -4px;
	right: -3px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 17px;
	height: 17px;
	border: 2px solid #fff;
	border-radius: 50%;
	background: #b89b72;
	color: #fff;
	font-size: 9px;
	font-weight: 700;
	line-height: 1;
`;

const ControlPanelLinks = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const ControlPanelContainer = ({ className }) => {
	return (
		<div className={className}>
			<ControlPanelLinks>
				<ActionButton type="button" aria-label="Избранное">
					<StyledIcon src={heartIcon} alt="" />
					<ItemCount>0</ItemCount>
				</ActionButton>
				<ActionButton type="button" aria-label="Корзина">
					<StyledIcon src={cartIcon} alt="" />
					<ItemCount>0</ItemCount>
				</ActionButton>
			</ControlPanelLinks>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	justify-self: end;
`;
