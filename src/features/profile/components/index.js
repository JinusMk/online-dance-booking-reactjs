import DanceHistoryCard from './DanceHistoryCard'
import AddReviewCard from './AddReviewCard'
import DanceHistoryLoader from './DanceHistoryLoader'
import ReviewDetails from './ReviewDetails'
import UserSubscriptionOverview from './UserSubscriptionOverview'
import AllTimeSummary from './AllTimeSummary'
import UserProgressDrawer from './UserProgressDrawer'
import LogCalorieForm from './LogCalorieForm'
import WeightGoal from './WeightGoal'
import Shimmer from './Shimmer'

export { 
    DanceHistoryCard,
    AddReviewCard,
    DanceHistoryLoader,
    ReviewDetails,
    UserSubscriptionOverview,
    AllTimeSummary,
    UserProgressDrawer,
    LogCalorieForm,
    WeightGoal,
    Shimmer
}

export const GRAPH_OPTONS = {
    hAxis: {
        title: '',
        format: 'dd MMM',
        gridlines: {color: 'transparent'},
        textStyle: {
            color: `#999999`,
            fontSize: 12,
        }
    },
    chartArea: {
        left:30,
        top:30,
        bottom: 20,
        right: 20,
    },
    legend: {
        position: 'top', 
        textStyle: {
            fontSize: 12,
            bold: true
        }
    },
    vAxis: {
        title: '',
        gridlines: {color: '#FFE5E9', count: 1},
    },
    series: {
        0: { 
            lineDashStyle : [4, 4],
            color: '#3d8dca'
        },
        1: { 
            pointSize: 10,
            curveType: 'function',
            color: `#0E7ACB`
        }
    },
}