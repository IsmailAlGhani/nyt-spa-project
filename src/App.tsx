import { Routes, Route } from "react-router";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
