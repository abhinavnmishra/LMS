import React from "react";
// import { Button } from '@material-ui/core';
// import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
// import { Container } from "@mui/system";
import './loginpage.css';
// import { useTranslation } from 'react-i18next';
import { useState } from "react";

const LoginPage=()=>{
    const [name,setName] = useState("");
    const [phoneno,setPhoneNo] = useState("");
    const [password,setPassword] = useState("");
    const [otp,setOtp] = useState("");
    const [aadharno,setAadharNo] = useState("");

    const getOtp = (e)=>{
        //send otp to phone no
        e.preventDefault();
        console.log("here");
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Accept', 'application/json');


        let raw = JSON.stringify({"phone":phoneno});

        let requestOptions = {
            method: 'POST',
            body: raw,
            headers: headers,
            redirect: 'follow'
        };

        console.log(raw);
        fetch("https://cfg22-backend.herokuapp.com/whatsapp/otp", requestOptions)
            .then(response => response.text())
            .then(result => {
                alert('Success');
            })
            .catch(error => {
                alert(error);
                console.log('error', error);

            });
    }
    const onSubmit = (e)=>{
        //send data to data base and compare the otp sent and entered otp
        e.preventDeafult()
        const user = {
            name : name,
            phoneno : phoneno,
            password : password,
            aadharno : aadharno,
            otp:otp
        }
    }

    return(
        <div >
            <h4>Welcome</h4>
            <form  className="form">
                <h2 className="form-heading">Login</h2>
                <div className="form-item">
                    <label>Name</label>
                    <br></br>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>

                <div className="form-item">
                    <label>Phone no</label>
                    <br></br>
                    <input
                        type="string "
                        placeholder="Enter phone no"
                        onChange={(e)=>{setPhoneNo(e.target.value)}}
                    />
                </div>
                <div className="form-item">
                    <label>Aadhar no</label>
                    <br></br>
                    <input
                        type="string"
                        placeholder="enter aadhar no"
                        onChange={(e)=>{setAadharNo(e.target.value)}}
                    />
                </div>
                <div className="form-item">
                    <label>Password</label>
                    <br></br>
                    <input
                        type="password"
                        placeholder="create a password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>
                <div className="form-item">
                    <button onClick={getOtp}>Get otp</button>
                    <input
                        type="String"
                        placeholder="Enter otp"
                        onChange={(e)=>{setOtp(e.target.value)}}
                    />
                </div>
                <button onClick={onSubmit}>submit</button>
            </form>

        </div>
    );
}
export default LoginPage;