"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withRole = (Component, allowedRoles) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        // Not logged in → redirect to login
        router.push("/login");
      } else if (!allowedRoles.includes(user.role)) {
        // Logged in but not authorized → redirect to their homepage
        if (user.role === "user") router.push("/");
        else if (user.role === "doctor") router.push("/doctor");
        else if (user.role === "admin") router.push("/admin");
      }
    }, []);

    return <Component {...props} />;
  };
};

export default withRole;
