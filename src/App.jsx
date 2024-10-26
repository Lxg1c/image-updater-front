import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AutoRoot from './components/auth/AutoRoot'
import Header from './components/Header-Footer/Header'
import Footer from './components/Header-Footer/Footer'
import Main from './components/MainPage/Main'
import History from './components/History/History'
import ViewUpdate from './components/ViewUpdate/ViewUpdate' // Исправлено имя

function App() {
	return (
		<Router>
			<div className='app'>
				<Header loggedIn={false} />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/history' element={<History />} />
					<Route path='/updateView' element={<ViewUpdate />} />{' '}
					<Route path='/authorization' element={<AutoRoot />} />
					<Route path='/registration' element={<AutoRoot />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
