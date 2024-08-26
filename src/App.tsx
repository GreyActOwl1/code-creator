import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import NotFound from './pages/NotFound'; 
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/creators" element={<ShowCreators />} />
        <Route path="/creators/add" element={<AddCreator />} />
        <Route path="/creators/:id" element={<ViewCreator />} />
        {/* <Route path="/creators/:id/edit" element={<EditCreator />} /> */}
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
