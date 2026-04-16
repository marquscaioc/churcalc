import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./chuckchur (1).jsx";
import PedsPage from "./peds.jsx";
import TreinoPage from "./treino.jsx";
import BusinessPage from "./business.jsx";

function Root() {
  const [page, setPage] = useState("calc");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const go = (p) => setPage(p);

  if (page === "peds") return <PedsPage onBack={() => go("calc")} />;
  if (page === "treino") return <TreinoPage onBack={() => go("calc")} />;
  if (page === "business") return <BusinessPage onBack={() => go("calc")} />;
  return <App onPeds={() => go("peds")} onTreino={() => go("treino")} onBusiness={() => go("business")} />;
}

createRoot(document.getElementById("root")).render(<Root />);
