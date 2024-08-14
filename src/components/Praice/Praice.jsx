import React from 'react'


 export default function Praice({Price,average,CartFunction,id}) {
    return (
        <>

<p className=" d-flex justify-content-between my-1">
                      <span> {Price} EGP </span>
                      <span className="">
                        <i className=" fa fa-star rating-color mx-1 "></i>
                        {average}
                      </span>
                    </p>
         <button onClick={()=>CartFunction(id)} className="btn bg-main text-white w-100 my-2">
                    Add To Cart
                  </button>
        
        </>
    )
};


