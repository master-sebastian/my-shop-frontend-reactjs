import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './../css/App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import './../css/LoginPage.css'
import '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faKey} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FondoLoginPage from '../../backgrounds/LoginPage.png'
import useVerifyAuth from '../../middleware/useVerifyAuth'

function LoginPage() {
  
  useVerifyAuth()

  const navigate = useNavigate();
  const [ username, setUsername] =  useState("");
  const [ password, setPassword] =  useState("");

  const changeUsername = (event)=> {
    setUsername(event.target.value)
    
  }
  const changePassword = (event)=> {
    setPassword(event.target.value)
  }
  
  
  const authClick = async (event) => {
    const API = "http://localhost:3000/api/v1/auth/login";
    const raw = {
      username: username,
      password: password
    }
    try{
      const result = await fetch(API, {
        method: "POST",
        body: JSON.stringify(raw),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      const response = await result.json()
      if(response == undefined){
        throw new Error("No es valido")
      }
      if(response.token !== undefined){
        localStorage.setItem("token-auth-page", response.token)
        navigate('/');
      }else{
        alert(response.message)
      }
      
    }catch(e){
      console.log(e)
      if(e.message !== undefined){
        alert(e.message)
      }
    }
  }

  return (<>
    <div className="LoginPage__container mt-5 container">
      <div className="d-flex justify-content-center row">
        <div className="card LoginPage__card col-lg-8">
          <div className="card-header bg-dark text-white text-center">
            <h3>Panel de Acceso</h3>
          </div>
          <div className="card-body bg-white">
            <div className='row'>
              <div className='col-lg-7 mt-5'>
                <form >
                  <div className="input-group form-group mb-2">
                    <div className="LoginPage__input-group-prepend input-group-prepend">
                      <span className="input-group-text h-100"><FontAwesomeIcon icon={faUser} /></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Nombre de usuario" value={username} onChange={ changeUsername}/>
                  </div>
                  <div className="input-group form-group mb-2">
                    <div className="LoginPage__input-group-prepend input-group-prepend">
                      <span className="input-group-text h-100"><FontAwesomeIcon icon={faKey} /></span>
                    </div>
                    <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={ changePassword }/>
                  </div>
                  <div className="form-group text-center">
                    <input type="button" value="Acceder" className="btn btn-primary" onClick={authClick}/>
                  </div>
                </form>
              </div>
              <div className='col-lg-5'>
                <img src={FondoLoginPage} className="img-fluid"/>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <a href="#">Cambiar contraseña</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default LoginPage;
