import styled from 'styled-components';

const FooterFormContainer = ({ className }) => (
	<form className={className}>
		<p className="footer-form__title">
			Отправьте нам номер телефона, чтобы сделать заказ или уточнить детали
		</p>
		<div className="footer-form__fields">
			<input type="tel" placeholder="Телефон" aria-label="Номер телефона" />
			<button type="submit">Отправить</button>
		</div>
		<label className="footer-form__consent">
			<input type="checkbox" />
			<span>Согласие на обработку персональных данных</span>
		</label>
	</form>
);

export const FooterForm = styled(FooterFormContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 14px;
	width: min(100%, 560px);
	color: #665f57;
	font-size: 12px;

	.footer-form__title {
		width: 100%;
		margin: 0;
		font-size: 14px;
		line-height: 1.5;
		text-align: center;
	}

	.footer-form__fields {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
	}

	input[type='tel'] {
		width: 100%;
		padding: 11px 14px;
		border: 1px solid #ded5ca;
		border-radius: 4px;
		background: #fffdf9;
		color: #29251f;
		font: inherit;
		outline: none;

		&:focus {
			border-color: #b89b72;
			box-shadow: 0 0 0 3px rgba(184, 155, 114, 0.16);
		}
	}

	button {
		width: 100%;
		padding: 11px 20px;
		border: 1px solid #29251f;
		border-radius: 4px;
		background: #29251f;
		color: #fff;
		font: inherit;
		cursor: pointer;
		transition:
			background 160ms ease,
			border-color 160ms ease;

		&:hover {
			border-color: #b89b72;
			background: #b89b72;
		}
	}

	.footer-form__consent {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		width: 100%;
		cursor: pointer;
		line-height: 1.4;

		input {
			margin: 2px 0 0;
			accent-color: #b89b72;
		}
	}
`;
