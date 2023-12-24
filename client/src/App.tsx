import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import ActorAddPage from "./pages/actor/ActorAddPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActorAllPage from "pages/actor/ActorAllPage";
import LayoutMain from "components/LayoutMain";
import ActorUpdatePage from "pages/actor/ActorUpdatePage";
import ActorDetailPage from "pages/actor/ActorDetailPage";
import HomePage from "pages/HomePage";
import WebsiteFormAdd from "features/website/WebsiteFormAdd";
import WebsiteUpdatePage from "pages/website/WebsiteUpdatePage";
import WebsiteAllPage from "pages/website/WebsiteAllPage";
import WebsiteDetailPage from "pages/website/WebsiteDetailPage";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<HomePage />} />
          <Route path="/actor-add" element={<ActorAddPage />} />
          <Route path="/actor-update/:id" element={<ActorUpdatePage />} />
          <Route path="/actor-all" element={<ActorAllPage />} />
          <Route path="/actor-id/:id" element={<ActorDetailPage />} />

          <Route path="/website-add" element={<WebsiteFormAdd />} />
          <Route path="/website-update/:id" element={<WebsiteUpdatePage />} />
          <Route path="/website-all" element={<WebsiteAllPage />} />
          <Route path="/website-id/:id" element={<WebsiteDetailPage />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
