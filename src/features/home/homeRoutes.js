import Home from './containers/Home'
import DanceDetail from './containers/DanceDetail';
import ReviewsListing from './containers/ReviewsListing';
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
        path: '/dance/:slug',
        component : DanceDetail,
        key: 'dance-detail'
    },
    {
        path: '/reviews',
        component : ReviewsListing,
        key: 'ReviewsListing'
    },
]