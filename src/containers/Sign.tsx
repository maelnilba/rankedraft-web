import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Flex,
  Divider,
  Stack,
  Spacer,
  Heading,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import {
  CookiesContextProvider,
  CookiesRequest,
} from "../components/CookiesConsent";
import { FormSignIn } from "../components/sign/FormSignIn";
import { FormSignUp } from "../components/sign/FormSignUp";
import { Header } from "../components/sign/Header";
import { RecoverPasswordForEmail } from "../components/sign/RecoverPasswordForEmail";
import { SignInWithProvider } from "../components/sign/SignInWithProvider";
import { useTheme } from "../hooks/useTheme";

export const Sign = ({
  borderTopLeftRadius,
}: {
  borderTopLeftRadius?: number | string;
}) => {
  const { t } = useTranslation(["sign"]);
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);
  const { isDark, theme } = useTheme();

  return (
    <CookiesContextProvider>
      <CookiesRequest />
      <Flex
        bgColor={isDark ? theme[100] : theme[200]}
        flex={1}
        direction="column"
        padding={8}
        borderTopLeftRadius={borderTopLeftRadius}
      >
        <Header />
        <Divider w="100%" marginY={5} />
        {hidden && (
          <>
            <Stack>
              <SignInWithProvider method="signIn" />
              <FormSignIn />
              <RecoverPasswordForEmail />
            </Stack>
            <Spacer />
          </>
        )}

        <div>
          {hidden && (
            <Stack width="100%">
              <Heading fontSize="2vmax">{t("NotAccount")}</Heading>
              <Button
                borderRadius="full"
                variant="outline"
                w="100%"
                {...getButtonProps()}
              >
                {t("SignUp")}
              </Button>
            </Stack>
          )}
          <Flex position="relative" overflow={"hidden"} height="100vh">
            <motion.div
              {...getDisclosureProps()}
              hidden={hidden}
              initial={false}
              onAnimationStart={() => setHidden(false)}
              onAnimationComplete={() => setHidden(!isOpen)}
              animate={{
                left: isOpen ? 0 : 200,
                opacity: isOpen ? 1 : 0.2,
              }}
              transition={{ type: "tween", duration: 0.4 }}
              style={{
                position: "absolute",
                width: "100%",
                height: "auto",
                left: "0",
                top: "0",
                whiteSpace: "nowrap",
                opacity: 1,
              }}
            >
              <Flex marginBottom={4} alignItems="center">
                <IconButton
                  icon={<ArrowBackIcon />}
                  aria-label="back"
                  variant="ghost"
                  mr={6}
                  {...getButtonProps()}
                />
                <Heading size="lg">{t("CreateAccount")}</Heading>
              </Flex>
              <SignInWithProvider method="signUp" />
              <FormSignUp />
            </motion.div>
          </Flex>
        </div>
      </Flex>
    </CookiesContextProvider>
  );
};
