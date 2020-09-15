import React, { Component } from 'react'
import { Grid, Container } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom'
import { Header, BottomNavigation } from '../shared_elements';
// import { Header, Footer, SideBar } from '../shared_elements';

class ErrorBoundary extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('error, errorInfo',[error, errorInfo])
        // You can also log the error to an error reporting service
        this.setState({
            hasError: true
        })
    }

    componentWillReceiveProps(){
        if(this.state.hasError){
            return
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className="errorBoundary flexCentered backgroundProp">
                    <Header/>
                    <Container fixed>
                        <Grid container justify="center" alignItems="center" spacing={2}>
                            <Grid item xs={12} className="textCenter">
                                <img src={require('../assets/images/technical_error.svg')}/>
                                <h3 className="heading3">Technical error is inevitable</h3>
                                <Link to="/" onClick={() => this.setState({hasError: false})} className="primaryBtn">RETRY</Link>
                            </Grid>
                        </Grid>
                    </Container>
                    <BottomNavigation/>
                </section>
            )
        }else{
            return this.props.children;
        }
    }
}
export default withRouter(ErrorBoundary)