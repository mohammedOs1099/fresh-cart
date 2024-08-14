import React, { useContext } from 'react'
import { authContext } from '../../Authcontext/Authcontext'
import Login from '../Login/Login';
 


 export default function ProtectedRout(props) {
    const {isUserLogin} =  useContext(authContext);

    return (<>

    {isUserLogin? props.children : <Login/> }
       
        
        </>
    )
};


