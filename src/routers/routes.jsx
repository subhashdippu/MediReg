import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import PatientForm from "../components/patientForm";
import PatientList from "../components/patientList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <PatientForm />,
      },
      {
        path: "/patients",
        element: <PatientList />,
      },
    ],
  },
]);
export default router;
