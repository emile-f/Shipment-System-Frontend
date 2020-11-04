import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap';
import LoggedIn from '../components/LoginContext';

const NavBar = () => {
  const { loggedIn, setLoggedInHelper } = useContext(LoggedIn);
  const history = useHistory();

  const handleClick = async () => {
    if (!loggedIn.loggedIn) {
      history.push('/login');
    } else {
      
      /*
        Its propbably a good practice to have a try/catch around a await because when the request fails this will throw an error that isn't being catched.
        You can also use the fetch().then().catch()
      */
      const response = await fetch('/auth/logout');

      if (response.status === 200) {
        setLoggedInHelper(false, null, null, null);
        history.push('/');
      } else {
        alert('Failed to log out. Please contact the developer.');
      }
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">ShipCare</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item as="li" className="p-1">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li" className="p-1">
            <Nav.Link href="/shipment-list">My Shipments</Nav.Link>
          </Nav.Item>
        </Nav>
        <Button
          variant="outline-secondary"
          onClick={handleClick}
          className="p-1"
        >
          {loggedIn.loggedIn ? 'Sign Out' : 'Sign In'}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
