import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Bstnvbr() {
  return (
    <Navbar bg="danger" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">E Supermarket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Category"> Category</Nav.Link>
            <Nav.Link href="/Product"> Product Registration</Nav.Link>
            <Nav.Link href="/Productlist"> Product Table</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Bstnvbr;
