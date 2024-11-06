import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";

export const useAuth = (): AuthContextI => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
