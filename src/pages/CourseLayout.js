import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../Context';
import { CourseSidenav } from '../components/CourseSidenav';
import { CourseDesktop } from '../components/CourseView/Desktop';
import { CourseMobile } from '../components/CourseView/Mobile';

export default ({ id }) => {
	const { token } = useContext(Context);
	const [course, setCourse] = useState({});
	const [loading, setLoading] = useState(false);
	const [moduleSelected, setModuleSelected] = useState({});
	const [isMobile, setIsMobile] = useState(false);

	const handleWindowResize = () => { 
		setIsMobile(window.innerWidth < 766);
	};

	useEffect( () => {
		handleWindowResize();
	}, [])

	useEffect(() => {

			window.addEventListener('resize', handleWindowResize);

			setLoading(true);
			const data = {
					headers: new Headers({
							Authorization: "Bearer " + token
					})
			};
			fetch(`${process.env.REACT_APP_BASE_URL}/cursos/` + id, data)
					.then(res => res.json())
					.then(response => {
							setCourse(response);
							if (response && response.lecciones && response.lecciones[0] && response.lecciones[0].modulos) {
									setModuleSelected({...response.lecciones[0].modulos[0], ...{leccionid: response.lecciones[0].id}});
							}
							setLoading(false);
					});
			return () => { window.removeEventListener('resize', handleWindowResize); }
	}, [id]);

	return (
		<div>
			{ isMobile
				? 	<CourseMobile
						moduleSelected = { moduleSelected }
						loading = { loading }
						course = { course }
						changeModuleSelected = { setModuleSelected }
					/>
				:	<CourseSidenav 
						loading = { loading }
						course = { course }
						moduleSelected = { moduleSelected }
						changeModuleSelected = { setModuleSelected }>
							<CourseDesktop
								moduleSelected = { moduleSelected }
								loading = { loading }
								course = { course }
								changeModuleSelected = { setModuleSelected }
							/>
					</CourseSidenav>
			}
		</div>
	);
};
