import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import { DanceHistoryCard, DanceHistoryLoader } from '../components'
import moment from 'moment'
import { DanceAlert, Header } from '../../../shared_elements';
import { globalGetService } from '../../../utils/globalApiServices';
import { checkIsFinished, toastFlashMessage } from '../../../utils';
import { imageBasePath } from '../../../constants';
import '../../../assets/styles/dance-history-module.scss'

function DanceHistory(props){
    const [loader, setLoader] = useState(true)
    const [dances, setDances] = useState({})
    
    useEffect(() => {
        globalGetService(`dance-history`)
        .then(response => {
            if(response.success == true){
                setDances(response.data)
                setLoader(false)
            }else if(response.message && !response.success){
                toastFlashMessage(response.message, 'error')
            }else if(response.error){
                toastFlashMessage(response.error, 'error')
            }
        })
    }, [props.userInfo])
    
    return(
        <section className="dance-history-section">
            <Header title="Dance history" onBack={() => props.history.push('/profile')}/>
            <Container className="dance-history-container">
                {loader ? <DanceHistoryLoader /> : <>{
                    Object.keys(dances).map((date, dateIndex) => (<div key={dateIndex} className="dance-history-item-wrapper">
                            <h3 className="heading2 heading">{moment().format('DD-MM-YYYY') == date ? 'Today' : moment(date, 'DD-MM-YYYY').format('DD MMM')}</h3>
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
export default DanceHistory