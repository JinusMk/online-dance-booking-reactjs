import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const commonQuestions = [
    {que: 'How does the online dance class happen?', ans: 'Once you register, we share the welcome mail as a booking confirmation and share the Zoom video conferencing link one hour before the class through mail and Whatsapp (if no: given supports). The instructor and the students connect through the given class link.'},
    {que: 'What is Zoom app?', ans: 'Once you register, we share the welcome mail as a booking confirmation and share the Zoom video conferencing link one hour before the class through mail and Whatsapp (if no: given supports). The instructor and the students connect through the given class link.'},
    {que: 'Is the class suitable for a beginner?', ans: 'Once you register, we share the welcome mail as a booking confirmation and share the Zoom video conferencing link one hour before the class through mail and Whatsapp (if no: given supports). The instructor and the students connect through the given class link.'},
    {que: 'What device and internet connectivity is required?', ans: 'Once you register, we share the welcome mail as a booking confirmation and share the Zoom video conferencing link one hour before the class through mail and Whatsapp (if no: given supports). The instructor and the students connect through the given class link.'},
    {que: 'Is it suitable for kids?', ans: 'Once you register, we share the welcome mail as a booking confirmation and share the Zoom video conferencing link one hour before the class through mail and Whatsapp (if no: given supports). The instructor and the students connect through the given class link.'},
]

export default function CommonQuestions(props){
    return(
        <div className="common-questions-blk">
            <h3 className="heading2 title">Common Questions</h3>
            {
                commonQuestions.map((item, index) => <Accordion key={index} className="common-questions-accordion">
                    <AccordionSummary
                        expandIcon={<img src={require('../../../assets/images/expand_more_icon.svg')}/>}
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