import React from 'react'
import PostList from '../MyTable/PostList';


function ParentArea({ currentlySelected }) {
    console.log(currentlySelected, "you did good ")

    return (


        < div className="DisplayArea" >
            <h1>{currentlySelected}</h1>
            <PostList currentlySelected={currentlySelected} />
        </div >

    )
}

export default ParentArea
