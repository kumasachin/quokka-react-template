import React from "react";
import { useAuthContext } from "../context/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
  roles?: string[];
}

export default function RequireAuth({ children, roles }: RequireAuthProps) {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Login required</h2>
      </div>
    );
  }
  if (roles && !roles.includes(user.role || "")) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Access denied</h2>
      </div>
    );
  }
  return <>{children}</>;
}
