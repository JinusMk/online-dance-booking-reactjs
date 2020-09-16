import Profile from './containers/Profile'
import { pageLayoutHoc } from '../../hocs'

export const profileRoutes = [
    {
        path: '/profile',
        component : pageLayoutHoc(Profile),
        key: 'profile'
    }
]