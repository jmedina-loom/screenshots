import styled from "@emotion/styled";
import screenshot from "../../assets/sample.png";

const Wrapper = styled.div`
  background: #f1f0f3;
`;

export function Editor() {
  return (
    <Wrapper>
      This is the editor
      <img className="base-img" src={screenshot} alt="screenshot" />
    </Wrapper>
  );
}
