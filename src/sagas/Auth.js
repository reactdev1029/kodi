import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT } from '../util/request';
import config from '../config';
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  POST_CONTACT,
  POST_FORGOT_PASSWORD,
  REFRESH_TOKEN,
  CONFIRM_PASSWORD,
  CHANGE_PASSWORD,
  ADD_SUB_ACCOUNT,
} from 'constants/ActionTypes';
import {
  userSignInSuccess,
  userSignInFailed,
  userSignOutSuccess,
  userSignOutFailed,
  userSignUpSuccess,
  userSignUpFailed,
  postContactSuccess,
  postContactFailed,
  postForgotPasswordSuccess,
  postForgotPasswordFailed,
  refreshTokenSuccess,
  refreshTokenFailed,
  confirmPasswordSuccess,
  confirmPasswordFailed,
  changePasswordSuccess,
  changePasswordFailed,
  addSubAccountSuccess,
  addSubAccountFailed,
} from 'actions/Auth';

const createUserWithEmailPasswordRequest = async data =>
  await POST(`user/cognito/register/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const signInUserWithEmailPasswordRequest = async data =>
  await POST(`user/cognito/login/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const signOutRequest = async () =>
  await POST(`user/cognito/logout/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
  })
    .then(response => response)
    .catch(error => error.response);

const postContactCall = async data =>
  await POST(`user/contact/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const postForgotPasswordCall = async data =>
  await POST(`user/cognito/forgot_password/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const refreshTokenCall = async data =>
  await POST(`user/cognito/refresh/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const confirmPasswordCall = async data =>
  await POST(`user/cognito/confirm_password/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const changePasswordCall = async data =>
  await POST(`user/cognito/forced_password_reset/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const addSubAccountCall = async data =>
  await POST(`user/cognito/subaccounts/`, {
    baseUrl: `${config.baseUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('user_id')}`,
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

function* createUserWithEmailPassword({ data }) {
  try {
    const signUpUser = yield call(createUserWithEmailPasswordRequest, data);
    if (signUpUser.status >= 200 && signUpUser.status < 400) {
      yield put(userSignUpSuccess(signUpUser.data));
    } else {
      yield put(userSignUpFailed(signUpUser.data));
    }
  } catch (error) {
    yield put(userSignUpFailed(error));
  }
}

function* signInUserWithEmailPassword({ data }) {
  const { email } = data;
  try {
    const signInUser = yield call(signInUserWithEmailPasswordRequest, data);
    if (signInUser.status >= 200 && signInUser.status < 400) {
      yield put(userSignInSuccess(signInUser.data.access_token));
      localStorage.setItem('user_id', signInUser.data.access_token);
      localStorage.setItem('refresh_token', signInUser.data.refresh_token);
      localStorage.setItem('email', email);
    } else {
      yield put(userSignInFailed(signInUser.data));
    }
  } catch (error) {
    yield put(userSignInFailed(error));
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser.status >= 200 && signOutUser.status < 400) {
      yield put(userSignOutSuccess());
    } else {
      yield put(userSignOutFailed(signOutUser.data));
    }
  } catch (error) {
    yield put(userSignOutFailed(error));
  }
  localStorage.clear();
}

function* postContactRequest({ data }) {
  try {
    const postContact = yield call(postContactCall, data);
    if (postContact.status >= 200 && postContact.status < 400) {
      yield put(postContactSuccess(postContact.data));
    } else {
      yield put(postContactFailed(postContact.data));
    }
  } catch (error) {
    yield put(postContactFailed(error));
  }
}

function* postForgotPasswordRequest({ data }) {
  try {
    const forgotPassword = yield call(postForgotPasswordCall, data);
    if (forgotPassword.status >= 200 && forgotPassword.status < 400) {
      yield put(postForgotPasswordSuccess(forgotPassword.data));
      localStorage.setItem('forgot_email', data.email);
    } else {
      yield put(postForgotPasswordFailed(forgotPassword.data));
    }
  } catch (error) {
    yield put(postForgotPasswordFailed(error));
  }
}

function* refreshTokenRequest() {
  let data = {
    refresh_token: localStorage.getItem('refresh_token'),
    email: localStorage.getItem('email'),
  };
  try {
    const signInUser = yield call(refreshTokenCall, data);
    if (signInUser.status >= 200 && signInUser.status < 400) {
      yield put(refreshTokenSuccess(signInUser.data.access_token));
      localStorage.setItem('user_id', signInUser.data.access_token);
    } else {
      yield put(refreshTokenFailed(signInUser.data));
      localStorage.clear();
    }
  } catch (error) {
    yield put(refreshTokenFailed(error));
    localStorage.clear();
  }
}

function* confirmPasswordRequest({ data }) {
  try {
    const signInUser = yield call(confirmPasswordCall, data);
    if (signInUser.status >= 200 && signInUser.status < 400) {
      yield put(confirmPasswordSuccess(signInUser.data));
    } else {
      yield put(confirmPasswordFailed(signInUser.data));
    }
  } catch (error) {
    yield put(confirmPasswordFailed(error));
  }
}

function* changePasswordRequest({ data }) {
  try {
    const signInUser = yield call(changePasswordCall, data);
    if (signInUser.status >= 200 && signInUser.status < 400) {
      yield put(changePasswordSuccess(signInUser.data));
    } else {
      yield put(changePasswordFailed(signInUser.data));
    }
  } catch (error) {
    yield put(changePasswordFailed(error));
  }
}

function* addSubAccountRequest({ data }) {
  try {
    const signInUser = yield call(addSubAccountCall, data);
    if (signInUser.status >= 200 && signInUser.status < 400) {
      yield put(addSubAccountSuccess(signInUser.data));
      localStorage.clear();
    } else {
      yield put(addSubAccountFailed(signInUser.data));
    }
  } catch (error) {
    yield put(addSubAccountFailed(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export function* postContact() {
  yield takeEvery(POST_CONTACT, postContactRequest);
}

export function* postForgotPassword() {
  yield takeEvery(POST_FORGOT_PASSWORD, postForgotPasswordRequest);
}

export function* refreshToken() {
  yield takeEvery(REFRESH_TOKEN, refreshTokenRequest);
}

export function* confirmPassword() {
  yield takeEvery(CONFIRM_PASSWORD, confirmPasswordRequest);
}

export function* changePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePasswordRequest);
}

export function* addSubAccount() {
  yield takeEvery(ADD_SUB_ACCOUNT, addSubAccountRequest);
}

export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(createUserAccount),
    fork(signOutUser),
    fork(postContact),
    fork(postForgotPassword),
    fork(refreshToken),
    fork(confirmPassword),
    fork(changePassword),
    fork(addSubAccount),
  ]);
}
