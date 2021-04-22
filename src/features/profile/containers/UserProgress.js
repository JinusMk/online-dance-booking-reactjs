import React from 'react'
import { Header } from '../../../shared_elements';

export default function UserProgress(props){
    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push('/user-subscriptions')
        }
    }
    return(
        <section className="user-progress-section">
            <Header title="Your progress" onBack={handleGoBack}/>
        </section>
    )
}