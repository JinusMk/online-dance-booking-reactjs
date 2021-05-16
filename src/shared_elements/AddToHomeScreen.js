import React, { useState, useEffect } from 'react'

export default function AddToHomeScreen(props){
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
          e.preventDefault();
          console.log("we are being triggered :D");
          setSupportsPWA(true);
          setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);
    
        return () => window.removeEventListener("transitionend", handler);
      }, []);

    const addToHomeScreen = (evt) => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    }
    if (!supportsPWA) {
        return null;
    }
    return(
        <div className="add-to-home-screen-blk">
            <div className="inner-wrapper">
                <h3 className="heading3">Access Letzdance right from your homescreen</h3>
                <p className="paragraph">This will add a shortcut icon on your homescreen</p>
                <button className="primaryBtn" onClick={addToHomeScreen}>ADD TO HOMESCREEN</button>
            </div>
        </div>
    )
}