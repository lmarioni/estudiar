import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../Context';
import '../styles/Global.scss'
import { ListOfCourses } from '../components/ListOfCourses';
import { NewCourseModal } from '../components/Modals/index.js';
import { ListCard } from "../components/ListCard";
import { Skeleton } from '../components/Skeleton';
import Toasts from "../components/Toasts/Toasts";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Helmet } from 'react-helmet'
import { connect } from "react-redux";
import { addToast } from "../actions";

const Home = ({ actions }) => {
  const { token } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastActions, setToastActions] = useState({});
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);

  useEffect(function () {
    setToastActions(actions);
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true);
    const data = {
      headers: new Headers({
        'Authorization': 'Bearer ' + token
      })
    }

    fetch(`${process.env.REACT_APP_BASE_URL}/cursos/`, data)
      .then(res => res.json())
      .then(response => {
        setCourses(response);
        setLoading(false);
      });
  }

  const openNewCourseModal = () => {
    setShowNewCourseModal(true);
  }

  const newModuleModalCallBackData = (data) => {
    if (data.create) {
      const { addToast } = toastActions;
      if (data.status === 'success') {
        fetchCourses();
        addToast({ text: data.message });
      } else {
        addToast({ color: '#F97A85', text: data.message });
      }
    }
    data.close && setShowNewCourseModal(false);
  }



  return (
    <div>
      <Helmet>
        <title> Estudi.ar | BTCJ </title>
      </Helmet>
      <Toasts />
      <NewCourseModal callback={newModuleModalCallBackData} showModal={showNewCourseModal} />
      <div className="d-flex flex-column w-100">
        <div className="row w-100">
          <div className="col-md-12">
            <h1 className="text-center mb-5 mt-3 main-title" >Mis cursos</h1>
          </div>
        </div>
        <div className="col-md-10 offset-md-1 d-flex flex-row justify-content-md-end pr-3">
          <button onClick={() => { openNewCourseModal() }} className="btn btn-primary">Crear curso</button>
        </div>
        <div className="row w-100">
          <div className="col-md-10 offset-md-1">
            {
              loading ?
                <div>
                  <ListCard description={<Skeleton count={1} color="#bbb" />} />
                  <ListCard description={<Skeleton count={1} color="#bbb" />} />
                  <ListCard description={<Skeleton count={1} color="#bbb" />} />
                </div>
                :
                <ListOfCourses courses={courses} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {
  actions: PropTypes.shape({
    addToast: PropTypes.func.isRequired
  }).isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addToast }, dispatch)
});

export default connect(null, mapDispatchToProps)(Home);