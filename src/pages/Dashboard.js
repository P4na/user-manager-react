import React, { createContext, useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import pgAxios from "../api/pgAxios";
import { FormCrud } from "../component/FormCrud";
import { TableCrud } from "../component/TableCrud";

export const UserListContext = createContext();

export const Dashboard = () => {
  const [id, setId] = useState(0);
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");

  const refUsername = useRef("");
  const refEmail = useRef("");
  const refPassword = useRef("");
  const refDate = useRef("");

  const GET_ALL = "/all";

  const getData = () => {
    pgAxios.get(GET_ALL).then((res) => setUserList(res.data));
  };
  useEffect(getData, []);

  return (
    <UserListContext.Provider
      value={{
        id,
        setId,
        userList,
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
      }}
    >
      <Container>
        <Row className="mt-5">
          <Col>
            <FormCrud />
          </Col>
          <Col>
            <TableCrud />
          </Col>
        </Row>
      </Container>
    </UserListContext.Provider>
  );
};
