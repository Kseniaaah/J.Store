import styled from 'styled-components';

const ModeratorLoginContainer = ({ className }) => (
	<main className={className}>
		<div className="login-card">
			<div className="login-header">
				<span className="eyebrow">J.Store · moderator</span>
				<h1>Вход в панель</h1>
			</div>

			<form className="login-form">
				<label>
					<span>Email</span>
					<input type="email" placeholder="manager@jstore.ru" />
				</label>

				<label>
					<span>Пароль</span>
					<input type="password" placeholder="••••••••" />
				</label>

				<button type="submit">Войти</button>
			</form>
		</div>
	</main>
);

export const ModeratorLogin = styled(ModeratorLoginContainer)`
	min-height: 70vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60px 20px;
	background: #f9f5f0;
	color: #302c28;

	.login-card {
		width: min(100%, 460px);
		padding: 40px 32px 32px;
		background: #fff;
		border: 1px solid #e0d8cf;
		box-shadow: 0 10px 30px rgba(48, 44, 40, 0.04);
	}

	.login-header {
		margin-bottom: 28px;
	}

	.eyebrow {
		display: block;
		margin-bottom: 12px;
		color: #8a7d70;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: clamp(34px, 4vw, 48px);
		font-weight: 500;
		font-family: 'Marck Script', cursive;
		line-height: 1.1;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: #665d55;
		font-size: 13px;
	}

	input {
		height: 48px;
		padding: 0 14px;
		border: 1px solid #d8cec2;
		background: #f9f5f0;
		color: #302c28;
		font: inherit;
		outline: none;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	input:focus {
		border-color: #bcae9d;
		box-shadow: 0 0 0 3px rgba(188, 174, 157, 0.12);
	}

	button {
		height: 48px;
		margin-top: 8px;
		border: none;
		background: #302c28;
		color: #fff;
		font: inherit;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	button:hover {
		opacity: 0.96;
	}

	@media (max-width: 480px) {
		.login-card {
			padding: 28px 20px 22px;
		}
	}
`;
