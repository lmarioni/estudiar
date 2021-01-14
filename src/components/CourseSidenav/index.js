
import React, { useEffect, useState } from 'react';
import Accordion from '../Accordion';
import { Loading } from '../Loading';
import "./styles.scss";

export const CourseSidenav = ({ children, course, moduleSelected, loading, changeModuleSelected }) => {
	
	const collapsable = false;
	
	useEffect(() => { }, [moduleSelected]);
	

	const getList = (lection) => (
		lection.modulos.map(
			mod => (
				{
					'id': mod.id,
					'lectionId': lection.id,
					'title': mod.nombre,
					'type': mod.tipo
				}
			)
		)
	);

	const changeModule = (lectionId, moduleId) => {
		const lectionIndex = course.lecciones.findIndex(lecture => lecture.id === lectionId);
		const selectedModule = course.lecciones[lectionIndex].modulos.find(mod => mod.id === moduleId);
		changeModuleSelected({...selectedModule, ...{leccionid: course.lecciones[lectionIndex].id}});
	};

	const CourseSelectedTitle = () => (
		loading 
			? "Cargando . . ."
			: <h4 className="courseTitle"> {moduleSelected.nombre} </h4>
	)

	const CourseModules = () => {
		return (
			course 
			&& course.lecciones
			? course.lecciones.map(
				lection => (
					<Accordion
						key={`accordion-${lection.id}`}
						title={lection.nombre}
						collapsed={collapsable}
						list={getList(lection)}
						callback={(cbItem) => { changeModule(cbItem.lectionId, cbItem.id) }}
					/>)
				)
			: <Loading />);
	}

	return (
		<div>
			<div className="sidenav">
				{ loading
					? <p className="center">Cargando . . .</p>
					: <div> <CourseSelectedTitle /> <CourseModules /> </div>}
			</div>
			<div className="content">
				{children}
			</div>
		</div>
	)
}
