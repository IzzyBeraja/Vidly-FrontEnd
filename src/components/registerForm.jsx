import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { email: "", name: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
    name: Joi.string().required().label("Name"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email =
          ex.response.data.errors.email ||
          ex.response.data.errors.email.first();
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("name", "Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
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

export default RegisterForm;
