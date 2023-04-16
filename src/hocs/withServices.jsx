import React from "react";
import ServicesContext from "../contexts/servicesContext";

function withServices() {
  return (Wrapped) => {
    return (props) => (
      <ServicesContext.Consumer>
        {(services) => <Wrapped {...props} services={services} />}
      </ServicesContext.Consumer>
    );
  };
}

export default withServices;
