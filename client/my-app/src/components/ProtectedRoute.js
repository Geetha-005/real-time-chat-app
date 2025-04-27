import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { getLoggedUser, getAllUsers } from "../APIcalls/users";
import { getAllChats } from "../APIcalls/chat";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { setUser, setAllUsers, setAllChats } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (!localStorage.getItem("token")) {
          navigate("/login");
          return;
        }

        dispatch(showLoader());

        // 1. Fetch Logged In User
        const userResponse = await getLoggedUser();
        if (userResponse.success) {
          dispatch(setUser(userResponse.data.data));
        } else {
          toast.error(userResponse.message || "Session expired. Please login.");
          navigate("/login");
          return;
        }

        // 2. Fetch All Users
        const allUsersResponse = await getAllUsers();
        if (allUsersResponse.success) {
          dispatch(setAllUsers(allUsersResponse.data));
        } else {
          toast.error(allUsersResponse.message || "Failed to load users.");
          navigate("/login");
          return;
        }

        // 3. Fetch All Chats
        const allChatsResponse = await getAllChats();
        if (allChatsResponse.success) {
          dispatch(setAllChats(allChatsResponse.data));
        } else {
          toast.error(allChatsResponse.message || "Failed to load chats.");
          navigate("/login");
          return;
        }

      } catch (error) {
        console.error("Initialization error:", error);
        toast.error("Something went wrong. Please login again.");
        navigate("/login");
      } finally {
        dispatch(hideLoader());
      }
    };

    initializeApp();
  }, [dispatch, navigate]);

  return <>{children}</>;
}

export default ProtectedRoute;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getLoggedUser } from "../APIcalls/users";
// import { useDispatch, useSelector } from "react-redux";
// import { hideLoader, showLoader } from "../redux/loaderSlice";
// import {toast} from 'react-hot-toast'
// import { setAllChats, setAllUsers, setUser } from "../redux/userSlice";
// import { getAllUsers } from "../APIcalls/users";
// import { getAllChats } from "../APIcalls/chat";

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   const {user}=useSelector(state=>state.userReducer)
//   const dispatch=useDispatch()
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         dispatch(showLoader())
//         const response = await getLoggedUser();
//         console.log("Response from getLoggedUser:", response); // 👀
//         dispatch(hideLoader())
//         if (response.success) {
//           dispatch(setUser(response.data.data));
//         } else {
//             toast.error(response.message)
//           navigate("/login");
//         }
//       } catch (error) {
//         dispatch(hideLoader())
//         navigate("/login");
//       }
//     //   } finally {
//     //     setLoading(false); // ✅ Done loading
//     //   }
//     };


//     const getAllusersFromDB=async()=>{

//         try{
//             dispatch(showLoader())
//             let response=await getAllUsers()
//             dispatch(hideLoader())
    
//             if(response.success){
//                 dispatch(setAllUsers(response.data))
    
//             }
//             else{
//                 toast.error(response.message)
//                 navigate("/login")
    
//             }
//         }
//         catch(error){
//             dispatch(hideLoader())
//             navigate("/login")
    
//         }
    
//       }
//       const getCurrentChats=async()=>{

//         try{
//             let response=await getAllChats()
//             if(response.success){
//               dispatch(setAllChats(response.data))
//             }
//         }
//         catch(error){
            
//             navigate("/login")
    
//         }
    
//       }


//     if (localStorage.getItem("token")) {
//       fetchUser();
//       getAllusersFromDB()
//       getAllChats()
//     } else {
//       navigate("/login");
      
//     }
//   }, []);

  


//   return <>
//             {children}
//           </>;
// }

// export default ProtectedRoute;



// // import { useEffect, useState } from "react";

// // import { useNavigate } from "react-router-dom";
// // import { getLoggedUser } from "../APIcalls/users";


// // function ProtectedRoute({children}){
// //     const navigate=useNavigate()
// //     const [user,setUser]=useState('')

// //     // const getloggeduser=async()=>{
        
// //     //     try{
// //     //        const response= await getLoggedUser()
// //     //        if(response.success){
// //     //         setUser(response.data)
// //     //         navigate('/')
            
// //     //        }
// //     //        else{
// //     //         navigate("/login")
// //     //        }
// //     //     }
// //     //     catch(error){
// //     //         navigate('/login')

// //     //     }
// //     // }

// //     // useEffect(()=>{
// //     //     if(localStorage.getItem('token')){
// //     //        getloggeduser()
// //     //     }
// //     //     else{
// //     //         navigate('/login')
// //     //     }
// //     // },[])

// //     useEffect(() => {
// //         const getloggeduser = async () => {
// //           try {
// //             const response = await getLoggedUser();
// //             if (response.success) {
// //               setUser(response.data);
             
// //             } else {
// //               navigate("/login");
// //             }
// //           } catch (error) {
// //             navigate("/login");
// //           }
// //         };
      
// //         if (localStorage.getItem("token")) {
// //           getloggeduser();
// //         } else {
// //           navigate("/login");
// //         }
// //       }, [navigate]);





// //     return (
// //         <div>
// //             <p>name:{user?.firstName}</p>
// //             <p>last name:{user?.lastName}</p>
// //             {children}
// //         </div>
// //     )

// // }

// // export default ProtectedRoute