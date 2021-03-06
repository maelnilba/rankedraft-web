import {
  Fade,
  Stack,
  Img,
  Flex,
  Heading,
  useColorMode,
  StackDirection,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../../hooks/useTheme";
import { useWindowSize } from "../../hooks/useWindowSize";

interface CardIntroductionProps {
  heading: string;
  path: string;
  spacing?: number;
  marginTop?: number;
  marginBottom?: number;
  direction?: StackDirection;
}
export const CardIntroduction = ({
  heading,
  path,
  spacing,
  marginTop,
  marginBottom,
  direction,
}: CardIntroductionProps) => {
  const { isMobile } = useWindowSize();
  const { ref, inView } = useInView();
  const { colorMode } = useColorMode();
  const { code } = useTheme({ invert: true });
  const isFade: any = useRef(null);
  useEffect(() => {
    if (!isFade?.current) {
      const time = setTimeout(() => {
        isFade.current = true;
      }, 500);

      return () => {
        clearTimeout(time);
      };
    }
  }, [inView]);
  return (
    <Stack
      direction={
        isMobile ? "column" : direction === undefined ? "row" : direction
      }
      spacing={spacing}
      marginTop={marginTop}
      marginBottom={marginBottom}
      justifyContent="center"
      alignItems="center"
      ref={ref}
    >
      <Flex justifyContent="center" alignItems="center" direction="column">
        <Heading>{heading}</Heading>
      </Flex>
      <Flex maxWidth={isMobile ? "100%" : "50%"} alignItems="center">
        <Fade in={isFade?.current || false}>
          <Img
            src={`/assets/${path}.${colorMode}.png`}
            borderRadius={5}
            boxShadow={`2px 0px 33px -30px ${code[100]}`}
            alignSelf="center"
            alt="Preview image"
          />
        </Fade>
      </Flex>
    </Stack>
  );
};
