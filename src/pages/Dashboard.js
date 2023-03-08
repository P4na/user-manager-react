import React, { createContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import pgAxios from "../api/pgAxios";
import { FormCrud } from "../component/FormCrud";
import { TableCrud } from "../component/TableCrud";

export const UserListContext = createContext();

export const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const GET_ALL = "/all";

  const getData = () => {
    pgAxios.get(GET_ALL).then((res) => setUserList(res.data));
  };
  useEffect(getData, []);

  return (
    <UserListContext.Provider value={{ userList, setUserList }}>
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
