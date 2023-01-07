import { Component, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// register schema values
const registerSchema = yup.object().shape({
  // .required - if value is empty will prompt user to enter a value
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// log in schema values
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// set ups the initial values of register
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

// set ups the initial values of log in
const initialValuesLogin = {
  email: "",
  password: "",
};

// form component
const Form = () => {
  // displays the log in or register form
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows sending form information with an image
    const formData = new FormData();
    // loop through every key value in the object 
    for (let value in values) {
      // append the key value to FormData 
      formData.append(value, values[value]);
    }
    // picturePath is the name of the picture uploaded, appended manually to FormData
    formData.append("picturePath", values.picture.name);

    // save everything returned to the backend 
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        // sending formData to the above API call 
        body: formData,
      }
    );
    // data received is saved and made into a parse-able form (.json) 
    const savedUser = await savedUserResponse.json();
    // form is then reset 
    onSubmitProps.resetForm();

    // if the user is saved successful then switch to log in form state 
    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      // data is formatted already for back-end and can just be passed through as is 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          // below is from redux state passed in as an object 
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      // successful authentication navigate to the home page (feed) 
      navigate("/home");
    }
  };

  // handles the form submission
  const handleFormSubmit = async (values, onSubmitProps) => {
    // if on the login form state run login function
    if (isLogin) await login(values, onSubmitProps);
    // if on the register form state run the register function 
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      // passing through form submission handle
      onSubmit={handleFormSubmit}
      // passing through initial values dependent on the state of the form i.e. register or login
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      // passing through the validation schemes for the appropriate form state
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        // passing values for use in the component and form
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        // formik gets the onSubmit and passing it through to the form onSubmit func for use
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0,
            1fr))"
            sx={{
              // & > div targets anything that is a child div
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* register form state */}
            {isRegister && (
              <>
                <TextField
                  // text display
                  label="First Name"
                  // handles the situation when clicking off the input
                  onBlur={handleBlur}
                  // handles the situation when typing
                  onChange={handleChange}
                  value={values.firstName}
                  // sync to initial value
                  name="firstName"
                  // error is true when it has been touched and there is an error
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  // show helper text when it's been touched and there is a error
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* profile photo input */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  {/* dropzone, allows to pass files and also has validation */}
                  <Dropzone
                    // accepted file extensions
                    acceptedFiles=".jpg,.jpeg,.png"
                    // only one file is accepted
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      // set the text form field value to "picture" manually
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {/* passing values for prop use in the jsx */}
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        // passing the props into the div
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {/* if there is not picture value  */}
                        {!values.picture ? (
                          // display this text
                          <p>Add Picture Here</p>
                        ) : (
                          // show the name of the image that has been added
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            {/* allows for change image to be uploaded */}
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              // the password text will be hidden
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            {/* interactive text to allow switching between register and log in form  */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                // when switching between forms, reset the form to prevent bugs
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here"
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
