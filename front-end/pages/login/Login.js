import React, { Component } from "react";
import CustomInput from "./CustomInput";
import Button from "./Buttons";

export default function Login ({setLogin}) {

    return (
      <div className="App">
        
        
      
        <form className="form">
          <CustomInput
            labelText="Email"
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            // handleChange={this.handleChange}
            type="text"
          />
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
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

