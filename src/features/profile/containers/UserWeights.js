import React, { useState, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core';
import { Header } from '../../../shared_elements';
import { globalGetService, globalDeleteService } from '../../../utils/globalApiServices';
import '../../../assets/styles/user-weights-module.scss'
import { imageBasePath } from '../../../constants';
import { Shimmer } from '../components'
import moment from 'moment'
import { toastFlashMessage } from '../../../utils';

export default function UserWeights(props){
    const [weightLog, setWeightLog] = useState('')
    const [weightGoal, setWeightGoal] = useState('')
    const [loader, setLoader] = useState(true)
    const [deleteLoader, setDeleteLoader] = useState(false)

    const fetchWeightLogs = () => {
        setLoader(true)
        globalGetService(`weightLog?sortBy=date&OrderBy=desc`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                setWeightLog(response.data)
            }else{
                setWeightLog([])
            }
        })
    }

    useEffect(() => {
        fetchWeightLogs()
        if(props.location.state && props.location.state.weightGoal){
            // setWeightGoal(props.location.state.weightGoal)
        }
    }, [])
    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push(`/user-subscriptions`)
        }
    }
    const deleteWeightLog = (id) => {
        if(window.confirm(`Are you sure you want to delete ?`)){
            setDeleteLoader(true)
            globalDeleteService(`weightLog`, {weightLogID: id})
            .then(response => {
                setDeleteLoader(false)
                if(response.success == true){
                    fetchWeightLogs()
                    toastFlashMessage(`Weight deleted successfully`, 'success')
                }else if(response.message && !response.success){
                    toastFlashMessage(response.message, 'error')
                }
            })
        }
    }
    return(
        <section className="user-weights-section">
            <Header title="Weight log" onBack={handleGoBack}/>
            <Container className="user-weights-container">
                {
                    loader ? <Shimmer type="user-weights"/> : ((weightLog && weightLog.length) || weightGoal) ? <Grid container className="weightLogs-lsiting">
                        {
                            weightLog && weightLog.length ? weightLog.map((item, index) => <WeightLogItem isLastItem={(weightLog.length == 1) ? true : false} deleteLoader={deleteLoader} key={index} data={item} deleteWeightLog={deleteWeightLog}/>): null
                        }
                        {/* {
                            (weightGoal && weightGoal.length) ? <Grid item xs={12}>
                                <div className="weight-log-item">
                                    <h3 className="heading2">{`${weightGoal[0].currentWeight ? weightGoal[0]?.currentWeight : '--'}Kg`}</h3>
                                    <p className="paragraph date">{moment(weightGoal.createdAt).format(`DD MMM YYYY`)}</p>
                                    <img src={`${imageBasePath}close_icon.svg`} className="closeIcon" />
                                </div>
                            </Grid> : null
                        } */}
                    </Grid> : <div className="noResultFound">
                        <img src={`${imageBasePath}dance_group.svg`}/>
                        <p className="paragraph">{`This is not the end, my friend`}</p>
                    </div>
                }
            </Container>
        </section>
    )
}

function WeightLogItem(props){
    const { data, isLastItem, deleteLoader } = props
    return(
        <Grid item xs={12}>
            <div className="weight-log-item">
                <h3 className="heading2">{data.weight}Kg</h3>
                <p className="paragraph date">{moment(data.createdAt).format(`DD MMM YYYY`)}</p>
                <img src={`${imageBasePath}close_icon.svg`} className={`closeIcon ${(isLastItem || deleteLoader) ? 'disabled' : ''}`} onClick={() => props.deleteWeightLog(data._id)} alt=""/>
            </div>
        </Grid>
    )
}