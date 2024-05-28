import styled from "@emotion/styled";
import { Avatar, Button, IconButton, Logo, Text } from "@loomhq/lens";
import { SvgBell } from "@loomhq/lens/icons/bell";
import { SvgDownload } from "@loomhq/lens/icons/download";
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

export function Header() {
  return (
    <Wrapper data-id="header-wrapper">
      <TitleSection>
        <IconWrapper>
          <IconButton altText="Menu" icon={<SvgMenu />} />
          <Logo variant="symbol" maxWidth={4} />
        </IconWrapper>
        <Title>
          <Text size="large" fontWeight="bold">
            May 22, 2024 2:14:53 pm - Screenshot
          </Text>
          <Text size="medium" fontWeight="book" color="bodyDimmed">
            Jose Medina - Just Now
          </Text>
        </Title>
      </TitleSection>
      <ActionSection>
        <Button icon={<SvgDownload />}>Download</Button>
        <Button icon={<SvgUsersAdd />} variant="primary">
          Share
        </Button>
        <IconButton altText="Search" icon={<SvgSearch />}></IconButton>
        <IconButton altText="Notification" icon={<SvgBell />}></IconButton>
        <Avatar letter="JM" />
      </ActionSection>
    </Wrapper>
  );
}
