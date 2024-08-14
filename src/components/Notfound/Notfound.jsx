import React from 'react'


import notFound from "../../Assets//images/error.svg";
import { Helmet } from 'react-helmet';

 export default function Notfound() {
    return (
        <>
  
       
       <section className=" container text-center my-5 ">

        
            <img className=' w-75 ' src={notFound} alt="not found component" />
        

       </section>
        
        </>
    )
};


