import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: "url('/background.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        objectFit: "contain",
        zIndex: 5,
      }}
    >
      <Outlet />
    </div>
  );
};

export default Root;
