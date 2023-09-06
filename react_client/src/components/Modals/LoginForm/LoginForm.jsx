import React from 'react';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { setErrors } from '../../../redux/actions/errorActions';
import { setLoadingAlert } from '../../../redux/actions/loadingActions';
import { setCurrentUser } from '../../../redux/actions/userActions';
import Modal from '../ModalBackdrop/Modal';
import spookifyAPI from '../../../api/spookify';
import useStyles from './styles';
import setJwtToken from '../../../utils/setJwtToken';

const LoginForm = ({
  openFlag,
  closeHandler,
  dispatchErrors,
  dispatchLoadingAlert,
  dispatchCurrentUser,
}) => {
  const classes = useStyles();
  const history = useHistory();
  

  return (
    <>
      <Modal openFlag={openFlag} closeHandler={closeHandler}>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Required';
            } else if (
              values.username.length < 3 ||
              values.username.length > 15
            ) {
              errors.username = 'Between 3 to 15 characters';
            }

            if (!values.password || values.password.length === 0) {
              errors.password = 'Should not be blank';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const postLoginForm = async () => {
              dispatchLoadingAlert(true);
              try {
                let { data } = await spookifyAPI.post('/users/login', values);

                const token = data.token;

                localStorage.setItem('jwtToken', token);
                setJwtToken(token);

                const decodedJwt = jwt_decode(token);
                dispatchCurrentUser(decodedJwt);
                history.push('/browse');
              } catch (error) {
                if (!error.response) {
                  // when Heroku server first starts, returns empty POST
                  postLoginForm();
                } else {
                  dispatchErrors(error.response.data);
                }
              }

              dispatchLoadingAlert(false);
              setSubmitting(false);
            };

            postLoginForm();
          }}
        >
          {({ submitForm, isSubmitting, errors }) => (
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="username"
                  type="text"
                  label="Username"
                  helperText="Please enter username"
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
              </Box>

              <Box display="flex" justifyContent="center">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Log In
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchErrors: (errors) => dispatch(setErrors(errors)),
    dispatchLoadingAlert: (status) => dispatch(setLoadingAlert(status)),
    dispatchCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
