import Profile from './containers/Profile'
import Help from './containers/Help'
import EditProfile from './containers/EditProfile'
import DanceHistory from './containers/DanceHistory'
import { pageLayoutHoc } from '../../hocs'
import PrivacyPolicy from './containers/PrivacyPolicy';
import AddReview from './containers/AddReview';
import ClassDetail from './containers/ClassDetail';
import UserSubscriptions from './containers/UserSubscriptions';
import UserProgress from './containers/UserProgress';
import UserWeights from './containers/UserWeights';

export const profileRoutes = [
    {
        path: '/profile',
        component : pageLayoutHoc(Profile),
        key: 'profile'
    },
    {
        path: '/profile/action',
        component : pageLayoutHoc(Profile),
        key: 'profile'
    },
    {
        path: '/help',
        component: Help,
        key: 'help'
    },
    {
        path: '/edit-profile',
        component: EditProfile,
        key: 'EditProfile'
    },
    {
        path: '/dance-history',
        component: DanceHistory,
        key: 'DanceHistory'
    },
    {
        path: '/privacy-policy',
        component: PrivacyPolicy,
        key: 'privacy-policy'
    },
    {
        path: '/dance/:danceCategory/:danceId/review',
        component: AddReview,
        key: 'privacy-policy'
    },
    {
        path: '/dance/:danceCategory/:danceId',
        component: ClassDetail,
        key: 'ClassDetail'
    },
    {
        path: '/user-subscriptions',
        component: UserSubscriptions,
        key: 'user-subscriptions'
    },
    {
        path: '/user-subscriptions/:subscriptionId/progress',
        component: UserProgress,
        key: 'user-subscriptions'
    },
    {
        path: '/user-subscriptions/:subscriptionCategory/:danceId',
        component: ClassDetail,
        key: 'user-subscription-class-detail'
    },
    {
        path: '/user-weights',
        component: UserWeights,
        key: 'user-weights'
    },
]