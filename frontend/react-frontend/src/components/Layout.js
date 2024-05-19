import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Layout = ({ children }) => (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/tasks">Tasks</Nav.Link>
      </Nav>
    </Navbar>
    <Container className="mt-4">
      {children}
    </Container>
  </>
);

export default Layout;
