import { useState } from "react"
import Search from "./search"
import UserList from "./userlist"


function Sidebar(){
    const[searchKey,setSearchKey]=useState('')
    return(
        <div className="app-sidebar">
            <Search  searchKey={searchKey}
            setSearchKey={setSearchKey} />

    {/* <!--SEARCH USER-->
    <!--USER LIST--> */}
    <UserList searchKey={searchKey}/>


</div>

    )
}


export default Sidebar