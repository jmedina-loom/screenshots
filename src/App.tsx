import "./util/styleUtils";
import "./App.css";
import styled from "@emotion/styled";
import { Header } from "./components/header/Header";
import { Editor } from "./components/editor/Editor";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* border: 1px solid blue; */
`;

function App() {
  return (
    <Wrapper>
      <Header />

      <Editor />
    </Wrapper>
  );
}

export default App;
