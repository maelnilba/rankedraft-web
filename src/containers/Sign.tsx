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
import { FormSignIn } from "../components/sign/FormSignIn";
import { FormSignUp } from "../components/sign/FormSignUp";
import { Header } from "../components/sign/Header";
import { RecoverPasswordForEmail } from "../components/sign/RecoverPasswordForEmail";
import { SignInWithProvider } from "../components/sign/SignInWithProvider";
import { useTheme } from "../hooks/useTheme";

export const Sign = () => {
  const { t } = useTranslation(["home"]);
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);
  const { isDark, theme } = useTheme();

  return (
    <Flex
      bgColor={isDark ? theme[100] : theme[200]}
      flex={1}
      direction="column"
      padding={8}
      borderTopLeftRadius="xl"
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
          <Stack>
            <Heading fontSize="lg">Vous n'avez pas de compte ?</Heading>
            <Button
              borderRadius="full"
              variant="outline"
              w="100%"
              {...getButtonProps()}
            >
              S'inscrire
            </Button>
          </Stack>
        )}
        <motion.div
          {...getDisclosureProps()}
          hidden={hidden}
          initial={false}
          onAnimationStart={() => setHidden(false)}
          onAnimationComplete={() => setHidden(!isOpen)}
          animate={{ left: isOpen ? 0 : "100%", opacity: isOpen ? 1 : 0.2 }}
          transition={{ type: "tween", duration: 0.4 }}
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
            left: "0",
            top: "0",
            whiteSpace: "nowrap",
            opacity: 1,
          }}
        >
          <Flex marginBottom={4}>
            <IconButton
              icon={<ArrowBackIcon fontSize="2xl" />}
              aria-label="back"
              variant="ghost"
              mr={6}
              {...getButtonProps()}
            />
            <Heading>Créer votre compte</Heading>
          </Flex>
          <SignInWithProvider method="signUp" />
          <FormSignUp />
        </motion.div>
      </div>
    </Flex>
  );
};