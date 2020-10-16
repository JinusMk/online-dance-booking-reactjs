import React from 'react'
import { Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { Header, BottomNavigation } from './shared_elements';
import { imageBasePath } from './constants';

export default function Page404(props){
    return(
        <section className="errorBoundary flexCentered backgroundProp 404">
            <Header/>
            <Container fixed>
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} className="textCenter">
                        <img src={`${imageBasePath}dancing_emoji.svg`}/>
                        <h3 className="heading3">Oops! Seems like you took a mis-step</h3>
                        <Link to="/" className="primaryBtn">BACK TO HOME</Link>
                    </Grid>
                </Grid>
            </Container>
            <BottomNavigation/>
        </section>
    )
}