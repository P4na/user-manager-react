import Button from "react-bootstrap/Button";
import React, { useContext, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import pgAxios from "../api/pgAxios";
import { Typography } from "@mui/material";
import { BeatLoader } from "react-spinners";
import { UserListContext } from "../pages/Dashboard";

export const FormCrud = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const POST_URL = "add";
  const GET_ALL = "/all";
  const { setUserList } = useContext(UserListContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    refPassword.current.value = "";
    refDate.current.value = "";
    refEmail.current.value = "";
    refUsername.current.value = "";
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
        .then(() => pgAxios.get(GET_ALL).then((res) => setUserList(res.data)));
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
  };

  const refUsername = useRef("");
  const refPassword = useRef("");
  const refEmail = useRef("");
  const refDate = useRef("");

  const handleClick = () => {
    refUsername.current.value = "";
    console.log(refUsername);
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
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
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
      <Button variant="warning" onClick={handleClick}>
        clear
      </Button>
    </Container>
  );
};
