import styled from "@emotion/styled";
import {
  Arrange,
  Avatar,
  Button,
  Icon,
  IconButton,
  Logo,
  Text,
} from "@loomhq/lens";
import { SvgBell } from "@loomhq/lens/icons/bell";
import { SvgDownload } from "@loomhq/lens/icons/download";
import { SvgLink } from "@loomhq/lens/icons/link";
import { SvgMenu } from "@loomhq/lens/icons/menu";
import { SvgSearch } from "@loomhq/lens/icons/search";
import { SvgUsersAdd } from "@loomhq/lens/icons/users-add";
import { useEditStore } from "../../store/EditStore";
import { SvgReplay } from "@loomhq/lens/icons/replay";
import { SvgBack } from "@loomhq/lens/icons/back";
import { SvgForward } from "@loomhq/lens/icons/forward";

const Wrapper = styled.div`
  display: flex;
  padding: 12px 20px;
  align-items: center;
  justify-content: space-between;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Title = styled.div`
  padding-left: 16px;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 16px;
`;

export function Header({ title }: { title: string }) {
  return (
    <Wrapper data-id="header-wrapper">
      <TitleSection>
        <IconWrapper>
          <IconButton altText="Menu" icon={<SvgMenu />} />
          <Logo variant="symbol" maxWidth={4} />
        </IconWrapper>
        <Title>
          <Text size="large" fontWeight="bold">
            {title}
          </Text>
          <Text size="medium" fontWeight="book" color="bodyDimmed">
            Jose Medina - Just Now
          </Text>
        </Title>
      </TitleSection>
      <Actions />
    </Wrapper>
  );
}

function Actions() {
  const { editMode, setEditMode, setDownloadImg } = useEditStore();

  if (editMode) {
    return (
      <ActionSection>
        <Button icon={<SvgReplay />} style={{ border: 0 }}>
          Reset
        </Button>
        <Button icon={<SvgBack />} style={{ border: 0 }}>
          Undo
        </Button>
        <Button
          icon={<SvgForward />}
          iconPosition="right"
          style={{ border: 0 }}
        >
          Redo
        </Button>
        <Button
          icon={<SvgDownload />}
          variant="primary"
          onClick={() => setEditMode(null)}
        >
          Save edits
        </Button>
        <Button onClick={() => setEditMode(null)}>Cancel</Button>
      </ActionSection>
    );
  }

  return (
    <ActionSection>
      <Button icon={<SvgDownload />} onClick={() => setDownloadImg(true)}>
        Download
      </Button>
      <Arrange gap="1px">
        <Button
          icon={<SvgUsersAdd />}
          variant="primary"
          style={{
            borderRadius:
              "var(--lns-radius-full) 0px 0px var(--lns-radius-full)",
          }}
        >
          Share
        </Button>
        <Button
          variant="primary"
          style={{
            borderRadius:
              "0px var(--lns-radius-full) var(--lns-radius-full) 0px",
          }}
        >
          <Icon icon={<SvgLink />} color="background"></Icon>
        </Button>
      </Arrange>
      <IconButton altText="Search" icon={<SvgSearch />}></IconButton>
      <IconButton altText="Notification" icon={<SvgBell />}></IconButton>
      <Avatar letter="JM" />
    </ActionSection>
  );
}
