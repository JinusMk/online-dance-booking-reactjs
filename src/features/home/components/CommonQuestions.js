import React, { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Grid  } from '@material-ui/core';
import { imageBasePath } from '../../../constants';

const commonQuestions = [
    { que: 'Do you have trial classes?', ans: 'Yes, we have trial for every Dance form. The trial session is for 1 hr. The same can be taken by booking your slots under upcoming classes or the schedule page.'},
    { que: 'What is Zoom app?', ans: 'Zoom is an online video conferencing application that is being used for conducting online dance sessions. It can be downloaded on mobile or laptop. Once downloaded the link that we share works, that doesn’t need any password.'},
    { que: 'Is the class suitable for a beginner?', ans: 'Yes, the classes are carefully curated so that it suits every level of dancer. As long as you have the spirit to dance, we welcome everyone.'},
    { que: 'What device and internet connectivity is required?', ans: 'We recommend a laptop or desktop but if you are using a mobile, it must be placed at least 3 ft distance from you so that the instructor can see you dance and correct the steps. The bandwidth of a broadband or a 4G that supports a video call in WhatsApp or Skype will be enough to use the Zoom app.'},
    { que: 'Is it suitable for kids?', ans: 'Yes, the classes are suitable for kids. We have separate batches for Kids.'},
]

export default function CommonQuestions(props){
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return(
        <div className="common-questions-blk">
            <h3 className="heading2 title">Common Questions</h3>
            <Grid container spacing={2} className="accordion-outer-wrapper">
            {
                commonQuestions.map((item, index) => <Grid item xs={12} md={6} key={index} className="accrodion-item-wrapper">
                    <div className="accordion-item">
                        <Accordion expanded={expanded == `panel${index+1}` ? true : false} onChange={handleChange(`panel${index+1}`)} className="common-questions-accordion">
                            <AccordionSummary
                                expandIcon={<img src={`${imageBasePath}expand_more_icon.svg`}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <h3 className="heading3">{item.que}</h3>
                            </AccordionSummary>
                        <AccordionDetails><p className="paragraph">{item.ans}</p></AccordionDetails>
                </Accordion></div></Grid>)
            }
            </Grid>
        </div>
    )
}