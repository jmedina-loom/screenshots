import styled from "@emotion/styled";
import screenshot from "../../assets/sample.png";
import { Button, Icon, Spacer, Text } from "@loomhq/lens";
import { SvgHighlightText } from "@loomhq/lens/icons/highlight-text";
import { SvgCrop169 } from "@loomhq/lens/icons/crop169";
import { SvgArrowRightAlt } from "@loomhq/lens/icons/arrow-right-alt";

const Wrapper = styled.div`
  background: #f1f0f3;
  padding-top: 24px;
  flex-grow: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const REMOVE_LEFT_BORDER_RADIUS =
  "0px var(--lns-radius-full) var(--lns-radius-full) 0px";
const REMOVE_RIGHT_BORDER_RADIUS =
  "var(--lns-radius-full) 0px 0px var(--lns-radius-full)";

const ActionButton = styled(Button)<{ side?: "left" | "right" }>`
  background-color: #d8d5dd;
  min-width: 116px;
  border: 0;

  ${(props) => {
    if (props.side === "left") {
      return `
        border-radius: ${REMOVE_RIGHT_BORDER_RADIUS};
      `;
    }

    if (props.side === "right") {
      return `
        border-radius: ${REMOVE_LEFT_BORDER_RADIUS};
      `;
    }

    return `
      border-radius: 0;
    `;
  }}
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
      <ButtonWrapper>
        <ButtonSection>
          <ActionButton size="large" side="left">
            <Icon icon={<SvgHighlightText />} />
          </ActionButton>
          <Text>Text</Text>
        </ButtonSection>
        <ButtonSection>
          <ActionButton size="large">
            <Icon icon={<SvgCrop169 />} />
          </ActionButton>
          <Text>Rectangle</Text>
        </ButtonSection>
        <ButtonSection>
          <ActionButton size="large" side="right">
            <Icon icon={<SvgArrowRightAlt />} />
          </ActionButton>
          <Text>Arrows</Text>
        </ButtonSection>
      </ButtonWrapper>
    </Wrapper>
  );
}
