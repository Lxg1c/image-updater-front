import { useLocation } from 'react-router-dom'
import Registration from './Registration'
import Authorization from './Authorization'

const AutoRoot = () => {
	const location = useLocation()

	return location.pathname === '/registration' ? (
		<Registration />
	) : location.pathname === '/authorization' ? (
		<Authorization />
	) : null
}

export default AutoRoot
