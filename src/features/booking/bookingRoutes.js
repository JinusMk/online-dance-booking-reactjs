import Booking from './containers/Booking'
import BookingSuccess from './containers/BookingSuccess'
import { pageLayoutHoc } from '../../hocs'

export const bookingRoutes = [
    {
        path: '/dance/:slug/:id/booking',
        component: Booking,
        key: 'booking'
    },
    {
        path: '/dance/:slug/:id/booking/success',
        component: pageLayoutHoc(BookingSuccess),
        key: 'booking-success'
    },
]