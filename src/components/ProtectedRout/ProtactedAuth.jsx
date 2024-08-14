import React, { useContext } from 'react'
import { authContext } from '../../Authcontext/Authcontext'
import { Navigate } from 'react-router-dom';


function ProtactedAuth({children}) {
    const {isUserLogin} = useContext(authContext);
    return (<>

        {isUserLogin? <Navigate to={"/"} /> :children  }
        
        </>)
}

export default ProtactedAuth
