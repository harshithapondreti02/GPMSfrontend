import React, { useEffect, useLayoutEffect } from 'react'
import { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import { useSelector ,useDispatch} from 'react-redux'


export default function EmailLogin(){

    const navigate = useNavigate()
    const BackendUrl=useSelector((state)=>state.GlobalValues.BackendUrl)

    const host=BackendUrl

    const [credentials, setcredentials] = useState({email:"",password:"",position:""})
    
    const signin=async (a)=>{
        try{
        
        a.preventDefault();
        const response = await fetch(`${host}/api/auth/${credentials.position}/login`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          // mode: 'cors', // cors, *no-cors, same-origin
          // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
           
          },
          // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
         // body data type must match "Content-Type" header
         body: JSON.stringify({"email":credentials.email,"password":credentials.password})
        });

        // console.log(response)
        // console.log("sending request")
        let res=await response.json(); // parses JSON response into native JavaScript objects
        // console.log("respose reached")
        if(res.success){
            localStorage.setItem(`authtoken_${credentials.position}`,res.authtoken);
            // localStorage.setItem("name",res.name);
            
            // console.log(`authtoken_${credentials.position}`,res.authtoken)
            navigate(`/${credentials.position}`)

        }else{
            alert("Enter valid details")
        }
      }catch(error){
        console.log(error)
        document.getElementById("signin_error").innerHTML=error
      }
    }


      const handleonchange=(e)=>{
          setcredentials({...credentials,[e.target.name]:e.target.value})
      }

      useEffect(() => {
          console.log(BackendUrl)
      }, [])
      


    return (
        <>
        {/* <div>
           <form>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" name="email" className="form-control"  id="exampleInputEmail1" onChange={handleonchange} aria-describedby="emailHelp" placeholder="Enter email"/>
   
  </div>
  <div className="form-group">
    <label htmlFor="email">Password</label>
    <input type="password" name='password' className="form-control" id="email" onChange={handleonchange} placeholder="Password"/>
  </div>

  <button type="submit" onClick={signin} className="btn btn-primary my-3">Submit</button>
</form>
        </div> */}
        <p id='signin_error'>

        </p>












        

<script src="https://use.fontawesome.com/1dec14be15.js"></script>
    <div className="container stylish-form" style={{"height":"100%"}}>  
      <h2 className="text-center">WELCOME</h2>
      <div className="row mar20" >
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="inner-section">
            <form method="POST">
              <div className="mar20 inside-form">
                <h2 className="font_white text-center">SIGN IN</h2>
                  {/* <ul>
                    <li className="icon-holder dsp-flex">
                      <i className="fa fa-facebook "></i>
                    </li>
                    <li className="icon-holder dsp-flex">
                      <i className="fa fa-twitter "></i>
                    </li>
                    <li className="icon-holder dsp-flex">
                      <i className="fa fa-instagram "></i>
                    </li>
                  </ul> */}
               <p className='fw-bold'>Email     </p>
                <div className="input-group">
                  <span className="input-group-addon"><i className=""></i></span>
                  
                  <input type="email" className="form-control" name="email" placeholder="Email..." onChange={handleonchange}/>
                </div>
                <p className='fw-bold my-3'>Password</p>
                <div className="input-group">
                  <span className="input-group-addon"><i className=""></i></span>
                  <input type="password" className="form-control" name="password" placeholder="Password..." onChange={handleonchange}/>
                </div>
                <p className="fw-bold my-3">Position</p>
                  <div className="input-group">
                    <select
                      name="position"
                      className="form-control"
                      onChange={handleonchange}
                      value={credentials.position}
                    >
                      <option value="">Select Position</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="hod">Hod</option>
                      <option value="administrator">Administrator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                <div className="footer text-center">
                  <a onClick={signin} className="btn btn-primary my-3 btn-round btn-lg">Login</a>
                </div>
                {/* <button className='text-light btn-primary'   ><Link className='text-light' to="/individualfarmersignup">Dont have an account ? Signup</Link>  </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <a href="fb.com/ervijender"><h2 className="text-center font_white">Farmers are Backbone to India</h2></a> */}
      <br>
      </br>
      <br>
      </br>
      <br></br>
      <br>
      </br>
    </div>
        </>
    )
}
