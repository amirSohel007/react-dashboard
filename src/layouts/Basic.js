import React from "react";
import { Switch, Route } from "react-router-dom";


// core components


// dinamically create dashboard routes
import routes from "routes.js";

import LoginPage from "views/Pages/LoginPage";

function Basic() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/basic") {
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
      <div className="wrapper">
          <LoginPage/>
      </div>
    </>
  );
}

export default Basic;
