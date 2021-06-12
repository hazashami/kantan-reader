import React from 'react';



const Page = ({viewedPage}) => {
    
    return (
        <div className="page">
            { viewedPage ? viewedPage : "nothin here yet!"}
        </div>
    )
}

export default Page;