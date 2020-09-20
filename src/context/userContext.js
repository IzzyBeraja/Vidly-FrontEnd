import React from "react";
import auth from "../services/authService";

const UserContext = React.createContext();

UserContext.user = auth.getCurrentUser();

export default UserContext;
