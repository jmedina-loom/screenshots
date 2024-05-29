import styled from "@emotion/styled";
import { Button, Icon, Text } from "@loomhq/lens";
import { SvgHighlightText } from "./SvgHighlightText";
import { SvgCrop169 } from "@loomhq/lens/icons/crop169";
import { SvgArrowRightAlt } from "@loomhq/lens/icons/arrow-right-alt";
import { EditMode, useEditStore } from "../../store/EditStore";
import { useCallback } from "react";

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

const SelectedActionWrapper = styled.div<{ side?: "left" | "right" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d8d5dd;

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

const SelectionAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 calc(2.5 * var(--lns-unit, 8px));
  min-width: 116px;
  height: calc(7 * var(--lns-unit, 8px));
  background: var(--lns-color-primary);
  border-radius: 100px;
`;

const ActionButtonContainer = ({
  action,
  side,
  icon,
}: {
  action: EditMode;
  icon: React.ReactNode;
  side?: "left" | "right";
}) => {
  const { editMode, setEditMode } = useEditStore();

  console.log({ editMode });

  const onModeClick = useCallback(
    (mode: EditMode) => () => setEditMode(mode),
    [setEditMode]
  );

  if (action === editMode) {
    return (
      <SelectedActionWrapper side={side}>
        <SelectionAction>
          <Icon icon={icon} color="white" />
        </SelectionAction>
      </SelectedActionWrapper>
    );
  }

  return (
    <ActionButton size="large" side={side} onClick={onModeClick(action)}>
      <Icon icon={icon} />
    </ActionButton>
  );
};

export function ActionButtons() {
  return (
    <ButtonWrapper>
      <ButtonSection>
        <ActionButtonContainer
          action={EditMode.Text}
          side="left"
          icon={<SvgHighlightText />}
        />
        <Text>Text</Text>
      </ButtonSection>
      <ButtonSection>
        <ActionButtonContainer
          action={EditMode.Rectangle}
          icon={<SvgCrop169 />}
        />

        <Text>Rectangle</Text>
      </ButtonSection>
      <ButtonSection>
        <ActionButtonContainer
          action={EditMode.Arrow}
          side="right"
          icon={<SvgArrowRightAlt />}
        />
        <Text>Arrows</Text>
      </ButtonSection>
    </ButtonWrapper>
  );
}
