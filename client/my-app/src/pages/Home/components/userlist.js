import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../../APIcalls/chat";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";

function UserList({ searchKey }) {
  const { allUsers, allChats = [], user: currentUser } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const startNewChat = async (searchedUserId) => {
    try {
      dispatch(showLoader());
      const response = await createNewChat([currentUser._id, searchedUserId]);
      dispatch(hideLoader());

      if (response.success) {
        toast.success(response.message);
        const newChat = response.data;
        const updatedChat = [...allChats, newChat];
        dispatch(setAllChats(updatedChat));
         dispatch(setSelectedChat(newChat))


      } else {
        toast.error(response.message || "Failed to create chat");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      dispatch(hideLoader());
    }
  };

   const openChat=(selectedUserId)=>{
    const chat=allChats.find(chat=>chat.members.includes(currentUser._id)
  && chat.members.includes(selectedUserId)
)
if(chat){
  dispatch(setSelectedChat(chat))
}

   }

  // Safely get users array
  const usersArray = allUsers?.data || [];

  // Filter users who already have chats
  const usersWithExistingChats = usersArray.filter(user =>
    allChats.some(chat => chat?.members?.includes(user._id))
  );

  // Filter users based on search key
  const searchedUsers = usersArray.filter(user => {
    const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.toLowerCase();
    return fullName.includes(searchKey.toLowerCase());
  });

  // Decide which users to display:
  const displayedUsers = searchKey ? searchedUsers : usersWithExistingChats;

  return (
    <div className="user-list-container">
      {searchKey && displayedUsers.length === 0 && (
        <div>No users found.</div>
      )}

      {displayedUsers.length > 0 && displayedUsers.map((user, index) => {
        const existingChat = allChats.find(chat => chat?.members?.includes(user._id));

        return (
          <div className="user-search-filter" key={user._id || index} onClick={()=>openChat(user._id)}>
            
            <div className="filtered-user">

              <div className="filter-user-display">
                <div className="user-default-profile-pic">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>

                <div className="filter-user-details">
                  <div className="user-display-name">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="user-display-email">
                    {user?.email}
                  </div>
                </div>

                {/* Show "Start Chat" button only if no existing chat */}
                {!existingChat && (
                  <div className="user-start-chat">
                    <button
                      className="user-start-chat-btn"
                      onClick={() => startNewChat(user._id)}
                    >
                      Start Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;



// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { createNewChat } from "../../../APIcalls/chat";
// import { hideLoader, showLoader } from "../../../redux/loaderSlice";
// import { setAllChats } from "../../../redux/userSlice";
// function UserList({ searchKey }) {
//   const { allUsers, allChats = [],user:currentUser } = useSelector(state => state.userReducer);
//    const dispatch=useDispatch()
//    const startNewChat = async (searchedUserId) => {
//     try {
//       dispatch(showLoader());
//       const response = await createNewChat([currentUser._id, searchedUserId]);
//       dispatch(hideLoader());
  
//       if (response.success) {
//         toast.success(response.message);
//         const newChat = response.data;
//         const updatedChat = [...allChats, newChat];
//         dispatch(setAllChats(updatedChat));
//       }
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//       dispatch(hideLoader());
//     }
//   };
  
//   // const startNewChat=async(searchedUserId)=>{

//   //   try{
//   //     dispatch(showLoader())
//   //     const response=await  createNewChat([currentUser._id,searchedUserId])
//   //     dispatch(hideLoader())

//   //     if(response.success){
//   //       toast.success(response.message)
//   //       const newChat=response.data
//   //       const updatedChat=[...allChats,newChat]
//   //       dispatch(setAllChats(updatedChat))
//   //     }
//   //   }
//   //   catch(error){
//   //     toast.error(response.message)
//   //     dispatch(hideLoader())
//   //   }
//   // }
//   // Safely get users array
//   const usersArray = allUsers?.data || [];

//   // Filter users based on search key
//   const filteredUsers = usersArray.filter(user => {
//     const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.toLowerCase();
//     return fullName.includes(searchKey.toLowerCase());
//   });

//   return (
//     <div className="user-list-container">
//       {searchKey && filteredUsers.length === 0 && (
//         <div>No users found.</div>
//       )}

//       {searchKey && filteredUsers.length > 0 && filteredUsers.map((user, index) => {
//         const existingChat = allChats.find(chat => chat.members.includes(user._id));

//         return (
//           <div className="user-search-filter" key={index}>
//             <div className="filtered-user">
//               <div className="filter-user-display">
//                 <div className="user-default-profile-pic">
//                   {user?.firstName?.[0]}{user?.lastName?.[0]}
//                 </div>

//                 <div className="filter-user-details">
//                   <div className="user-display-name">
//                     {user?.firstName} {user?.lastName}
//                   </div>
//                   <div className="user-display-email">
//                     {user?.email}
//                   </div>
//                 </div>

//                 {/* Only show Start Chat button if chat does not exist */}
//                 {!existingChat && (
//                   <div className="user-start-chat">
//                     <button className="user-start-chat-btn" onClick={()=>startNewChat(user._id)}>
//                       Start Chat
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }



// import { useSelector } from "react-redux"


// function UserList({searchKey}){
//    const {allUsers}=useSelector((state)=>state.userReducer)
//     return (
//         allUsers.map(user => {
//            return ( <div class="user-search-filter">
//    <div class="filtered-user">
//        <div class="filter-user-display">
//           {/* <img src={user.profilePic} alt="Profile Pic" class="user-profile-image" />  */}
//            <div class="user-default-profile-pic">
//                MJ
//            </div>
//            <div class="filter-user-details">
//                <div class="user-display-name">Mery Jane</div>
//                    <div class="user-display-email">meryjane@gmail.com</div>
//                </div>
//                <div class="user-start-chat">
//                   <button class="user-start-chat-btn">Start Chat</button>
//                </div>
//            </div>
//        </div>                        
//    </div>)

// })

        

//     )}

// export default UserList


// import { useSelector } from "react-redux";

// // function UserList({ searchKey }) {
// //   const {allUsers} = useSelector(state => state.userReducer.allUsers);

// //   console.log("All Users Data:", allUsers);  // ✅ add this for debugging

// //   if (!Array.isArray(allUsers)) {
// //     return <div>No users found.</div>;  // 🚨 Safe check
// //   }

// //   return (
// //     <>
// //       {allUsers.map((user, index) => (
// //         <div className="user-search-filter" >
// //             {/* key={index} */}
// //           <div className="filtered-user">
// //             <div className="filter-user-display">
// //               {/* profile pic */}
// //               <div className="user-default-profile-pic">
// //                 {/* {user?.firstName?.[0]}{user?.lastName?.[0]} */}
// //                 geeta
// //               </div>
// //               <div className="filter-user-details">
// //                 <div className="user-display-name">
// //                   {/* {user?.firstName} {user?.lastName} */}
// //                   chilla
// //                 </div>
// //                 <div className="user-display-email">
// //                   {/* {user?.email} */}
// //                   krishna@gmail.com
// //                 </div>
// //               </div>
// //               <div className="user-start-chat">
// //                 <button className="user-start-chat-btn">Start Chat</button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </>
// //   );
// // }

// function UserList({ searchKey }) {
//     const { data: allUsers = [] } = useSelector(state => state.userReducer.allUsers || {});
  
//     return (
//       <>
//         {allUsers.
//         map((user, index) => (
//           <div className="user-search-filter" key={index}>
//             <div className="filtered-user">
//               <div className="filter-user-display">
//                 <div className="user-default-profile-pic">
//                   {user?.firstName?.[0]}{user?.lastName?.[0]}
//                 </div>
//                 <div className="filter-user-details">
//                   <div className="user-display-name">
//                     {user?.firstName} {user?.lastName}
//                   </div>
//                   <div className="user-display-email">
//                     {user?.email}
//                   </div>
//                 </div>
//                 <div className="user-start-chat">
//                   <button className="user-start-chat-btn">Start Chat</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </>
//     );
//   }
  

// export default UserList;


// import { useSelector } from "react-redux";

// function UserList({ searchKey }) {
//   const { data: allUsers = [] ,allChats} = useSelector(state => state.userReducer.allUsers || {});

//   // Filter users based on search key
//   const filteredUsers = allUsers.filter(user => {
//     const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.toLowerCase();
//     return fullName.includes(searchKey.toLowerCase());
//   });

//   return (
//     <>
//       {filteredUsers.length > 0 ? (
//         filteredUsers.map((user, index) => (
//           <div className="user-search-filter" key={index}>
//             <div className="filtered-user">
//               <div className="filter-user-display">
//                 <div className="user-default-profile-pic">
//                   {user?.firstName?.[0]}{user?.lastName?.[0]}
//                 </div>
//                 <div className="filter-user-details">
//                   <div className="user-display-name">
//                     {user?.firstName} {user?.lastName}
//                   </div>
//                   <div className="user-display-email">
//                     {user?.email}
//                   </div>
//                 </div>
//                 {!  allChats.find(chat=>chat.members.includes(user._id))&&
//                 <div className="user-start-chat">
//                   <button className="user-start-chat-btn">Start Chat</button>
//                 </div>}
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>No users found.</div>
//       )}
//     </>
//   );
// }


// import { useSelector } from "react-redux";

// function UserList({ searchKey }) {
//   const { allUsers, allChats = [] } = useSelector(state => state.userReducer);

//   // Safely access array of users
//   const usersArray = allUsers?.data || [];

//   // Filter users based on search key
//   const filteredUsers = usersArray.filter(user => {
//     const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.toLowerCase();
//     return fullName.includes(searchKey.toLowerCase());
//   });

//   return (
//     <div className="user-list-container">
//       {searchKey && filteredUsers.length === 0 && (
//         <div>No users found.</div>
//       )}

//       {filteredUsers.map((user, index) => {
//         const existingChat = allChats.find(chat => chat.members.includes(user._id));

//         return (
//           <div className="user-search-filter" key={index}>
//             <div className="filtered-user">
//               <div className="filter-user-display">
//                 <div className="user-default-profile-pic">
//                   {user?.firstName?.[0]}{user?.lastName?.[0]}
//                 </div>
//                 <div className="filter-user-details">
//                   <div className="user-display-name">
//                     {user?.firstName} {user?.lastName}
//                   </div>
//                   <div className="user-display-email">
//                     {user?.email}
//                   </div>
//                 </div>

//                 <div className="user-start-chat">
//                   {existingChat ? (
//                     <div className="existing-chat-info">
//                       <p>Chat already exists</p>
//                     </div>
//                   ) : (
//                     <button className="user-start-chat-btn">
//                       Start Chat
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


