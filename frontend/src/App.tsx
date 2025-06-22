import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { Route, Routes } from "react-router";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
      <button onClick={() => toast.success("nice")} className="btn btn-primary">
        Click me
      </button>
    </div>
  );
};

export default App;
