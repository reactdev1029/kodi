import {
  INIT_URL,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_FAILED,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILED,
  ERROR_CLEAR,
  POST_CONTACT,
  POST_CONTACT_SUCCESS,
  POST_CONTACT_FAILED,
  POST_FORGOT_PASSWORD,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  CONFIRM_PASSWORD,
  CONFIRM_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_FAILED,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  ADD_SUB_ACCOUNT,
  ADD_SUB_ACCOUNT_SUCCESS,
  ADD_SUB_ACCOUNT_FAILED,
} from 'constants/ActionTypes';

export const userSignUp = data => {
  return {
    type: SIGNUP_USER,
    data,
  };
};
export const userSignIn = data => {
  return {
    type: SIGNIN_USER,
    data,
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER,
  };
};
export const userSignUpSuccess = authUser => {
  return {
    type: SIGNUP_USER_SUCCESS,
    authUser,
  };
};
export const userSignUpFailed = error => {
  return {
    type: SIGNUP_USER_FAILED,
    error,
  };
};

export const userSignInSuccess = authUser => {
  return {
    type: SIGNIN_USER_SUCCESS,
    authUser,
  };
};
export const userSignInFailed = error => {
  return {
    type: SIGNIN_USER_FAILED,
    error,
  };
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  };
};

export const userSignOutFailed = error => {
  return {
    type: SIGNOUT_USER_FAILED,
    error,
  };
};

export const setInitUrl = url => {
  return {
    type: INIT_URL,
    url,
  };
};

export const errorClear = () => {
  return {
    type: ERROR_CLEAR,
  };
};

export const postContact = data => {
  return {
    type: POST_CONTACT,
    data,
  };
};

export const postContactSuccess = contact => {
  return {
    type: POST_CONTACT_SUCCESS,
    contact,
  };
};

export const postContactFailed = error => {
  return {
    type: POST_CONTACT_FAILED,
    error,
  };
};

export const postForgotPassword = data => {
  return {
    type: POST_FORGOT_PASSWORD,
    data,
  };
};

export const postForgotPasswordSuccess = forgotPassword => {
  return {
    type: POST_FORGOT_PASSWORD_SUCCESS,
    forgotPassword,
  };
};

export const postForgotPasswordFailed = error => {
  return {
    type: POST_FORGOT_PASSWORD_FAILED,
    error,
  };
};

export const refreshToken = () => {
  return {
    type: REFRESH_TOKEN,
  };
};

export const refreshTokenSuccess = authUser => {
  return {
    type: REFRESH_TOKEN_SUCCESS,
    authUser,
  };
};

export const refreshTokenFailed = error => {
  return {
    type: REFRESH_TOKEN_FAILED,
    error,
  };
};

export const confirmPassword = data => {
  return {
    type: CONFIRM_PASSWORD,
    data,
  };
};

export const confirmPasswordSuccess = confirmedPassword => {
  return {
    type: CONFIRM_PASSWORD_SUCCESS,
    confirmedPassword,
  };
};

export const confirmPasswordFailed = error => {
  return {
    type: CONFIRM_PASSWORD_FAILED,
    error,
  };
};

export const changePassword = data => {
  return {
    type: CHANGE_PASSWORD,
    data,
  };
};

export const changePasswordSuccess = changedPassword => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    changedPassword,
  };
};

export const changePasswordFailed = error => {
  return {
    type: CHANGE_PASSWORD_FAILED,
    error,
  };
};

export const addSubAccount = data => {
  return {
    type: ADD_SUB_ACCOUNT,
    data,
  };
};

export const addSubAccountSuccess = addedAccount => {
  return {
    type: ADD_SUB_ACCOUNT_SUCCESS,
    addedAccount,
  };
};

export const addSubAccountFailed = error => {
  return {
    type: ADD_SUB_ACCOUNT_FAILED,
    error,
  };
};
