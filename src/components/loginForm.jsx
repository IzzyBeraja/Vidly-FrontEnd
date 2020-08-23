import React from "react";
import Joi from "joi";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }

  /*
    <h1>Login</h1>
    <Form schema={this.schema}>
        <Input name="username" label="Username" />
        <Input type="password" name="password" label="Password" />
        <SubmitButton name="login" label="Login" />
    </Form>
  */
}

export default LoginForm;
