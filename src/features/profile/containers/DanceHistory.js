import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import { DanceHistoryCard } from '../components'
import moment from 'moment'
import { DanceAlert, Header } from '../../../shared_elements';
import { globalGetService } from '../../../utils/globalApiServices';
import '../../../assets/styles/dance-history-module.scss'
import { imageBasePath } from '../../../constants';
import { connect } from 'react-redux'

function DanceHistory(props){
    const [loader, setLoader] = useState(false)
    const [danceInfo, setDanceInfo] = useState({
        "20-11-2020": [
            {
                "customer_name": "Bapi",
                "customer_email": "sbapi0001@email.com",
                "customer_mobile": "9856321020",
                "payment_method": "offline",
                "category_id": 1,
                "dance_id": 19,
                "category": "Bollywood",
                "category_image": "https://letsdance-admin.s3.ap-southeast-1.amazonaws.com/category/images/ODiLjDRLgjrD1bD9E2WDIMLlJUNI7mMGXwr6TE1r.jpeg?response-content-disposition=attachment%3B&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVGH3ZKKKPLPQ6BLB%2F20201128%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20201128T070939Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=b898f42b88f4b5da85767dcf8ef7ca32a578f8beaa5d7af72f8c30bebf025a02",
                "class_booked_for": "20-11-2020",
                "class_booked_start_time": "6:49 PM",
                "class_booked_end_time": "7:49 PM"
            }          
            
        ],
        "29-11-2020": [
            {
                "customer_name": "Bapi",
                "customer_email": "sbapi0001@email.com",
                "customer_mobile": "9856321020",
                "payment_method": "offline",
                "category_id": 1,
                "dance_id": 19,
                "category": "Bollywood",
                "category_image": "https://letsdance-admin.s3.ap-southeast-1.amazonaws.com/category/images/ODiLjDRLgjrD1bD9E2WDIMLlJUNI7mMGXwr6TE1r.jpeg?response-content-disposition=attachment%3B&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVGH3ZKKKPLPQ6BLB%2F20201128%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20201128T070939Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=b898f42b88f4b5da85767dcf8ef7ca32a578f8beaa5d7af72f8c30bebf025a02",
                "class_booked_for": "29-11-2020",
                "class_booked_start_time": "6:49 PM",
                "class_booked_end_time": "7:49 PM"
            }          
            
        ],
        "09-12-2020": [
            {
                "customer_name": "Bapi",
                "customer_email": "sbapi0001@email.com",
                "customer_mobile": "9856321020",
                "payment_method": "offline",
                "category_id": 1,
                "dance_id": 19,
                "category": "Bollywood",
                "category_image": "https://letsdance-admin.s3.ap-southeast-1.amazonaws.com/category/images/ODiLjDRLgjrD1bD9E2WDIMLlJUNI7mMGXwr6TE1r.jpeg?response-content-disposition=attachment%3B&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVGH3ZKKKPLPQ6BLB%2F20201128%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20201128T070939Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=b898f42b88f4b5da85767dcf8ef7ca32a578f8beaa5d7af72f8c30bebf025a02",
                "class_booked_for": "09-12-2020",
                "class_booked_start_time": "11:30 PM",
                "class_booked_end_time": "7:49 PM"
            }          
            
        ],
    })
    useEffect(() => {
        globalGetService(`dance-history`, { uid : props.userInfo.uid})
        .then(response => {
            if(response.success == true){
                setLoader(false)
                setDanceInfo(response.data)
            }
        })
    })
    return(
        <section className="dance-history-section">
            <Header title="Dance history" onBack={() => props.history.push('/profile')}/>
            <Container className="dance-history-container">
                {loader ? 'Loading...' : <>{
                    Object.keys(danceInfo).map((date, dateIndex) => (<div key={dateIndex} className="dance-history-item-wrapper">
                            <h3 className="heading2 heading">{moment(date, 'DD-MM-YYYY').format('DD MMM')}</h3>
                            {
                                danceInfo[date].map((dance, danceIndex) => moment().diff(moment(date, 'DD-MM-YYYY')) > 0 ? <DanceHistoryCard key={danceIndex} dance={dance}/> : <DanceAlert dance={dance} />)
                            }
                    </div>))}
                    {
                        <div className="end-wrapper textCenter">
                            <img src={`${imageBasePath}dance_group.svg`}/>
                            <p className="paragraph">This is not the end, my friend</p>
                        </div>
                    }
                    
                    </>
                }
            </Container>
        </section>
    )
}
const mapStateToProps = state => ({
    userInfo: state.sharedReducers.userInfo
})
export default connect(mapStateToProps, null)(DanceHistory)