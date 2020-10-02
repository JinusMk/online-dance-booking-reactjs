import React, { useEffect, useState } from 'react'
import { Snackbar, Slide } from '@material-ui/core';
import { connect } from 'react-redux'

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

function ToastNotify(props){
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    useEffect(() => {
        if(props.toastLists.length){
            setOpen(true)
        }else{
            setOpen(false)
        }
    }, [props.toastLists.length])
    return(
        <div className={`custom-toast-wrapper ${props.toastLists.length ? props.toastLists[0].toastType : ''}`}>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                message={<div className={`toast-message ${props.toastLists.length ? props.toastLists[0].toastType : ''}`}>
                    <p className="paragraph">
                        {props.toastLists.length ? <><img src={require(`../assets/images/toast_icon_${props.toastLists[0].toastType}.svg`)}/>
                        <span>{props.toastLists[0].message}</span>
                        </> : null}
                    </p>
                </div>}
                key={"custom-snackbar"}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={4000}
            />
        </div>
    )
}
const mapStateToProps = state => ({
    toastLists: state.sharedReducers.toastLists,
  });
export default connect(mapStateToProps)(ToastNotify)