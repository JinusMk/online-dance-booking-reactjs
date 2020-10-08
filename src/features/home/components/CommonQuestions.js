import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { imageBasePath } from '../../../constants';

const commonQuestions = [
    { que: 'Do you have trial classes?', ans: 'Yes, we have trial for every Dance form. The trial session is for 1 hr. The same can be taken by booking your slots under upcoming classes or the schedule page.'},
    { que: 'What is Zoom app?', ans: 'Zoom is an online video conferencing application that is being used for conducting online dance sessions. It can be downloaded on mobile or laptop. Once downloaded the link that we share works, that doesn’t need any password.'},
    { que: 'Is the class suitable for a beginner?', ans: 'Yes, the classes are carefully curated so that it suits every level of dancer. As long as you have the spirit to dance, we welcome everyone.'},
    { que: 'What device and internet connectivity is required?', ans: 'We recommend a laptop or desktop but if you are using a mobile, it must be placed at least 3 ft distance from you so that the instructor can see you dance and correct the steps. The bandwidth of a broadband or a 4G that supports a video call in WhatsApp or Skype will be enough to use the Zoom app.'},
    { que: 'Is it suitable for kids?', ans: 'Yes, the classes are suitable for kids. We have separate batches for Kids.'},
]

export default function CommonQuestions(props){
    return(
        <div className="common-questions-blk">
            <h3 className="heading2 title">Common Questions</h3>
            {
                commonQuestions.map((item, index) => <Accordion key={index} className="common-questions-accordion">
                    <AccordionSummary
                        expandIcon={<img src={`${imageBasePath}expand_more_icon.svg`}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <h3 className="heading3">{item.que}</h3>
                    </AccordionSummary>
                    <AccordionDetails><p className="paragraph">{item.ans}</p></AccordionDetails>
                </Accordion>)
            }
        </div>
    )
}