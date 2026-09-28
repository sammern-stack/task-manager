import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import { Dialog, Toast } from "@/shared/components";
import { useTheme } from "@/features/settings";

const HomePage = lazy(() => import("@/pages/Home/Home"));
const NoteFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));
const LoadingPage = lazy(() => import("@/pages/Loading/Loading"));

const App = () => {
  useTheme();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
      <Dialog />
      <Toast />
    </Suspense>
  );
};

export default App;
