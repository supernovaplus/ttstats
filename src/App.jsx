import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RefreshButton from './components/RefreshButton';
import { DataContextProvider } from './data/store';
import { AppSidemenu, AppContent, AppMainLayout, AppSidemenuDisplayItems } from './components';
import _nav from './data/_nav';
import _routes from './data/_routes';

export default function App() {
	return (
		<Router basename="/">
			{/* <Router basename="ttstats"> */}
			<DataContextProvider>
				<AppMainLayout>
					<AppSidemenu>
						<RefreshButton />
						<AppSidemenuDisplayItems navData={_nav} />
					</AppSidemenu>
					<AppContent>
						<Switch>
							{_routes.map((d, index) => {
								const Component = d.container;
								return (
									<Route path={d.path} key={`route-comp-${index}`}>
										<Component />
									</Route>
								);
							})}
						</Switch>
					</AppContent>
				</AppMainLayout>
			</DataContextProvider>
		</Router>
	);
}
