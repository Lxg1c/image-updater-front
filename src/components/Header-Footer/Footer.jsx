import Logo from '../../assets/logo-white.svg'
import '../../styles/Footer.css'
import '../../styles/Fonts.css'

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<div>
					<img src={Logo} alt='Logo' className='footer-logo' />
				</div>
				<div>
					<h4 className='section-title'>Компания</h4>
					<ul className='section-list'>
						<li className='section-list__item text'>О Нас</li>
						<li className='section-list__item text'>
							Политика Конфиденциальности
						</li>
						<li className='section-list__item text'>
							Пользовательское Соглашение
						</li>
						<li className='section-list__item text'>Свяжитесь с Нами</li>
						<li className='section-list__item text'>Пресса</li>
						<li className='section-list__item text'>Партнёр</li>
					</ul>
				</div>
				<div>
					<h4 className='section-title'>Поддержка</h4>
					<ul className='section-list'>
						<li className='section-list__item text'>Центр помощи</li>
						<li className='section-list__item text'>Блог</li>
						<li className='section-list__item text'>Цены</li>
					</ul>
				</div>
				<div>
					<h4 className='section-title'>NGO</h4>
					<ul className='section-list'>
						<li className='section-list__item text'>Центр помощи</li>
						<li className='section-list__item text'>Блог</li>
						<li className='section-list__item text'>Цены</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
