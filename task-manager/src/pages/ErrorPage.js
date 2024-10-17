import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useRouteError } from "react-router";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row>
        <Col className="text-center">
          <h1 className="display-3 text-danger">Oops!</h1>
          <p className="lead">Sorry, an unexpected error has occurred.</p>
          <p className="text-muted">
            <i>
              {error?.statusText || error?.message || "Something went wrong."}
            </i>
          </p>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
