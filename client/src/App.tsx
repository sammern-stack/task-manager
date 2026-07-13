import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useThemeStore } from "@/shared/stores";

const HomePage = lazy(() => import("@/pages/Home/Home"));
const NoteFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));
const LoadingPage = lazy(() => import("@/pages/Loading/Loading"));

const App = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
