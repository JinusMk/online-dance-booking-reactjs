import Profile from './containers/Profile'
import Help from './containers/Help'
import { pageLayoutHoc } from '../../hocs'

export const profileRoutes = [
    {
        path: '/profile',
        component : pageLayoutHoc(Profile),
        key: 'profile'
    },
    {
        path: '/help',
        component: Help,
        key: 'help'
    }
]