<<<<<<< HEAD
import React, { useState, useRef, useEffect, useContext } from "react";
// import { Context } from "../Context";

=======
import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../Context";
>>>>>>> Acomodado el invite, cambiado el codigo del toast
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import QRCode from 'qrcode.react';
import { Context } from "../Context";

import { Loading } from '../components/Loading'

import { StudentsList } from "./StudentsList";
import CourseConfiguration from "../components/CourseConfiguration";
import CourseLessons from "../components/CourseLessons";
import "../styles/Global.scss";

export const Panel = ({ id }) => {
  const { token } = useContext(Context);

  const tabsMapper = [
    { key: 'invite', label: 'Invitar alumnos' },
    { key: 'student-list', label: 'Listado de alumnos' },
    { key: 'course-configuration', label: 'Configuración' },
    { key: 'course-test', label: 'Evaluación' },
    { key: 'course-lessons', label: 'Lecciones' },
  ];

  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);
<<<<<<< HEAD
  const [inviteCode, setInviteCode] = useState('Cargando...');
  const [inviteQR, setInviteQR] = useState(`https://estudiar.btcj.com.ar/i/${inviteCode}`);
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState({})
=======
  const [inviteCode, setInviteCode] = useState('');
  const [inviteQR, setInviteQR] = useState('');


  const data = { headers: new Headers({ Authorization: "Bearer " + token }) };

  const fetchCode = async () => {
    const response = await fetch(`https://express-now-alpha-lac.now.sh/cursos/${id}`, data);
    const json = await response.json();
    setInviteCode(json.codigoInvitacion);
    setInviteQR(`https://estudiar.btcj.com.ar/i/${json.codigoInvitacion}`);
    
  }

  useEffect(function () {
    fetchCode();
  }, []);

>>>>>>> Acomodado el invite, cambiado el codigo del toast

  const [selectedTab, setSelectedTab] = useState('Listado de alumnos');

  const copyToClipboard = () => {
    const str = inviteCode;
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

  useEffect(function () {
    const data = {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    };

    fetch("https://express-now-alpha-lac.now.sh/cursos/" + id, data)
      .then(res => res.json())
      .then(courseResponse => {
        setInviteCode(`http://estudiar.btcj.com.ar/i/${courseResponse.codigoInvitacion}`);
        setCourse(courseResponse);
        setLoading(false);
      });
  }, []);

  const handleSelectedTab = (tab) => { setSelectedTab(tabsMapper.find(eachTab => eachTab.key === tab).label); }

  return (
    <div>
      {loading ? <Loading /> : <React.Fragment>
        <div className="row w-100">
          <div className="col-sm-12 col-md-9 offset-md-3">
            <h1 className="text-center main-title" >{selectedTab}</h1>
          </div>
          <div className="col-sm-12">
            <Tab.Container defaultActiveKey="student-list" onSelect={handleSelectedTab}>
              <Row>
                <Col sm={12} md={3}>
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
                    <Nav.Item>
                      <Nav.Link eventKey="course-lessons">Lecciones</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12} md={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="student-list">
                      <StudentsList id={id} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="course-configuration">
                      <CourseConfiguration idCurso={id} course={course} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="invite">
                      <div className="card preview-card" context="main">
                        <div className="card-description">
                          <div className="row">
                            <div className="col-md-12">

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
                              <p className="link-url" ref={textAreaRef} onClick={copyToClipboard}>{inviteCode}</p>
                              <p className={` text-center faded-text${copySuccess ? "-visible" : ""}`}>Copiado al portapapeles!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="course-lessons">
                      <CourseLessons course={course} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </React.Fragment>
      }
    </div>
  );
};