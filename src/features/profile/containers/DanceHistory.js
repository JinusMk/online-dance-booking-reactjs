import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import { DanceHistoryCard, DanceHistoryLoader } from '../components'
import moment from 'moment'
import { DanceAlert, Header } from '../../../shared_elements';
import { globalGetService } from '../../../utils/globalApiServices';
import '../../../assets/styles/dance-history-module.scss'
import { imageBasePath } from '../../../constants';
import { connect } from 'react-redux'

function DanceHistory(props){
    const [loader, setLoader] = useState(true)
    const [dances, setDances] = useState({})
    
    useEffect(() => {
        if(props.userInfo && props.userInfo.uid){
            globalGetService(`dance-history`, { uid : props.userInfo.uid})
            .then(response => {
                if(response.success == true){
                    setDances(response.data)
                    setLoader(false)
                }
            })
        }
    }, [props.userInfo])
    const checkIsFinished = (date1, date2=moment()) => {
        var b = moment(date1).utc();
        var a = moment(date2);
        var mins = a.diff(b, 'minutes')
        
        return mins > 0 ? true : true
    }
    return(
        <section className="dance-history-section">
            <Header title="Dance history" onBack={() => props.history.push('/profile')}/>
            <Container className="dance-history-container">
                {loader ? <DanceHistoryLoader /> : <>{
                    Object.keys(dances).map((date, dateIndex) => (<div key={dateIndex} className="dance-history-item-wrapper">
                            <h3 className="heading2 heading">{moment(date, 'DD-MM-YYYY').format('DD MMM')}</h3>
                            {
                                dances[date].map((dance, danceIndex) => checkIsFinished(dance.class_booked_end_time) ? <DanceHistoryCard key={danceIndex} dance={dance}/> : <DanceAlert dance={dance} />)
                            }
                    </div>))}
                    {
                        <div className="end-wrapper textCenter">
                            <img src={`${imageBasePath}dance_group.svg`}/>
                            <p className="paragraph">{`This is not the end, my friend`}</p>
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