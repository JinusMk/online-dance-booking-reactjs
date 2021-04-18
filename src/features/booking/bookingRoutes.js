import Booking from './containers/Booking'
import BookingSuccess from './containers/BookingSuccess'
import SubscriptionDetail from './containers/SubscriptionDetail'
import { pageLayoutHoc } from '../../hocs'

export const bookingRoutes = [
    {
        path: '/dance/:category/:id/booking',
        component: Booking,
        key: 'booking'
    },
    {
        path: '/dance/:category/:id/booking/success',
        component: pageLayoutHoc(BookingSuccess),
        key: 'booking-success'
    },
    {
        path: '/subscription/:category',
        component: SubscriptionDetail,
        key: 'subscription-detail'
    },
    {
        path: '/subscription/:category/:subsctiptionId/booking',
        component: Booking,
        key: 'subscription-detail'
    },
    {
        path: '/subscription/:category/:subsctiptionId/booking/success',
        component: pageLayoutHoc(BookingSuccess),
        key: 'subscription-detail'
    },
]