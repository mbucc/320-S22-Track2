import React from 'react';
import CustomInput from './CustomInput';
import Button from './Buttons';
import logo from "./iso_newengland.png"
import Image from "next/image"

// eslint-disable-next-line require-jsdoc
export default function Login({setLogin}) {
  return (
    <div className="App">
      <Image src = {logo}  style={{minWidth: "50%", height: "50%"}}/>
      <h3>ISO CLOG Monitor</h3>
      <form className="form">
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          // handleChange={this.handleChange}
          type="text"
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          // handleChange={this.handleChange}
          type="password"
        />

        <Button type="button" color="primary" className="form__custom-button" onClick = {() => setLogin(true) }>
            Log in
        </Button>
        <Button type="button" color="primary" className="form__custom-button" onClick = {() => setLogin(false) }>
            Forgot Password
        </Button>
      </form>
    </div>
  );
}

