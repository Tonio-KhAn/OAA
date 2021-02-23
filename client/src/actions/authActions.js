import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("users/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};



export const login = (data) => {
  return function(dispatch){
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = {
    uwi_email: data.uwi_email,
    password: data.password
   
  };

  axios
    .post("users/login", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      },
      alert(data.uwi_email + " you have been successfully logged in")
    )
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"),
        alert(err.response.data.msg)
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "appplication/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
