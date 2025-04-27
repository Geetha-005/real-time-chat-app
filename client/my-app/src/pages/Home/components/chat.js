import { useSelector } from "react-redux"
import { selectedChat } from "../../../redux/userSlice"



function Chat(){
const {selectedChat}=useSelector(state=>state.userReducer)
    return (
        <div>
{selectedChat && <h2>{selectedChat._id}</h2>}
  
        </div>
          )
}

export default Chat