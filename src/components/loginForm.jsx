import React, { Component } from "react";
import Joi from "joi";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schema).validate(
      this.state.account,
      options
    );
    if (!error) return null;

    const errors = {};
    error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    console.log(this.schema.single(obj));
    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault(); // Prevents call to server

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
