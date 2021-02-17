import { axios_auth } from 'api';
import image1 from 'assets/img/full-screen-image-1.jpg';
import image2 from 'assets/img/full-screen-image-2.jpg';
import image3 from 'assets/img/full-screen-image-3.jpg';
import image4 from 'assets/img/full-screen-image-4.jpg';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
// core components
import Sidebar from 'components/Sidebar/Sidebar.js';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
// dinamically create dashboard routes
import routes from 'routes.js';



function Admin() {
	const [sidebarImage, setSidebarImage] = React.useState(image3);
	const [sidebarBackground, setSidebarBackground] = React.useState('black');
	const [user, setUser] = useState();

	// To get the user details..
	const getUserDetails = async () => {
		const res = await axios_auth.get('/services/services/api/account');
		if (res.data) {
			const { firstName, email, id } = res.data;
			const user = {
				firstName,
				email,
				id,
			};
			setUser(user);
			//Set user details in local Stroge
			localStorage.setItem('user', JSON.stringify(user));
		}
	};
	useEffect(() => {
		getUserDetails();
	}, []);

	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return getRoutes(prop.views);
			}
			if (prop.layout === '/admin') {
				return (
					<Route
						path={prop.layout + prop.path}
						key={key}
						component={prop.component}
					/>
				);
			} else {
				return null;
			}
		});
	};
	return (
		<>
			<div className='wrapper'>
				<Sidebar
					routes={routes}
					image={sidebarImage}
					background={sidebarBackground}
					username={user?.firstName}
				/>
				<div className='main-panel'>
					<AdminNavbar />
					<div className='content'>
						<Switch>{getRoutes(routes)}</Switch>
					</div>
					<AdminFooter />
					<div
						className='close-layer'
						onClick={() =>
							document.documentElement.classList.toggle('nav-open')
						}
					/>
				</div>
			</div>
			<FixedPlugin
				setSidebarImageParent={(value) => setSidebarImage(value)}
				sidebarDefaultImage={sidebarImage}
				sidebarImages={[image1, image2, image3, image4]}
				backgroundColors={[
					'black',
					'azure',
					'green',
					'orange',
					'red',
					'purple',
				]}
				backgroundColor={sidebarBackground}
				setSidebarBackgroundParent={(value) => setSidebarBackground(value)}
			/>
		</>
	);
}

export default Admin;
