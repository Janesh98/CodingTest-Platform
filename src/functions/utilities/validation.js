// Checks if email is valid
const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() == '') return true;
  else return false;
};

exports.validateRegistrationData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email must be provided';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(data.password)) errors.password = 'Cannot be empty';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  if (isEmpty(data.company)) errors.company = 'Cannot be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Cannot be empty';
  if (isEmpty(data.password)) errors.password = 'Cannot be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
