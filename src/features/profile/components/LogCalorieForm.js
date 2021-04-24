import React, {useState, useEffect} from 'react'
import { globalPostService } from '../../../utils/globalApiServices';
import { TextField } from '@material-ui/core';
import { toastFlashMessage } from '../../../utils';

export default function LogCalorieForm(props){
    const [loader, setLoader] = useState(false)
    const [calories, setCalories] = useState('')
    const [error, setError] = useState({})

    useEffect(() => {
        if(props.open){
            setLoader(false)
            setCalories('')
            setError({})
        }
    }, [props.open])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)

        let validateNewInput = {
            calories : calories ? '' : 'ENTER CALORIES'
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            const formData = {
                date : new Date(),
                calories
            }
            globalPostService(`calorie`, formData)
            .then(response => {
                setLoader(false)
                if(response.success === true){
                    toastFlashMessage('Calories added successfully', 'success')
                    props.handleClose()
                    props.updateCalorieGraph()
                }
            })
        }else{
            setLoader(false)
            setError(validateNewInput)
        }
    }
    const handleChange = (e) => {
        setCalories(e.target.value)
        setError({calories: ''})
    }
    return(
        <form onSubmit={handleSubmit} className="log-calories-form">
            <h3 className="heading2">{`Log calories`}</h3>
            <div className="inputGroup">
                    <label className={error.calories ? 'error': ''}>{error.calories ? error.calories : 'CALORIES'}</label>
                    <TextField 
                        value={calories}
                        onChange={handleChange}
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