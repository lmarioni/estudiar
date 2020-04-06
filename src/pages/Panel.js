import React, { useState, useRef } from "react";
// import { Context } from "../Context";

import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import QRCode from 'qrcode.react';
import { StudentsList } from "./StudentsList";
import { CourseConfiguration } from "../components/CourseConfiguration";
import '../styles/Global.scss';
export const Panel = ({ id }) => {

  const tabsMapper = [
    { key: 'invite', label: 'Invitar alumnos' },
    { key: 'student-list', label: 'Listado de alumnos' },
    { key: 'course-configuration', label: 'Cambiar imagen de perfil' },
  ];

  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);
  const [inviteCode, setInviteCode] = useState(id);
  const [inviteQR, setInviteQR] = useState(`https://estudiar.btcj.com.ar/i/${inviteCode}`);

  const [selectedTab, setSelectedTab] = useState('Listado de alumnos');

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

    setTimeout(() => {
      setCopySuccess(false);
    }, 1500);
  };

  const handleSelectedTab = (tab) => { setSelectedTab(tabsMapper.find(eachTab => eachTab.key === tab).label); }

  return (
    <div>
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center main-title" >{selectedTab}</h1>
            </div>
            <div className="col-sm-12">
              <Tab.Container defaultActiveKey="student-list" onSelect={handleSelectedTab}>
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="student-list">Listado de alumnos</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="invite">Invitar</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="course-configuration">Configuracion</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="student-list">
                        <StudentsList id={id} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="course-configuration">
                        <CourseConfiguration id={id} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="invite">
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