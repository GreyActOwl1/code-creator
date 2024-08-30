import { Route, Routes } from "react-router-dom";

import ShowCreators from "./pages/showCreators";
import ViewCreator from "./pages/viewCreator";
import EditCreator from "./pages/editCreator";
import AddCreator from "./pages/addCreator";
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import About from "./pages/about";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/creators" element={<ShowCreators />} />
      <Route path="/creators/add" element={<AddCreator />} />
      <Route path="/creators/:id" element={<ViewCreator />} />
      <Route path="/creators/:id/edit" element={<EditCreator />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
