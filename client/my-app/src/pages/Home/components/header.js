import { useSelector,useDispatch } from "react-redux"

function Header(){
    const {user}=useSelector(state=>state.userReducer)
    console.log(user)

    function getFullname(){
        let fname=user?.firstName.toLowerCase()
        let lname=user?.lastName.toLowerCase()
        return fname+''+lname
    }
    function getIntials(){
        let f=user?.firstName.toUpperCase()[0]
        let l=user?.lastName.toUpperCase()[0]
        return f+l

    }

    return (
        <div className="app-header">
    <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
          Quick Chat
        </div>
    <div className="app-user-profile">
        <div className="logged-user-name">{getFullname()}</div>
        <div className="logged-user-profile-pic">{getIntials()}</div>
    </div>
</div>

    )
}

export default Header