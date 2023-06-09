import {Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import Home from '../Home'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Route path="/" component={Home} />
  }
  return <Route {...props} />
}

export default ProtectedRoute
