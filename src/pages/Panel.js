import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";
import { Loading } from "../components/Loading";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { StudentsList } from "./StudentsList";
export const Panel = ({ id }) => {
  const { token } = useContext(Context);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading
        ? <Loading />
        : (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="text-center">Opciones</h1>
                </div>
                <div className="col-sm-12">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="studentList">Listado de alumnos</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={9}>
                        <Tab.Content>
                          <Tab.Pane eventKey="studentList">
                           <StudentsList id={id}/>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                           <h2>Second</h2>
                            
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      }
    </div>
  );
};