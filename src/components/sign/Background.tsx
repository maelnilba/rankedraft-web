import { Flex, Image } from "@chakra-ui/react";

export const Background = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Flex
          backgroundImage={`url(${SVG});`}
          backgroundSize="60px"
          backgroundRepeat="repeat"
          w="100%"
          h="auto"
          flex={1}
        ></Flex>

        <Image
          boxSize="600px"
          fit="contain"
          transform="rotate(-28deg)"
          src="/icons/crossed-swords.svg"
          overflow="hidden"
          bg="transparent"
          position="absolute"
          marginTop="100px"
          marginLeft="100px"
          alt="Background"
        />
      </div>
    </>
  );
};

export const SVG = `'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="120"><image width="30" height="30" xlink:href="data:image/png;base64,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" /></svg>'`;
