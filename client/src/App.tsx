import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";

const HomePage = lazy(() => import("@/pages/Home/Home"));
const NoteFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));
const LoadingPage = lazy(() => import("@/pages/Loading/Loading"));

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="*" element={<NoteFoundPage />}/>
      </Routes>
    </Suspense>
  );
};

export default App;
