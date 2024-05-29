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
      <ActionSection>
        <Button icon={<SvgDownload />}>Download</Button>
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
    </Wrapper>
  );
}
