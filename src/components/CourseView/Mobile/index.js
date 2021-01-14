import React, { useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Loading } from '../../Loading';
import { MenuMobile } from '../../Course/MenuMobile';
import { 
	FaStepForward,
	FaStepBackward,
} from "react-icons/fa";
import ReactPlayer from 'react-player';


import './styles.scss';

export const CourseMobile = ({moduleSelected, loading, course, changeModuleSelected}) => {

	useEffect(() => { }, [moduleSelected]);
	const changeModule = (lectionId, moduleId) => {
		const lectionIndex = course.lecciones.findIndex(lecture => lecture.id === lectionId);
		const selectedModule = course.lecciones[lectionIndex].modulos.find(mod => mod.id === moduleId);
		changeModuleSelected({...selectedModule, ...{leccionid: course.lecciones[lectionIndex].id}});
	};

	const hasNextLesson = () => {
		let hasNext = false;
		const lessonIndex = course.lecciones.findIndex(e => e.id === moduleSelected.leccionid);
		hasNext = course.lecciones.length > lessonIndex + 1 && course.lecciones[lessonIndex + 1].modulos.length;
		return hasNext;
	}

	const hasPrevLesson = () => {
		let hasPrev = false;
		const selectedLessonIndex = course.lecciones.findIndex(e => e.id === moduleSelected.leccionid);
		hasPrev = selectedLessonIndex > 0;
		return hasPrev;
	}

	const hasNextModule = () => {
		let hasNext = false;
		if (Object.keys(moduleSelected).length === 0) {
				if (course && course.lecciones && course.lecciones[0].modulos) {
						hasNext = true;
				}
		} else {
				const selectedLesson = course.lecciones.find(e => e.id === moduleSelected.leccionid);
				if(selectedLesson){
						const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
						hasNext = selectedLesson.modulos.length > moduleIndex + 1;
				}
		}
		return hasNext;
	}

	const hasPrevModule = () => {
		let hasPrev = false;
		if (Object.keys(moduleSelected).length !== 0) {
				const selectedLesson = course.lecciones.find(e => e.id === moduleSelected.leccionid);
				const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
				hasPrev = moduleIndex > 0;
		}
		return hasPrev;
	}

	const goPrevModule = () => {
		const selectedLessonIndex = course.lecciones.findIndex(e => e.id === moduleSelected.leccionid);
		if (hasPrevModule()) {
				const selectedLesson = course.lecciones.find(e => e.id === moduleSelected.leccionid);
				const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
				changeModule(course.lecciones[selectedLessonIndex].id, course.lecciones[selectedLessonIndex].modulos[moduleIndex - 1].id);
		} else {
				if (hasPrevLesson()) {
						changeModule(course.lecciones[selectedLessonIndex - 1].id, course.lecciones[selectedLessonIndex - 1].modulos[course.lecciones[selectedLessonIndex - 1].modulos.length - 1].id);
				}
		}
	}

	const goNextModule = () => {
		if (hasNextModule()) {
				if (Object.keys(moduleSelected).length !== 0) {
						const selectedLesson = course.lecciones.find(e => e.id === moduleSelected.leccionid);
						const moduleIndex = selectedLesson.modulos.findIndex(e => e.id === moduleSelected.id);
						changeModule(selectedLesson.id, selectedLesson.modulos[moduleIndex + 1].id);
				}
				else {
						if (course && course.lecciones && course.lecciones[0].modulos) {
								changeModule(course.lecciones[0].id, course.lecciones[0].modulos[0].id);
						}
				}
		} else {
				if (hasNextLesson()) {
						const selectedLessonIndex = course.lecciones.findIndex(e => e.id === moduleSelected.leccionid);
						changeModule(course.lecciones[selectedLessonIndex + 1].id, course.lecciones[selectedLessonIndex + 1].modulos[0].id);
				}
		}
	}


	return (
		<div>
			{ loading
				? <Loading />
				: 	<div>
						<h3 className="moduleTitle">{moduleSelected.nombre}</h3>
						<div className="contenido-modulo">
							{ moduleSelected.id
								? (
									<React.Fragment>
										<div
											dangerouslySetInnerHTML={{ __html: moduleSelected.contenido }} >
										</div>
										{
											moduleSelected.tipo === 1 &&
											<div className="text-center">
												<div className='player-wrapper'>
													<ReactPlayer className='react-player-course' url={moduleSelected.urlVideo} width='100%' height='65vh' controls />
												</div>
											</div>
										}

										{
											moduleSelected.tipo === 3 &&
											<>
												<p className="text-center"> Si no puedes ver el documento <a target="_blank" href={moduleSelected.urlDocumento} rel="noopener noreferrer"> haz click aqui </a> </p>
												<iframe title="pdfIframeMobile" width="100%" height="700" frameborder="1" src={`https://docs.google.com/gview?url=${moduleSelected.urlDocumento}&embedded=true`} rel="noopener noreferrer"></iframe>
											</>
											
										}
									</React.Fragment>
								) : <div className="text-center mt-5">
										<h2>Bienvenid@</h2>
										<p>Selecciona un modulo para comenzar</p>
										<div className="explicacion-mobile">
											<p>Encuentra tus lecciones en tu esquina inferior derecha</p>
										</div>
									</div>
							}
						</div>
						<MenuMobile 
							lecciones={course.lecciones}
							onModuleChange={(idLeccion, idModulo) => { changeModule(idLeccion, idModulo) }} 
						/>
						<Navbar collapseOnSelect expand="lg" className="mainNavbar fixed b-0 w-100 d-flex justify-content-center">
							<Row className="w-100">
								<Col sm={0} className='p-0'></Col>
								<Col sm={12} >
									<div className="d-flex flex-row justify-content-evenly w-100">
										<Button onClick={goPrevModule}><FaStepBackward /></Button>
										<Button onClick={goNextModule}><FaStepForward /></Button>
									</div>
								</Col>
							</Row>
						</Navbar>
					</div>
			}
		</div>
	);
};
