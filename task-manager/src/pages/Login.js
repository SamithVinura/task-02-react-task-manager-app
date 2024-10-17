import { Formik, useFormik } from "formik";
import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { login } from "../services/api";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const initialLoginValues = {
    username: "",
    password: "",
  };

  const loginForm = useFormik({
    initialValues: initialLoginValues,
  });

  const handleSubmit = async () => {
    const userValid = await login(
      loginForm.values.username,
      loginForm.values.password
    );
    if (userValid) {
      toast("Successfully logged in!");
      localStorage.setItem("loggedInUser", JSON.stringify(userValid));
      navigate("/home");
    } else {
      toast.warn("User name or password is incorret.", {
        theme: "colored",
      });
      localStorage.removeItem("loggedInUser");
    }
  };
  return (
    <Container
      fluid
      className="bg-light d-flex justify-content-center align-items-center min-vh-100 w-100 m-0 p-0"
    >
      <Col xs={12} md={4} lg={4} xl={4}>
        {/* Login Title */}
        <ToastContainer />
        <h2 className="text-center mb-4">Login Here !</h2>
        <Formik>
          <form initialValues={initialLoginValues}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                required
                isValid={
                  loginForm.touched.firstName && !loginForm.errors.firstName
                }
                value={loginForm.values.username}
                onChange={loginForm.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" onClick={handleSubmit}>
                Login
              </Button>
            </div>
          </form>
        </Formik>
      </Col>
    </Container>
  );
};

export default Login;
