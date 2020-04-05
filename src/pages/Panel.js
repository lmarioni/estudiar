import React, { useState, useRef } from "react";
// import { Context } from "../Context";
import { Loading } from "../components/Loading";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import QRCode from 'qrcode.react';
import { StudentsList } from "./StudentsList";
export const Panel = ({ id }) => {
  
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);
  const [inviteCode, setInviteCode] = useState(id);
  const [inviteQR, setInviteQR] = useState(`https://estudiar.btcj.com.ar/i/${inviteCode}`);

  const copyToClipboard = () => {
      const str = `https://estudiar.btcj.com.ar/i/${inviteCode}`;
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
          document.getSelection().rangeCount > 0
              ? document.getSelection().getRangeAt(0)
              : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
      }
      setCopySuccess(true);

      setTimeout(()=>{
          setCopySuccess(false);
      }, 1500);

  };

  return (
    <div>
          <React.Fragment>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="text-center">Opciones</h1>
                </div>
                <div className="col-sm-12">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="studentList">
                    <Row>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="studentList">Listado de alumnos</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="invite">Invitar</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={9}>
                        <Tab.Content>
                          <Tab.Pane eventKey="studentList">
                            <StudentsList id={id} />
                          </Tab.Pane>
                          <Tab.Pane eventKey="invite">
                            <h2>Invitar alumnos</h2>
                            <h5 className="text-center">Usa este código QR para invitar a tus alumnos!</h5>
                            <div className="text-center">
                              <QRCode
                                id="qrcode"
                                value={inviteQR}
                                size={290}
                                level={"H"}
                                includeMargin={true}
                              />
                            </div>
                            <h5 className="text-center">Invita con esta url:</h5>
                            <p className="link-url" ref={textAreaRef} onClick={copyToClipboard}>https://estudiar.btcj.com.ar/i/{inviteCode}</p>
                            <p className={` text-center faded-text${copySuccess ? "-visible" : ""}`}>Copiado al portapapeles!</p>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </React.Fragment>
    </div>
  );
};