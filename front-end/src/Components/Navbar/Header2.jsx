import { IconButton } from "@mui/material";
import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaBars } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { Box } from "@mui/system";
export default function Header2() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="header-2">
        {/* Category Menu  */}
        <div className="dropdown">
          <button
            className="drop-button"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            All Categroy
          </button>
          <div className="dropdown-menu">
            <Link to={"/result/fastion"} className="dropdown-item" href="#">
              Fastion
            </Link>
            <Link to={"/result/gerocery"} className="dropdown-item" href="#">
              Gerocery
            </Link>
            <Link to={"/result/electronic"} className="dropdown-item" href="#">
              Electronic
            </Link>
            <Link to={"/result/shoes"} className="dropdown-item" href="#">
              Shoes
            </Link>
            <Link to={"/result/watch"} className="dropdown-item" href="#">
              Watch
            </Link>
          </div>
        </div>
        {/* Category Menu  */}
        <Box flexGrow={1} />
        {/* Ul Of Catg */}
        <div>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <Link to="/result/fastion">Fastion</Link>
            </li>
            <li>
              <Link to="/result/gerocery">Gerocery</Link>
            </li>
            <li>
              <Link to="/result/electronic">Electronic</Link>
            </li>
            <li>
              <Link to="/result/shoes">Shoes</Link>
            </li>
            <li>
              <Link to="/result/watch">Watch</Link>
            </li>
          </ul>
        </div>
        <IconButton className="nav-btn" onClick={handleShow}>
          <FaBars />
        </IconButton>
        <Offcanvas show={show} onHide={handleClose} placement="top">
          <Offcanvas.Header closeButton />
          <Offcanvas.Body>
            <Nav className="ms-auto" defaultActiveKey="#home">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/result/"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/result/fastion"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Fastion
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/result/gerocery"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Gerocery
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/result/electronic"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Electronic
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/result/shoes"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Shoes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/result/watch"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Watch
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        {/* Ul Of Catg */}
      </div>
      <div className="header-wrapper"></div>
    </>
  );
}
