import Schedule from './containers/Schedule'
import { pageLayoutHoc } from '../../hocs'

export const scheduleRoutes = [
    {
        path: '/schedule',
        component: pageLayoutHoc(Schedule, {title: 'Schedule'}),
        key: 'schedule'
    }
]