import BoardsScreen from "./pages/BoardsScreen";
import ListScreen from "./pages/ListScreen";
import MainAppBar from "./pages/components/appbars/MainAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainAppBar />
        <Routes>
          <Route path="/" element={<BoardsScreen />}></Route>
          <Route path="/:boardId" element={<ListScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
