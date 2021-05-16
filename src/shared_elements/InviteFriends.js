import React, { useState, useEffect } from 'react'
import ShareDialog from './ShareDialog'
export default function InviteFriends(props){
    const [openShareDialog, setOpenShareDialog] = useState(false)

    const handleInviteClick = () => {
        if (navigator.share) {
            navigator.share({
              title: document.title,
              text: "Learn Dance & Zumba from the comfort of your home through Letzdance Online Live Dance Classes.  Have fun while you get fit through interactive Live Classes on Zoom.",
              url: `https://letzdance.co/`
            })
            .then(() => console.log('Successful share'))
            .catch(error => console.log('Error sharing:', error));
        }else{
            setOpenShareDialog(true)
        }
    }
    useEffect(() => {
        setOpenShareDialog(false)
    }, [])
    return(
        <>
        <div className="invite-friends-blk">
            <div className="inner-wrapper">
                <h3 className="heading3">Know someone who can dance with you?</h3>
                <p className="paragraph">Challenge someone to fitness!</p>
                <button className="primaryBtn" onClick={handleInviteClick}>INVITE FRIENDS</button>
            </div>
        </div>
        <ShareDialog
            open={openShareDialog}
            handleClose={() => setOpenShareDialog(false)}
        />
        </>
    )
}