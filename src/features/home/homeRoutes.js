import Home from './containers/Home'
import DanceDetail from './containers/DanceDetail';

export const homeRoutes = [
    {
        path: '/',
        component : Home,
        key: 'home'
    },
    {
        path: '/home',
        component : Home,
        key: 'home'
    },
    {
        path: '/dance/:id',
        component : DanceDetail,
        key: 'dance-detail'
    },
]