import React from 'react'
import { Header, BottomNavigation } from '../shared_elements';
import { useHistory, useLocation } from "react-router-dom";

export default function pageLayoutHoc(HocComponent, extraProps={}){
    function PageLayout(){
        let location = useLocation();
        return(
            <>
                <Header title={extraProps.title ? extraProps.title : ''} onBack={extraProps.onBack ? extraProps.onBack : null}/>
                <main>
                    <HocComponent />
                </main>
                <BottomNavigation />
            </>
        )
    }
    return PageLayout
}