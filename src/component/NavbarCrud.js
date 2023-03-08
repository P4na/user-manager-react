import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export const NavbarCrud = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">User Manager</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
