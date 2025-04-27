
import React from 'react';
import { Link } from 'react-router-dom';
import { signupUser } from '../../APIcalls/auth';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/loaderSlice';

function Signup() {
    const dispatch=useDispatch()
    const [user, setUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    async function submitHandler(e) {
        e.preventDefault();
        console.log(user);
        try {
            dispatch(showLoader())
            const response = await signupUser(user);
            dispatch(hideLoader())
            if (response.success) {
                toast.success(response.message || "Signup successful");
            } else {
                toast.error(response.message || "Signup failed");
            }
        } catch (error) {
            dispatch(hideLoader())
            console.error("Signup error:", error);
            toast.error(
                error?.response?.data?.message || error?.message || "Something went wrong"
            );
        }
    }

    return (
        <div className="container">
            <div className="container-back-img"></div>
            <div className="container-back-color"></div>
            <div className="card">
                <div className="card_title">
                    <h1>Create Account</h1>
                </div>
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <div className="column">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="card_terms">
                    <span>Already have an account?
                        <Link to='/login'> Login Here</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;





// import React from 'react'
// import {Link} from 'react-router-dom' 
// import { signupUser } from '../../APIcalls/auth'
// import {toast} from 'react-hot-toast'

// function Signup(){

//     const [user,setUser]=React.useState({
//         firstName:"",
//         lastName:"",
//         email:"",
//         password:""
//     })

//     async function submitHandler(e){
//         e.preventDefault()
//         console.log(user)
//         let response=null
//         try{
//              response=await signupUser(user)
//             if(response.success){
//                 toast.success(response.message)
//             }
//             else{
//                 toast.error(response.message)
//             }

//         }
//         catch(error){
//             toast.error(response.message)

//         }

//     }
    
//     return (
//         <div className="container">
//         <div className="container-back-img"></div>
//         <div className="container-back-color"></div>
//         <div className="card">
//             <div className="card_title">
//                 <h1>Create Account</h1>
//             </div>
//             <div className="form">
//                 <form onSubmit={submitHandler}>
//                     <div className="column">
//                         <input type="text" placeholder="First Name" value={user.firstName}
//                         onChange={(e)=>setUser({...user,firstName:e.target.value})} />
//                         <input type="text" placeholder="Last Name"  value={user.lastName} 
//                          onChange={(e)=>setUser({...user,lastName:e.target.value})}/>
//                     </div>
//                     <input type="email" placeholder="Email"  value={user.email} 
//                      onChange={(e)=>setUser({...user,email:e.target.value})}/>
//                     <input type="password" placeholder="Password"  value={user.password} 
//                      onChange={(e)=>setUser({...user,password:e.target.value})}/>
//                     <button>Sign Up</button>
//                 </form>
//             </div>
//             <div className="card_terms">
//                 <span>Already have an account?
//                     <Link to='/login'>Login Here</Link>
//                 </span>
//             </div>
//         </div>
//     </div>

//     )
// }


// export default Signup
