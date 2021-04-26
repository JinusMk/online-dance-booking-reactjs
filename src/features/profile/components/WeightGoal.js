import React, { useState, useEffect } from 'react'
import { globalPostService, globalPutService } from '../../../utils/globalApiServices';
import { TextField } from '@material-ui/core';
import { toastFlashMessage } from '../../../utils';

export default function WeightGoal(props){
    const { type, open } = props
    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState({})
    // const [formWidth, setFormWidth] = useState(0)

    useEffect(() => {
        if(open){
            // getClientWidth()
            setError({})
        }
        if(type == "setWeightGoal"){
            setFormData({
                goalWeight: '',
                currentWeight: ''
            })
        }else if(type == "logWeight"){
            setFormData({
                weight: ''
            })
        }else if(type == "editWeightGoal"){
            setFormData({
                goalWeight: ""
            })
        }else{
            setFormData({})
        }
    }, [open, type])
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
        setError({
            ...error,
            [key]: ''
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setLoader(true)
        if(type == "setWeightGoal"){
            let validateNewInput = {
                goalWeight: formData.goalWeight ? '' : 'ENTER GOAL WEIGHT',
                currentWeight: formData.currentWeight ? '' : "ENTER CURRENT WEIGHT"
            }
            if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
                const formDataNew = {
                    goalWeight: formData.goalWeight,
                    currentWeight: formData.currentWeight
                }
                globalPostService(`weightGoal`, formDataNew)
                .then(response => {
                    setLoader(false)
                    if(response.success == true){
                        toastFlashMessage(`WIEGHT GOAL SET SUCCESSFULLY`, 'success')
                        props.handleClose()
                        props.forceUpdateData()
                    }
                })
            }else{
                setLoader(false)
                setError(validateNewInput)
            }
        }else if(type == "logWeight"){
            let validateNewInput = {
                weight: formData.weight ? '' : 'ENTER WEIGHT'
            }
            if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
                var date = new Date();
                // date.setDate(date.getDate() - 1);

                const formDataNew = {
                    weight: formData.weight,
                    date: date
                }
                globalPostService(`weightLog`, formDataNew)
                .then(response => {
                    setLoader(false)
                    if(response.success == true){
                        toastFlashMessage(`WEIGHT LOGGED`, 'success')
                        props.handleClose()
                        props.forceUpdateData()
                    }
                })
            }else{
                setLoader(false)
                setError(validateNewInput)
            }
        }else if(type == "editWeightGoal"){
            let validateNewInput = {
                goalWeight: formData.goalWeight ? '' : 'ENTER GOAL WEIGHT',
            }
            if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
                const formDataNew = {
                    goalWeight: formData.goalWeight,
                    currentWeight: props.currentWeight
                }
                globalPutService(`weightGoal`, formDataNew)
                .then(response => {
                    if(response.success == true){
                        toastFlashMessage(`WEIGHT GOAL UPDATED SUCCESSFULLY`, 'success')
                        props.handleClose()
                        props.forceUpdateData()
                    }
                })
            }else{
                setLoader(false)
                setError(validateNewInput)
            }
        }else{
            setLoader(false)
        }
    }
    // const getClientWidth = () => {
    //     const width = document.getElementById('WeightGoal-form').clientWidth + 32
    //     setFormWidth(width)
    // }
    return(
        <form onSubmit={handleSubmit} id="WeightGoal-form" className={`WeightGoal-form ${props.type}`}>
            {
                type == "setWeightGoal" ? <>
                    <h3 className="heading2 form-title">{`Log calories`}</h3>
                    <div className="inputGroup">
                        <label className={error.goalWeight ? 'error': ''}>{error.goalWeight ? error.goalWeight : 'GOAL WEIGHT IN KG'}</label>
                        <TextField 
                            value={formData.goalWeight}
                            onChange={(e) => handleChange('goalWeight', e.target.value)}
                            placeholder="Weight"
                            type={`number`}
                            error={error.goalWeight ? true : false}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label className={error.currentWeight ? 'error': ''}>{error.currentWeight ? error.currentWeight : 'CURRENT WEIGHT IN KG'}</label>
                        <TextField 
                            value={formData.currentWeight}
                            onChange={(e) => handleChange('currentWeight', e.target.value)}
                            placeholder="Weight"
                            type={`number`}
                            error={error.currentWeight ? true : false}
                            required
                        />
                    </div>
                    <p className="alert paragraph">Enter values as recorded by your weighing scale</p>
                </> : type == "logWeight" ? <>
                    <h3 className="heading2 form-title">{`Log weight`}</h3>
                    <div className="inputGroup">
                        <label className={error.weight ? 'error': ''}>{error.weight ? error.weight : 'WEIGHT IN KG'}</label>
                        <TextField 
                            value={formData.weight}
                            onChange={(e) => handleChange('weight', e.target.value)}
                            placeholder="Weight"
                            type={`number`}
                            error={error.weight ? true : false}
                            required
                        />
                    </div>
                </> : type == "editWeightGoal" ? <>
                    <h3 className="heading2 form-title">{`Edit weight goal`}</h3>
                    <div className="inputGroup">
                        <label className={error.goalWeight ? 'error': ''}>{error.goalWeight ? error.goalWeight : 'GOAL WEIGHT IN KG'}</label>
                        <TextField 
                            value={formData.goalWeight}
                            onChange={(e) => handleChange('goalWeight', e.target.value)}
                            placeholder="Weight"
                            type={`number`}
                            error={error.goalWeight ? true : false}
                            required
                        />
                    </div>
                    <p className="alert paragraph">Enter values as recorded by your weighing scale</p>
                </> : null
            }
            <div className="footer">
                <p><a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={handleSubmit}>{`SAVE`}</a></p>
            </div>
        </form>
    )
}