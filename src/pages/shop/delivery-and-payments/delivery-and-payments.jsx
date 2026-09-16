import styled from 'styled-components';
import { PagesTitle } from '../../../components';
import { deliverySections } from '../../../data/mock-delivery-and-payments-page';

const sectionGroups = [
	{
		title: 'Доставка',
		ids: ['sdek', 'russianPost', 'toDoorDelivery'],
	},
	{
		title: 'Заказ и оплата',
		ids: ['howToOrder', 'paymentMethods'],
	},
	{
		title: 'Подготовка к отправке',
		ids: ['shippingTime', 'Packaging'],
	},
	{
		title: 'Помощь',
		ids: ['questions'],
	},
];

const DeliveryAndPaymentsContainer = ({ className }) => {
	return (
		<div className={className}>
			<PagesTitle eyebrow="Сервис" title="Доставка и оплата" />
			<SectionsList aria-label="Информация о доставке и оплате">
				{sectionGroups.map(({ title: groupTitle, ids }) => (
					<SectionGroup key={groupTitle}>
						<GroupTitle>{groupTitle}</GroupTitle>
						{ids.map((id) => {
							const section = deliverySections.find((item) => item.id === id);

							return (
								<Section key={section.id}>
									<SectionMarker aria-hidden="true" />
									<div>
										<SectionTitle>{section.title}</SectionTitle>
										<SectionText>{section.text.trim()}</SectionText>
									</div>
								</Section>
							);
						})}
					</SectionGroup>
				))}
			</SectionsList>
		</div>
	);
};

export const DeliveryAndPayments = styled(DeliveryAndPaymentsContainer)`
	margin-bottom: 64px;
`;

const SectionsList = styled.section`
	width: calc(100% - 48px);
	max-width: 860px;
	margin: 0 auto;

	@media (max-width: 900px) {
		width: calc(100% - 32px);
	}
`;

const SectionGroup = styled.div`
	& + & {
		margin-top: 48px;
	}
`;

const GroupTitle = styled.h2`
	margin: 0 0 12px;
	color: #9c8264;
	font-size: 11px;
	font-weight: 700;
	letter-spacing: 0.14em;
	line-height: 1.4;
	text-transform: uppercase;
`;

const Section = styled.article`
	display: grid;
	grid-template-columns: 12px minmax(0, 1fr);
	gap: 16px;
	padding: 20px 0 24px;
	border-top: 1px solid #d8cec2;

	&:first-of-type {
		border-top: 0;
		padding-top: 8px;
	}
`;

const SectionMarker = styled.span`
	display: block;
	width: 6px;
	height: 6px;
	margin-top: 8px;
	border-radius: 50%;
	background-color: #b89b72;
`;

const SectionTitle = styled.h2`
	margin: 0 0 12px;
	color: #302c28;
	font-size: 18px;
	font-weight: 600;
	line-height: 1.3;
`;

const SectionText = styled.p`
	margin: 0;
	color: #665f57;
	font-size: 14px;
	line-height: 1.8;
	white-space: pre-line;

	@media (max-width: 520px) {
		font-size: 13px;
		line-height: 1.7;
	}
`;
