import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signinUser } from '../../actions';
import { renderField, renderAlert } from '../helper/form_helper';

class Signin extends Component {

  onSubmit({ email, password }) {
    this.props.signinUser({ email, password }, this.props.history);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {renderAlert(this)}
        <Field
          label="Email"
          name="email"
          fieldType="input"
          type="text"
          component={renderField}
        />
        <Field
          label="Password"
          name="password"
          fieldType="input"
          type="password"
          component={renderField}
        />
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) errors.email = "Email must be provided!";
  if (!values.password) errors.password = "Password must be provided!";
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signin',
})(
  connect(mapStateToProps,{ signinUser })(Signin)
);
