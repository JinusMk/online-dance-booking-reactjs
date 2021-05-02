import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { globalPostService } from '../../../utils/globalApiServices';
import { TextField } from '@material-ui/core';
import { toastFlashMessage } from '../../../utils';
import { DatePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment';

export default function LogCalorieForm(props){
    let params = useParams()
    const [loader, setLoader] = useState(false)
    const [calories, setCalories] = useState('')
    const [formData, setFormData] = useState({
        calories: '',
        date: new Date()
    })
    const [error, setError] = useState({})
    const [danceClasses, setDanceClasses] = useState([])

    useEffect(() => {
        if(props.open){
            setLoader(false)
            setCalories('')
            setError({})
        }
    }, [props.open])

    useEffect(() => {
        globalPostService(`subscription/danceClasses`, { userSubscriptionId: params.subscriptionId })
        .then(response => {
            if(response.success == true){
                setDanceClasses(response.data)
            }
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)

        let validateNewInput = {
            calories : formData.calories ? '' : 'ENTER CALORIES'
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            const formDataNew = {
                date : formData.date ? formData.date : new Date(),
                calories: formData.calories,
                userSubscriptionID: params.subscriptionId
            }
            globalPostService(`calorie`, formDataNew)
            .then(response => {
                setLoader(false)
                if(response.success === true){
                    toastFlashMessage('CALORIES LOGGED', 'success')
                    props.handleClose()
                    props.updateCalorieGraph()
                }
            })
        }else{
            setLoader(false)
            setError(validateNewInput)
        }
    }
    const handleChange = (key, value) => {
        setFormData({
            [key] : value
        })
        setError({
            ...error,
            [key]: ''
        })
    }
    const disableDays = (date) => {
        if(danceClasses.find(danceClass => moment(danceClass.date).format(`MM/DD/YYYY`) == moment(date).format(`MM/DD/YYYY`))){
            return false
        }else if(moment(date).format(`DD/MMM/YYYY`) == moment().format(`DD/MMM/YYYY`)){
            return false
        }else {
           return true
        }
    }
    return(
        <form onSubmit={handleSubmit} className="log-calories-form" id="log-calories-form">
            <h3 className="heading2 form-title">{`Log calories`}</h3>
            <div className="inputGroup">
                <label className={error.date ? 'error': ''}>{error.date ? error.date : 'DATE'}</label>
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <DatePicker
                        autoOk
                        disableToolbar
                        variant="inline"
                        disableFuture
                        // label="Only calendar"
                        // helperText="No year selection"
                        value={formData.date}
                        format={`DD MMM YYYY`}
                        disableToolbar
                        className="custom-datepicker"
                        onChange={(newDate) => handleChange('date', newDate)}
                        shouldDisableDate={disableDays}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div className="inputGroup">
                <label className={error.calories ? 'error': ''}>{error.calories ? error.calories : 'CALORIES'}</label>
                <TextField 
                    value={formData.calories}
                    onChange={(e) => handleChange('calories', e.target.value)}
                    placeholder="Calories"
                    type={`number`}
                    error={error.calories ? true : false}
                    required
                />
            </div>
            <p className="alert paragraph">Enter values as recorded by your fitness band or smart watch</p>
            <div className="footer">
                <p><a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={handleSubmit}>{`SAVE`}</a></p>
            </div>
        </form>
    )
}