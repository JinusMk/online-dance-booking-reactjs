import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, TextField, ListItem, List } from '@material-ui/core';
import { toastFlashMessage } from '../utils';
import { 
    EmailShareButton, 
    FacebookShareButton, 
    // LinkedinShareButton, 
    WhatsappShareButton,
    PinterestShareButton,
    TwitterShareButton,
    // TelegramShareButton,
    // TelegramIcon,
    FacebookIcon,
    TwitterIcon,
    // LinkedinIcon,
    WhatsappIcon,
    PinterestIcon,
    EmailIcon
 } from 'react-share'

export default function ShareDialog(props){
    const { open } = props
    const [ size ] = useState(40)
    const [ borderRadius ] = useState(8)
    const [ title ] = useState(`Learn Dance online, Zumba, Live Classes`)
    const [ url, setUrl ] = useState(props.url)
    const [ description ] = useState(`Learn Dance & Zumba from the comfort of your home through Letzdance Online Live Dance Classes.  Have fun while you get fit through interactive Live Classes on Zoom.`)

    const handleCopy = () => {
        var copyText = document.getElementById("myInput");
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        toastFlashMessage('COPIED TO YOUR CLIPBOARD', 'success')
    }
    useEffect(() => {
        setUrl(props.url)
    }, [props.url])
    return(
        <Dialog
            open={open}
            aria-labelledby="responsive-dialog-title"
            // maxWidth="xs"
            onClose={props.handleClose}
            fullWidth={true}
            id="shareModal"
            className="share-link-dialog custom-dialog"
        >
            <DialogContent className="content-wrapper">
                <div className="inputGroup">
                    <TextField 
                        id="myInput"
                        value={url}
                    />
                    <p className="copyBtn primaryBtn">
                        <a onClick={handleCopy}>Copy</a>
                    </p>
                </div>
                <div className="share-buttons-list">
                        <EmailShareButton 
                            subject={title}
                            body = {description}
                            separator=":: "
                            url={url}
                        >
                            <EmailIcon
                                size={size}
                                borderRadius={borderRadius}
                            />
                        </EmailShareButton>
                        <FacebookShareButton 
                            quote={title}
                            url={url}
                        >
                            <FacebookIcon
                                size={size}
                                borderRadius={borderRadius}
                            />
                        </FacebookShareButton>
                        <TwitterShareButton 
                            title={title}
                            url={url}
                        >
                            <TwitterIcon
                                size={size}
                                borderRadius={borderRadius}
                            />
                        </TwitterShareButton>
                        <WhatsappShareButton
                            title={title}
                            separator=":: "
                            url={url}
                        >
                            <WhatsappIcon 
                                size={size} 
                                borderRadius={borderRadius}
                            />
                        </WhatsappShareButton>
                        {/* <LinkedinShareButton
                            title={title}
                            summary={description}
                            windowWidth={750}
                            windowHeight={600}
                            source="Letzdance"
                        >
                            <LinkedinIcon
                                size={size}
                            />
                        </LinkedinShareButton> */}
                        {/* <TelegramShareButton
                            title={title}
                        >
                            <TelegramIcon
                                size={size}
                                borderRadius={borderRadius}
                            />
                        </TelegramShareButton> */}
                        <PinterestShareButton
                            url={url}
                            media={`https://letzdance-fe.s3.us-east-2.amazonaws.com/meta_image.png`}
                            windowWidth={1000}
                            windowHeight={730}
                        >
                            <PinterestIcon 
                                size={size} 
                                borderRadius={borderRadius}
                            />
                        </PinterestShareButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}