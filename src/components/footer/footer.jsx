import styled from 'styled-components';
import { FooterForm } from './footer-form';
import tgIcon from '../icon/tg.png';
import instIcon from '../icon/inst.png';
import vkIcon from '../icon/vk.png';

const StyledIcon = styled.img`
	width: 18px;
	height: 18px;
	object-fit: contain;
`;

const FooterContainer = ({ className }) => (
	<footer className={className}>
		<FooterForm />
		<div className="footer__contacts">
			<a href="tel:+79665057212">+8 (966) 505-72-12</a>
			<a href="mailto:your.jeweler@mail.ru">your.jeweler@mail.ru</a>

			<div className="footer__socials">
				<a
					aria-label="Телеграм"
					href="https://t.me/your_jeweler"
					target="_blank"
					rel="noreferrer"
				>
					<StyledIcon src={tgIcon} alt="" />
				</a>
				<a
					aria-label="Instagram"
					href="https://www.instagram.com/your_jeweler/"
					target="_blank"
					rel="noreferrer"
				>
					<StyledIcon src={instIcon} alt="" />
				</a>
				<a
					aria-label="ВКонтакте"
					href="https://vk.com/your_jeweler"
					target="_blank"
					rel="noreferrer"
				>
					<StyledIcon src={vkIcon} alt="" />
				</a>
			</div>
		</div>
		<div className="footer__divider" />
		<p>©2025 «Your Jeweler»</p>
	</footer>
);

export const Footer = styled(FooterContainer)`
	display: grid;
	grid-template-columns: minmax(0, 560px) minmax(220px, auto);
	align-items: center;
	justify-content: center;
	column-gap: clamp(32px, 8vw, 120px);
	row-gap: 36px;
	width: 100%;
	padding: 40px 24px 24px;
	box-shadow: 0 -8px 24px rgba(87, 68, 48, 0.06);
	background: #f4eee6;
	color: #665f57;
	font-size: 12px;

	.footer__contacts {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		width: 100%;
	}

	.footer__contacts a {
		color: #665f57;
		text-decoration: none;
		transition: color 160ms ease;

		&:hover {
			color: #b89b72;
		}
	}

	.footer__socials {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 6px;
	}

	.footer__socials a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: 1px solid #ded2c3;
		border-radius: 50%;
		background: rgba(255, 253, 249, 0.55);
		transition:
			border-color 160ms ease,
			background 160ms ease,
			transform 160ms ease;

		&:hover {
			border-color: #b89b72;
			background: #fffdf9;
			transform: translateY(-2px);
		}
	}

	.footer__divider {
		grid-column: 1 / -1;
		width: 100%;
		border-top: 1px solid #e5dccf;
	}

	p {
		grid-column: 1 / -1;
		width: min(100%, 560px);
		justify-self: center;
		margin: 0;
		text-align: center;
	}

	@media (max-width: 520px) {
		grid-template-columns: 1fr;
		row-gap: 28px;

		.footer__contacts {
			align-items: center;
		}

		p {
			grid-column: auto;
		}

		.footer__contacts {
			gap: 8px;
		}
	}
`;
