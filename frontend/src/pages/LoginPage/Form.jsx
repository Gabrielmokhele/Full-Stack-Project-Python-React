import { useContext } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";



const registerSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  const register = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const savedUser = await response.json();
    onSubmitProps.resetForm();

    if (response.ok) {
      navigate("/login");
    } else {
      alert(savedUser.detail || "Registration failed");
    }
  };

  const login = async (values, onSubmitProps) => {
    const formData = new URLSearchParams();
    formData.append("username", values.email);
    formData.append("password", values.password);

    const response = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await response.json();
    onSubmitProps.resetForm();

    if (response.ok) {
      setToken(data.access_token);
      setUser({ email: data.user.email, id: data.user.id }); 
      localStorage.setItem("token", data.access_token);
      navigate(`/Profile/${data.user.id}`);
    } else {
      alert(data.detail || "Login failed");
    }
  };


  const handleFormSubmit = async (values, onSubmitProps) => {
    isLogin ? await login(values, onSubmitProps) : await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Submit Button & Switch Link */}
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
            <Typography
              onClick={() => {
                resetForm();
                navigate(isLogin ? "/register" : "/login");
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": { cursor: "pointer", color: palette.primary.light },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
