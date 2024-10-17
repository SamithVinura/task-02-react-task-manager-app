import { RouterProvider } from "react-router";
import { router } from "./routing/route";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
