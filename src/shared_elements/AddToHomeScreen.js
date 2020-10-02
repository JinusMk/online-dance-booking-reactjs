import React from 'react'

export default function AddToHomeScreen(props){
    const addToHomeScreen = () => {
        console.log('addToHomeScreen clicked')
    }
    return(
        <div className="add-to-home-screen-blk">
            <div className="add-to-home-screen-wrapper">
                <h3 className="heading3">Access Letzdance right from your homescreen</h3>
                <p className="paragraph">This will add a shortcut icon on your homescreen</p>
                <button className="secondaryBtn" onClick={addToHomeScreen}>ADD TO HOMESCREEN</button>
            </div>
        </div>
    )
}