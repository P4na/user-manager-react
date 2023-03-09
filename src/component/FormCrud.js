import Button from "react-bootstrap/Button";
import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import pgAxios from "../api/pgAxios";
import { Typography } from "@mui/material";
import { BeatLoader } from "react-spinners";
import { UserListContext } from "../pages/Dashboard";

export const FormCrud = () => {
  const {
    setId,
    id,
    setUserList,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    date,
    setDate,
    refUsername,
    refEmail,
    refPassword,
    refDate,
  } = useContext(UserListContext);

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const POST_URL = "add";
  const GET_ALL = "all";
  const PUT_BY_ID = "edit";

  const handleSubmit = async (e) => {
    e.preventDefault();
    refPassword.current.value = "";
    refDate.current.value = "";
    refEmail.current.value = "";
    refUsername.current.value = "";
    console.log(id, username, password, date, email);
    if (id !== 0) {
      try {
        console.log(id);
        setLoading(true);
        await pgAxios
          .put(
            PUT_BY_ID,
            JSON.stringify({
              id,
              username,
              email,
              password,
              dataNascita: date,
            }),
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(setLoading(false))
          .then(() =>
            pgAxios.get(GET_ALL).then((res) => setUserList(res.data))
          );
        setUsername("");
        setEmail("");
        setPassword("");
        setDate("");
        setId(0);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLoading(true);
        await pgAxios
          .post(
            POST_URL,
            JSON.stringify({ username, email, password, dataNascita: date }),
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(setLoading(false))
          .then(() =>
            pgAxios.get(GET_ALL).then((res) => setUserList(res.data))
          );
        setUsername("");
        setEmail("");
        setPassword("");
        setDate("");
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (!error?.response) {
          setErrMsg("No Server response");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing required data");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Edit failed");
        }
      }
    }
  };

  return (
    <Container>
      <Typography
        variant="subtitle1"
        className="details"
        gutterBottom
        style={{ color: "red" }}
      >
        {errMsg}
      </Typography>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label htmlFor="inputUsername">Username</Form.Label>
            <Form.Control
              type="text"
              id="inputUsername"
              ref={refUsername}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </Col>
          <Col>
            <Form.Label htmlFor="inputPassword">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword"
              ref={refPassword}
              aria-describedby="passwordHelpBlock"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="inputEmail">Email</Form.Label>
            <Form.Control
              type="email"
              id="inputEmail"
              ref={refEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </Col>
          <Col>
            <Form.Label htmlFor="inputDate">date</Form.Label>
            <Form.Control
              type="date"
              ref={refDate}
              id="inputDate"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <BeatLoader
                color={"#ffffff"}
                loading={loading}
                size={25}
                className="centra"
              />
            ) : (
              <h6>Salva</h6>
            )}
          </Button>
        </Row>
      </Form>
    </Container>
  );
};
