import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Skeleton } from '../Skeleton';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdBuild } from "react-icons/md";
import { ListCard } from "../ListCard";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToast } from "../../actions";
import { FaTrash, FaPlus } from "react-icons/fa";

import { ConfirmationDeleteModal, NewLessonModal, EditModuleModal } from './modals/index.js';

const CourseLessons = ({ course, actions }) => {

    const { token } = useContext(Context);
    const [toastActions, setToastActions] = useState({});

    const [invitationCode, setInvitationCode] = useState('');
    const [picture, setPicture] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [title, setTitle] = useState('');
    const [courseId, setCourseId] = useState('');

    const [lesson, setLesson] = useState({});
    const [lessons, setLessons] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
    const [showNewLesson, setShowNewLesson] = useState(false);
    const [showEditModule, setShowEditModule] = useState(false);

    const [deleteLesson, setDeleteLesson] = useState({});

    useEffect(() => {
        if (course) {
            const { codigoInvitacion, imagen, imagen_perfil, lecciones, nombre, id } = course;
            setInvitationCode(codigoInvitacion);
            setPicture(imagen);
            setCourseId(id);
            setProfilePicture(imagen_perfil);
            setTitle(nombre);
            setLessons(lecciones);
            setToastActions(actions);
            setLoading(false);
        }
    }, []);


    const renderDescription = (modules) => {
        return (
            <ListGroup variant="flush">
                {modules && modules.length ?
                    modules.map(module => <ListGroup.Item key={`module-${module.id}`}> {module.nombre} <Button onClick={() => { openModuleModal(module) }} className="float-right"> <MdBuild />  </Button></ListGroup.Item>) : null}
            </ListGroup>
        )
    }


    const openLessonModal = () => {
        setShowNewLesson(true);
    }

    const openModuleModal = (moduleLesson) => {
        setShowEditModule(true);
        setLesson(moduleLesson);
    }
    const openDeleteConfirmationModal = (courseLesson) => {
        setDeleteLesson(courseLesson);
        setShowConfirmationDelete(true);
    }

    const addNewModule = () => {
        console.log('add new module');
    }

    const editModalCallBackData = (data) => {
        if (data.edit) {
            const { addToast } = toastActions;
            if (data.status === 'success') {
                setLoading(true);
                addToast({ text: data.message });
                setLoading(false);
            } else {
                addToast({ color: '#F97A85', text: data.message });
            }
        }
        data.close ? setShowEditModule(false) : '';
    }

    const newLessonModalCallBackData = (data) => {
        if (data.create) {
            const { addToast } = toastActions;
            if (data.status === 'success') {
                setLoading(true);
                const newLessonArray = lessons;
                newLessonArray.push(data.leccion);
                setLessons(newLessonArray);
                addToast({ text: data.message });
                setLoading(false);
            } else {
                addToast({ color: '#F97A85', text: data.message });
            }
        }
        data.close ? setShowNewLesson(false) : '';
    }

    const deleteModalCallBackData = (data) => {
        if (data.delete) {
            const { addToast } = toastActions;
            if (data.status === 'success') {
                setLoading(true);
                const newLessonArray = lessons.filter(lesson => lesson.id !== deleteLesson.id);
                addToast({ text: data.message });
                setLessons(newLessonArray);
                setLoading(false);
            } else {
                addToast({ color: '#F97A85', text: data.message });
            }
        }
        data.close ? setShowConfirmationDelete(false) : '';
    }

    return (
        <div>


            <NewLessonModal callback={newLessonModalCallBackData} showModal={showNewLesson} courseid={course.id} />
            <EditModuleModal callback={editModalCallBackData} showModal={showEditModule} fulllesson={lesson}/>
            <ConfirmationDeleteModal callback={deleteModalCallBackData} showModal={showConfirmationDelete} lessonToDelete={deleteLesson} />
            {
                loading ?
                    <Skeleton count="1" color="#f4f4f4" /> : (
                        <div>
                            <div className="w-100 d-flex flex-row justify-content-between">
                                <h3>{title}</h3>
                                <Button onClick={() => { openLessonModal() }}> Nueva leccion </Button>

                            </div>

                            {lessons && lessons.map(courseLesson => {
                                return (
                                    <React.Fragment key={`course-${courseLesson.id}`}>
                                        <ListCard
                                            title={courseLesson.nombre}
                                            subtitle={`${courseLesson.modulos && courseLesson.modulos.length ? courseLesson.modulos.length : 'Sin'} modulos`}
                                            description={renderDescription(courseLesson.modulos)}
                                            action={
                                                <div className="float-right">
                                                    <div className="btn btn-outline-primary mr-1" onClick={() => { addNewModule(courseLesson) }}><FaPlus /></div>
                                                    <div className="btn btn-outline-secondary" onClick={() => { openDeleteConfirmationModal(courseLesson) }}><FaTrash /></div>
                                                </div>
                                            }
                                        />
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    )
            }

        </div>
    )
}

CourseLessons.propTypes = {
    actions: PropTypes.shape({
        addToast: PropTypes.func.isRequired
    }).isRequired
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ addToast }, dispatch)
});

export default connect(null, mapDispatchToProps)(CourseLessons);