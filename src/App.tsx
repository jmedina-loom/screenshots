import "./util/styleUtils";
import "./App.css";
import styled from "@emotion/styled";
import { KonvaSpike } from "./components/konva_spike/KonvaSpike";
import { useMemo } from "react";
import { FiberSpike } from "./components/fiber_spike/FiberSpike";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* border: 1px solid blue; */
`;

function App() {
  const initPage = useMemo(() => getInitialPage(), []);

  return (
    <Wrapper>{initPage === "konva" ? <KonvaSpike /> : <FiberSpike />}</Wrapper>
  );
}

function getInitialPage(): "konva" | "fiber" {
  const url = new URL(window.location.href);

  const params = url.searchParams;

  const page = params.get("page");

  return page === "fiber" ? "fiber" : "konva";
}

export default App;
