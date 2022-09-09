import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function useVerifyAuth(){
    const navigate = useNavigate();
    useEffect(() => {
        const check = async ()=> {
          const token = localStorage.getItem("token-auth-page")
          console.log(token)
          if (token !== null)  {
            const API = "http://localhost:3000/api/v1/auth/validToken";
            try{
                const result = await fetch(API, {
                    method: "POST",
                    body: JSON.stringify({}),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': 'Bearer ' + token,
                    }
                })
                const response = await result.json()
        
                if(response.auth == true){
                    navigate('/');
                }else{
                    navigate('/login');
                }
            }catch(e){
                navigate('/login');
            }
          }
        }
        check()
      }, []);
}

export default useVerifyAuth