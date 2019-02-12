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

const INIT_STATE = {
  loader: false,
  initURL: '/',
  authUser: localStorage.getItem('user_id'),
  error: undefined,
  contact: undefined,
  forgotPassword: undefined,
  confirmedPassword: undefined,
  changedPassword: undefined,
  addedAccount: undefined,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.authUser,
        error: undefined,
      };
    }
    case SIGNUP_USER_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case SIGNIN_USER: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.authUser,
        error: undefined,
      };
    }
    case SIGNIN_USER_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.url,
        error: undefined,
      };
    }
    case SIGNOUT_USER: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: undefined,
        initURL: undefined,
        loader: false,
        error: undefined,
      };
    }
    case SIGNOUT_USER_FAILED: {
      return {
        ...state,
        authUser: undefined,
        initURL: undefined,
        loader: false,
        error: action.error,
      };
    }
    case ERROR_CLEAR: {
      return {
        ...state,
        loader: false,
        error: undefined,
      };
    }
    case POST_CONTACT: {
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    }
    case POST_CONTACT_SUCCESS: {
      return {
        ...state,
        loader: false,
        contact: action.contact,
        error: undefined,
      };
    }
    case POST_CONTACT_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    }
    case POST_FORGOT_PASSWORD: {
      return {
        ...state,
        loader: true,
        error: undefined,
        forgotPassword: undefined,
      };
    }
    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        forgotPassword: action.forgotPassword,
        error: undefined,
      };
    }
    case POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
        forgotPassword: undefined,
      };
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
        error: undefined,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        error: undefined,
        authUser: action.authUser,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        error: action.error,
        authUser: undefined,
        initURL: undefined,
      };
    }
    case CONFIRM_PASSWORD: {
      return {
        ...state,
        loader: true,
        error: undefined,
        confirmedPassword: undefined,
      };
    }
    case CONFIRM_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        error: undefined,
        confirmedPassword: action.confirmedPassword,
      };
    }
    case CONFIRM_PASSWORD_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
        confirmedPassword: undefined,
      };
    }
    case CHANGE_PASSWORD: {
      return {
        ...state,
        loader: true,
        error: undefined,
        changedPassword: undefined,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        error: undefined,
        changedPassword: action.changedPassword,
      };
    }
    case CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
        changedPassword: undefined,
      };
    }
    case ADD_SUB_ACCOUNT: {
      return {
        ...state,
        loader: true,
        error: undefined,
        addedAccount: undefined,
      };
    }
    case ADD_SUB_ACCOUNT_SUCCESS: {
      return {
        ...state,
        loader: false,
        error: undefined,
        addedAccount: action.addedAccount,
        authUser: undefined,
      };
    }
    case ADD_SUB_ACCOUNT_FAILED: {
      return {
        ...state,
        loader: false,
        error: action.error,
        addedAccount: undefined,
      };
    }

    default:
      return state;
  }
};
