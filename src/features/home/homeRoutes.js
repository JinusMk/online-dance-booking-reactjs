import Home from './containers/Home'
import DanceDetail from './containers/DanceDetail';
import { pageLayoutHoc } from '../../hocs'

export const homeRoutes = [
    {
        path: '/',
        component : pageLayoutHoc(Home),
        key: 'home'
    },
    {
        path: '/home',
        component : pageLayoutHoc(Home),
        key: 'home'
    },
    {
        path: '/dance/:id',
        component : DanceDetail,
        key: 'dance-detail'
    },
]