import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core';
import { Header } from '../../../shared_elements';
import '../../../assets/styles/add-review-module.scss'
import { globalGetService } from '../../../utils/globalApiServices';

export default function AddReview(props){
    const [danceInfo, setDanceInfo] = useState({})
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        globalGetService(`dance-classes/${props.match.params.danceId}`, {})
        .then(response => {
            if(response.success == true){
                setDanceInfo(response.data)
                setLoader(false)
            }
        })
    }, [])
    return(
        <section className="add-review-section">
            <Header onBack={() => props.history.push('/dance-history')} title="Review class"/>
            <Container className="add-review-container">

            </Container>
        </section>
    )
}