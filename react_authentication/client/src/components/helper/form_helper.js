import React from 'react';

export const renderField = function (field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : '' }`;
  return (
    <div className={className}>
      <label>{field.label}</label>
      <field.fieldType
        className="form-control"
        type={field.type}
        {...field.input}
      />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

export const renderAlert = function(form) {
  if (form.props.errorMessage) {
    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong> {form.props.errorMessage}
      </div>
    )
  }
}
