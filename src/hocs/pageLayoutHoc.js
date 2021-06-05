import React from 'react'
import { Header, BottomNavigation } from '../shared_elements';

export default function pageLayoutHoc(HocComponent, extraProps={}){
    function PageLayout(props){
        return(
            <>
                <Header title={extraProps.title ? extraProps.title : ''} onBack={extraProps.onBack ? extraProps.onBack : null} isHoc={true}/>
                <main>
                    <HocComponent {...props}/>
                </main>
                <BottomNavigation />
            </>
        )
    }
    return PageLayout
}