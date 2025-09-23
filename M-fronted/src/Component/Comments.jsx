import React, { useEffect } from 'react'

const Comments = ({avatar,username,text}) => {
 
  return (
   
        
         
            <div  className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex items-start space-x-3">
                <div>
                  <img 
                    src={avatar} 
                    alt="" 
                    className="w-10 h-10 rounded-full border"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{username}</p>
                  <p className="text-gray-600">{text}</p>
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-500 cursor-pointer hover:underline">
                Reply
              </div>
            </div>
          
        
      
   
  )
}

export default Comments
