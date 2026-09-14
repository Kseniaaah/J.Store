import styled from 'styled-components';

const DeliveryAndPaymentsContainer = ({ className }) => {

	return (
		<div className={className}>
			<p>
				Delivery and Payments
			</p>
		</div>
	);
};

export const DeliveryAndPayments = styled(DeliveryAndPaymentsContainer)`
	margin-bottom: 64px;

`;
