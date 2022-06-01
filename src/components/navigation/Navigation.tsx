import { Flex, useColorMode } from "@chakra-ui/react";
import { useUser } from "../../hooks/useUser";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useCallback } from "react";
import { ScreenNavigation } from "./ScreenNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { GlobalBackground } from "./GlobalBackground";
import { Title } from "../Title";

export const Navigation = () => {
  const { signIn, signOut } = useUser();
  const handleOAuthSignIn = useCallback(async (provider) => {
    const { error } = await signIn({ provider });
  }, []);

  const { isMobile } = useWindowSize();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex height="auto">
      <GlobalBackground isDark={isDark} />
      <Title></Title>
      {isMobile ? (
        <MobileNavigation signIn={handleOAuthSignIn} signOut={signOut} />
      ) : (
        <ScreenNavigation signIn={handleOAuthSignIn} signOut={signOut} />
      )}
    </Flex>
  );
};