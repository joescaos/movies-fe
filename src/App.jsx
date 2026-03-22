import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppRoutes } from "./appRouter";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
