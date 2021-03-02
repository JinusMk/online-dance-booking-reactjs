import React, {useState} from 'react'
import { imageBasePath } from '../../../constants';
import { Avatar, SwipeableDrawer } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import moment from 'moment'

export default function ReviewCard(props){
    const { review } = props
    const [state, setState] = useState({
        bottom: false,
        right: false
    })
    const [openDetail, setOpenDetail] = useState(false)
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpenDetail(false)
        setState({ ...state, [anchor]: open });
    };
    return(
        <>
        <ReviewInfo {...props} handleOpen={() => setOpenDetail(true)}/>

        {[isMobile ? 'bottom': 'right'].map((anchor) => (
            <SwipeableDrawer
                key={anchor}
                anchor={anchor}
                open={openDetail}
                onClose={toggleDrawer(anchor, false)}
                className={`custom-drawer review ${props.page == "detail" ? 'dance-detail' : ''}`}
                onOpen={(e) => e.preventDefault()}
            >
                <div className={`auth-popup-wrapper review`}>
                    <div className="line"></div>
                    <h3 className="heading2">Review</h3>
                    <ReviewInfo {...props} type="detail"/>
                </div>
                {
                    props.page == "detail" ? null : <div className="footer-review-card">
                        <Link to={review.category_id ? `/dance/${review.category}` : '/schedule'} onClick={() => sessionStorage.setItem('categoryId', review.category_id)} className="primaryBtn">{`Book ${review.category} class`.toUpperCase()}</Link>
                    </div>
                }
            </SwipeableDrawer>
        ))}
        </>
    )
}

function ReviewInfo(props){
    const { review, type, handleOpen } = props
    return(
        <div className={`review-card ${review.media ? 'video': ''}`} onClick={(e) => (props.type == "detail" || props.page == "detail") ? e.preventDefault() : handleOpen()}>
            <div className="content-block">
                {review.media ? null : <>
                    <div className="img-block">
                        <img src={`${imageBasePath}quote_icon.svg`} className="quote-icon"/>
                        <p className="star-icon-wrapper">
                            <img src={`${imageBasePath}star_icon.svg`} />
                            <span className="heading3">{review.rating}</span>
                        </p>
                    </div>
                    <p className="paragraph text">{(props.type != "detail" && review.description.length > 160) ? `${review.description.slice(0,155)}...` : review.description}</p>
                    {(props.type == "detail" || review.description.length < 160) ? null : <p className="paragraph read-more" onClick={handleOpen}>
                        <span>Read more</span>
                        <img src={`${imageBasePath}right_arrow_icon.svg`}/>
                    </p>
                    }
                    </>
                }
            </div>
            <div className="user-info">
                {review.img ? <Avatar src={review.img} className="user-avatar" /> : <Avatar className="user-avatar">{review.name ? review.name[0]: 'L'}</Avatar>}
                <div className="name-wrapper">
                    <h3 className="heading3">{review.reviwed_by}</h3>
                    <p>Took <span style={{textTransform: 'capitalize'}}>{review.category}</span> class on {moment(review.class_date, 'DD-MM-YYYY').format('DD MMM YYYY')}</p>
                </div>
            </div>
        </div>
    )
}