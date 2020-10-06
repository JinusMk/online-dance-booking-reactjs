import React, { useState } from 'react'
import { Container } from '@material-ui/core';
import { DanceHistoryCard } from '../components'
import moment from 'moment'
import { DanceAlert, Header } from '../../../shared_elements';
import '../../../assets/styles/dance-history-module.scss'

export default function DanceHistory(props){
    const [dances, setDances] = useState({
        [moment()] : [{id: 1, img: require('../../../assets/images/zumba_logo_card.svg'),title: 'Zumba', isFinished: false}],
        [moment().subtract(2, 'day')]: [{id: 1, img: require('../../../assets/images/bollywood_logo_card.svg'),title: 'Bollywood', isFinished: true, review: 4.5, time: '10.00 AM'}, {id: 1, img: require('../../../assets/images/zumba_logo_card.svg'),title: 'Zumba', isFinished: true, time: '6.00 PM'}],
        [moment().subtract(4, 'day')]: [{id: 1, img: require('../../../assets/images/bollywood_logo_card.svg'),title: 'Bollywood', isFinished: true, review: null, time: '6.00 PM'}]
    })
    return(
        <section className="dance-history-section">
            <Header title="Dance history" onBack={() => props.history.push('/profile')}/>
            <Container className="dance-history-container">
                {
                    Object.keys(dances).map((item, index) => <div key={index} className="dance-history-item-wrapper">
                        <h3 className="heading2 title">{moment(item).format('DD MMM')}</h3>
                        {
                            dances[item].map((dance, index) => dance.isFinished ? <DanceHistoryCard key={index} date={moment(item).format('DD MMM')} dance={dance}/> : <DanceAlert dance={dance} />)
                        }
                    </div>)
                }
            </Container>
        </section>
    )
}