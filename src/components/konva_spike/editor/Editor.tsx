import styled from "@emotion/styled";
import { Spacer } from "@loomhq/lens";
import { ActionButtons } from "./ActionButtons";
import { KonvaStage } from "./KonvaStage";

const Wrapper = styled.div`
  background: #f1f0f3;
  padding-top: 24px;
  flex-grow: 1;
`;

export function Editor() {
  return (
    <Wrapper>
      <KonvaStage />
      <Spacer bottom="medium" />
      <ActionButtons />
    </Wrapper>
  );
}
