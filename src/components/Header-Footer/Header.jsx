import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo-black.svg'
import '../../styles/Header.css'
import '../../styles/Buttons.css'
import '../../styles/Fonts.css'

export default function Header({ loggedIn }) {
	const navigate = useNavigate()

	const handleLoginClick = () => {
		navigate('/authorization')
	}

	return (
		<header className='header'>
			<div className='header__container'>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div className='logo-container'>
						<a href='/'>
							<img src={Logo} alt='Logo' className='header-logo' />
						</a>
					</div>
					<nav>
						<ul className='nav-list'>
							<li className='nav-item'>
								<a href='/' className='nav-link text'>
									Главная
								</a>
							</li>
							<li className='nav-item'>
								<a href='/history' className='nav-link text'>
									История
								</a>
							</li>
						</ul>
					</nav>
				</div>

				<div>
					{localStorage.token ? (
						<div className='loggedInfo'>
							<div className='account-email'>
								{localStorage.getItem('email')}
							</div>
							<div
								className='login-button btn'
								onClick={() => {
									localStorage.removeItem('token')
									handleLoginClick()
									localStorage.removeItem('email')
								}}
							>
								Выйти
							</div>
						</div>
					) : (
						<div>
							<button className='login-button btn' onClick={handleLoginClick}>
								Войти
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
