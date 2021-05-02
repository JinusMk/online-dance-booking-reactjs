import React, { useState, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core';
import { Header } from '../../../shared_elements';
import moment from 'moment'
import { toastFlashMessage } from '../../../utils';
import { globalGetService, globalDeleteService } from '../../../utils/globalApiServices';
import { imageBasePath } from '../../../constants';
import { Shimmer } from '../components'
import '../../../assets/styles/user-calories-module.scss'

export default function UserCalories(props){
    const [userCalories, setUserCalories] = useState('')
    const [loader, setLoader] = useState(true)
    const [deleteLoader, setDeleteLoader] = useState(false)

    const fetchCaloriesApi = () => {
        setLoader(true)
        globalGetService(`calorie/${props.match.params.subscriptionId}`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                setUserCalories(response.data)
            }else{
                setUserCalories([])
            }
        })
    }
    const deleteCalorieApi = (calorieId) => {
        if(window.confirm(`Are you sure you want to delete ?`)){
            setDeleteLoader(true)
            globalDeleteService(`calorie`, { calorieLogID: calorieId})
            .then(response => {
                setDeleteLoader(false)
                if(response.success == true){
                    fetchCaloriesApi()
                    toastFlashMessage(`Calorie deleted successfully`, 'success')
                }else if(response.message && !response.success){
                    toastFlashMessage(response.message, 'error')
                }
            })
        }
    }
    useEffect(() => {
        fetchCaloriesApi()
    }, [])

    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push(`/user-subscriptions`)
        }
    }

    return(
        <section className="user-calories-section">
            <Header title="Calorie log" onBack={handleGoBack}/>
            <Container className="user-calories-container">
                {
                    loader ? <Shimmer type="user-weights"/> : (userCalories && userCalories.length) ? <Grid container className="user-calories-listing">
                        {
                            userCalories && userCalories.length ? userCalories.map((item, index) => <UserCalorieItem deleteLoader={deleteLoader} key={index} data={item} deleteCalorieApi={deleteCalorieApi}/>): null
                        }
                    </Grid> : <div className="noResultFound">
                        <img src={`${imageBasePath}dance_group.svg`}/>
                        <p className="paragraph">{`This is not the end, my friend`}</p>
                    </div>
                }
            </Container>
        </section>
    )
}

function UserCalorieItem(props){
    const { data, deleteLoader } = props
    return(
        <Grid item xs={12}>
            <div className="user-calorie-item">
                <h3 className="heading2">{data.calories}kcal</h3>
                <p className="paragraph date">{moment(data.updatedAt).format(`DD MMM YYYY`)}</p>
                <img src={`${imageBasePath}close_icon.svg`} className={`closeIcon ${deleteLoader ? 'disabled' : ''}`} onClick={() => props.deleteCalorieApi(data._id)} alt=""/>
            </div>
        </Grid>
    )
}