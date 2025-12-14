import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas, NavDropdown } from "react-bootstrap"; 
import { useState } from "react"; 

// import speedsystem from "../../assets/speedsystem_azul_3d.png"

export default function Header() {
  const expand = "lg"; 
  const navigate = useNavigate();
  
  const isAuthenticated = localStorage.getItem('userToken');

  const [showMenu, setShowMenu] = useState(false);

  const handleClose = () => setShowMenu(false);
  const handleToggle = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    navigate('/login');
    handleClose();
  };

  const handleNavLinkClick = () => {
    handleClose();
  };

  const userIconSvg = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      fill="currentColor" 
      className="bi bi-person-circle" 
      viewBox="0 0 16 16" 
      style={{ marginRight: '8px', verticalAlign: 'middle' }}
    > 
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/> 
      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
    </svg>
  );

  return (
    <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to={isAuthenticated ? "/" : "/login"}>
          {/* <img src={speedsystem} alt="Logo do sistema." width="200px"/> */}
        </Navbar.Brand>
        {isAuthenticated && (
          <>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="ms-auto" onClick={handleToggle}/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              style={{ width: '200px' }}
              show={showMenu}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3"> 
                  <Nav.Link as={Link} to="/multicast" onClick={handleNavLinkClick}>
                    Multicasts
                  </Nav.Link>
                  <NavDropdown 
                      title="Check List" 
                      id={`offcanvasNavbarDropdown-expand-${expand}`} 
                  >
                      <NavDropdown.Item as={Link} to="/check/cn" onClick={handleNavLinkClick}>
                          C/N
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/check/hpa" onClick={handleNavLinkClick}>
                          HPA
                      </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown 
                      title="Antenas" 
                      id={`offcanvasNavbarDropdown-expand-${expand}`} 
                  >
                      <NavDropdown.Item as={Link} to="/antenas/" onClick={handleNavLinkClick}>
                          Detalhes
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/antenas/maps" onClick={handleNavLinkClick}>
                          Mapas
                      </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown 
                      title="Usuários" 
                      id={`offcanvasNavbarDropdown-expand-${expand}`} 
                  >
                      <NavDropdown.Item as={Link} to="/users/perfil" onClick={handleNavLinkClick}>
                          Minha Conta
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/users/" onClick={handleNavLinkClick}>
                          Lista de Usuarios
                      </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Sair
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        )}
      </Container>
    </Navbar>
  );
}