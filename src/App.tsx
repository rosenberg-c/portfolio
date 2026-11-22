import { Route, Routes } from "react-router";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { Projects } from "./pages/Projects/Projects";
import { SiteLayout } from "./features/site-layout/SiteLayout";
import { paths } from "./routes";

export const App = () => {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path={paths.about} element={<About />} />
        <Route path={paths.projects} element={<Projects />} />
        <Route path={paths.contact} element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
