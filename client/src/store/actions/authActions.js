import axios from 'axios';

const database = 'http://localhost:5000';

export const signUp = (state) => async (dispatch) => {
  try {
    const response = await axios.post(`${database}/auth/sign-up`, { ...state });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (state) => async (dispatch) => {
  try {
    const response = await axios.post(`${database}/auth/sign-in`, { ...state });
    console.dir(response);
  } catch (error) {
    console.dir(error);
  }
};

export const emailCheck = (email, history) => async (dispatch) => {
  try {
    const response = await axios.post(`${database}/auth/email-validation`, {
      email,
    });
    if (response.data) {
      history.push('/sign-up');
    }
    console.log(response);
  } catch (error) {
    console.dir(error);
  }
};
