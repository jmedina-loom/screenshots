import styled from "@emotion/styled";
import screenshot from "../../../assets/sample.png";
import { Spacer } from "@loomhq/lens";
import { ActionButtons } from "../../common/ActionButtons";

const Wrapper = styled.div`
  background: #f1f0f3;
  padding-top: 24px;
  flex-grow: 1;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export function Editor() {
  return (
    <Wrapper>
      <ImageWrapper>
        <img className="base-img" src={screenshot} alt="screenshot" />
      </ImageWrapper>
      <Spacer bottom="medium" />
      <ActionButtons />
    </Wrapper>
  );
}
