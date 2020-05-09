import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Skeleton } from '../Skeleton';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ListCard } from "../ListCard";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToast } from "../../actions";
import { MdBuild } from "react-icons/md";
import { FaTrash, FaPlus } from "react-icons/fa";
import {
    NewLessonModal,
    NewModuleModal,
    ConfirmationDeleteModal,
    ConfirmationDeleteModuleModal,
    EditModuleModal,
    EditLessonModal,
} from '../Modals/index.js';
import EmptyBook from '../../assets/img/emptyBook.png';

const CourseLessons = ({ course, actions }) => {

    const { token } = useContext(Context);
    const [toastActions, setToastActions] = useState({});

    const [invitationCode, setInvitationCode] = useState('');
    const [picture, setPicture] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [title, setTitle] = useState('');
    const [courseId, setCourseId] = useState('');

    const [lesson, setLesson] = useState({});
    const [selectedModule, setSelectedModule] = useState({}); //Module es una palabra reservada, CUAK
    const [lessons, setLessons] = useState([]);
    const [deleteLesson, setDeleteLesson] = useState({});
    const [deleteModule, setDeleteModule] = useState({});

    const [loading, setLoading] = useState(true);

    const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
    const [showConfirmationModuleDelete, setShowConfirmationModuleDelete] = useState(false);
    const [showNewLesson, setShowNewLesson] = useState(false);
    const [showNewModule, setShowNewModule] = useState(false);
    const [showEditModule, setShowEditModule] = useState(false);
    const [showEditLesson, setShowEditLesson] = useState(false);

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

    const openLessonModal = () => {
        setShowNewLesson(true);
    }

    const openModuleModal = (moduleLesson) => {
        setShowEditModule(true);
        setSelectedModule(moduleLesson);
    }

    const openLessonEditModal = (lesson) => {
        setShowEditLesson(true);
        setLesson(lesson);
    }

    const openDeleteModuleModal = (moduleLesson) => {
        setDeleteModule(moduleLesson);
        setShowConfirmationModuleDelete(true);
    }

    const openNewModule = (courseLesson) => {
        setLesson(courseLesson);
        setShowNewModule(true);
    }

    const openDeleteConfirmationModal = (courseLesson) => {
        setDeleteLesson(courseLesson);
        setShowConfirmationDelete(true);
    }

    const newLessonModalCallBackData = (data) => {
        const { addToast } = toastActions;
        if (data.status === 'success') {
            if (data.create) {
                setLoading(true);
                const newLessonArray = lessons;
                newLessonArray.push(data.leccion);
                setLessons(newLessonArray);
                addToast({ text: data.message });
                setLoading(false);
            }
        } else {
            addToast({ color: 'red', text: data.message });
        }
        data.close && setShowNewLesson(false);
    }

    const newModuleModalCallBackData = (data) => {
        data.close && setShowNewModule(false);
        const { addToast } = toastActions;
        if (data.status === 'success') {
            if (data.create) {
                setLoading(true);
                const newLessonArray = lessons.map(singleLesson => {
                    if (singleLesson.id === parseInt(data.module.leccionid)) {
                        const lessonModules = singleLesson && singleLesson.modulos && singleLesson.modulos.length ? singleLesson.modulos : [];
                        lessonModules.push(data.module);
                        singleLesson.modulos = lessonModules;
                    }
                    return singleLesson;
                });
                setLessons(newLessonArray);
                addToast({ text: data.message });
                setLoading(false);
            }
        } else {
            addToast({ color: 'red', text: data.message });
        }
    }

    const editModuleModalCallBackData = (data) => {
        const { addToast } = toastActions;
        if (data.status === 'success') {
            if (data.edit) {
                setLoading(true);
                let lessonsAux = lessons.slice()
                for (var i = 0; i < lessonsAux.length; i++) {
                    if (lessonsAux[i].modulos.length > 0) {
                        for (var j = 0; j < lessonsAux[i].modulos.length; j++) {
                            if (lessonsAux[i].modulos[j].id === data.modulo.id) {
                                lessonsAux[i].modulos[j] = data.modulo
                            }
                        }
                    }
                }
                setLessons(lessonsAux)
                addToast({ text: data.message });
                setLoading(false);
            }
        } else {
            addToast({ color: 'red', text: data.message });
        }
        data.close && setShowEditModule(false);
    }

    const editLessonModalCallBackData = (data) => {
        const { addToast } = toastActions;
        if (data.status === 'success') {
            if (data.edit) {
                setLoading(true);
                lessons.forEach(eachLesson => {
                    if (eachLesson.id === parseInt(data.editedLesson.id)) {
                        eachLesson.nombre = data.editedLesson.nombre
                    } else {
                        eachLesson.nombre = ''
                    }
                });
                addToast({ text: data.message });
                setLoading(false);
            }
        } else {
            addToast({ color: 'red', text: data.message });
        }
        data.close && setShowEditLesson(false);
    }

    const deleteModuleModalCallBackData = (data) => {
        const { addToast } = toastActions;
        if (data.status === 'success') {
            if (data.delete) {
                setLoading(true);
                const newLessonArray = lessons.map(singleLesson => {
                    if (singleLesson.id === parseInt(deleteModule.leccionid)) {
                        const lessonModules = singleLesson.modulos.filter(mod => mod.id !== deleteModule.id);
                        singleLesson.modulos = lessonModules;
                    }
                    return singleLesson;
                });
                setLessons(newLessonArray);
                addToast({ text: data.message });
                setLoading(false);
            }
        } else {
            addToast({ color: 'red', text: data.message });
        }
        data.close && setShowConfirmationModuleDelete(false);
    }

    const deleteModalCallBackData = (data) => {
        const { addToast } = toastActions;
        if (data.status === 'success') {
            if (data.delete) {
                setLoading(true);
                const newLessonArray = lessons.filter(lesson => lesson.id !== deleteLesson.id);
                addToast({ text: data.message });
                setLessons(newLessonArray);
                setLoading(false);
            }
        } else {
            addToast({ color: 'red', text: data.message });
        }
        data.close && setShowConfirmationDelete(false);
    }

    const NoLessonsFound = () => {
        return (
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body text-center">
                            <h4>No tienes unidades cargadas aún. </h4>
                            <p>Crea una nueva unidad o haciendo click <a className="pointer text-primary" onClick={openLessonModal}>aqui</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderDescription = (modules) => {
        return (
            <ListGroup variant="flush">
                {modules && modules.length ?
                    modules.map(module =>
                        <ListGroup.Item key={`module-${module.id}`} className="pr-0">
                            {module.nombre}
                            <div onClick={() => { openDeleteModuleModal(module) }} className="float-right btn btn-outline-secondary"><FaTrash /></div>
                            <div onClick={() => { openModuleModal(module) }} className="float-right btn btn-outline-primary mr-1" ><MdBuild /></div>
                        </ListGroup.Item>) : null}
            </ListGroup>
        )
    }

    return (
        <div>
            <NewLessonModal callback={newLessonModalCallBackData} showModal={showNewLesson} courseid={course.id} />
            <NewModuleModal callback={newModuleModalCallBackData} showModal={showNewModule} fulllesson={lesson} />
            <EditModuleModal callback={editModuleModalCallBackData} showModal={showEditModule} fullModule={selectedModule} />
            <EditLessonModal callback={editLessonModalCallBackData} showModal={showEditLesson} lesson_id={lesson.id} />
            <ConfirmationDeleteModal callback={deleteModalCallBackData} showModal={showConfirmationDelete} lessonToDelete={deleteLesson} />
            <ConfirmationDeleteModuleModal callback={deleteModuleModalCallBackData} showModal={showConfirmationModuleDelete} moduleToDelete={deleteModule} />
            {
                loading ?
                    <Skeleton count="1" color="#f4f4f4" /> : (
                        <div>
                            <div className="w-100 d-flex flex-row justify-content-between">
                                <h3>{title}</h3>
                                <div>
                                    <Button onClick={() => { openLessonModal() }}> Nueva Unidad </Button>
                                </div>

                            </div>
                            <hr />
                            {lessons && lessons.length ?
                                lessons.map(courseLesson => {
                                    return (
                                        <React.Fragment key={`course-${courseLesson.id}`}>
                                            <ListCard
                                                title={courseLesson.nombre}
                                                subtitle={`${courseLesson.modulos && courseLesson.modulos.length ? courseLesson.modulos.length : 'Sin'} modulos`}
                                                description={renderDescription(courseLesson.modulos)}
                                                action={
                                                    <div className="float-right">
                                                        <div className="btn btn-outline-primary mr-1" onClick={() => { openNewModule(courseLesson) }}><FaPlus /></div>
                                                        <div className="btn btn-outline-secondary mr-1" onClick={() => { openLessonEditModal(courseLesson) }}><MdBuild /></div>
                                                        {
                                                            courseLesson && courseLesson.modulos && courseLesson.modulos.length ?
                                                                (<OverlayTrigger
                                                                    key="top"
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-delete`}> Parece que la unidad que quiere eliminar tiene módulos asociados, eliminelos antes de eliminar la unidad. </Tooltip>
                                                                    }>
                                                                    <div className="btn btn-outline-secondary"><FaTrash /></div>
                                                                </OverlayTrigger>)
                                                                :
                                                                (<div className="btn btn-outline-secondary" onClick={() => { !courseLesson.modulos.length ? openDeleteConfirmationModal(courseLesson) : '' }}><FaTrash /></div>)
                                                        }

                                                    </div>
                                                }
                                            />
                                        </React.Fragment>
                                    )
                                }) : <NoLessonsFound />}
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