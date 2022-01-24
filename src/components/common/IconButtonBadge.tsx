import { Box, Flex, IconButton } from "@chakra-ui/react";

const IconButtonBadge = ({ icon, text }: { icon: React.ReactElement; text?: string | number }) => {
  return (
    <>
      <Box position='relative' width='max-content'>
        <Flex
          display={text ? "flex" : "none"}
          justifyContent='center'
          alignItems='center'
          position='absolute'
          bgColor='red.500'
          color='white'
          right='-1'
          fontSize='xs'
          lineHeight='none'
          rounded='full'
          fontWeight='semibold'
          height='5'
          minW='5'
          border='2px solid orange'
          zIndex={1}
        >
          {text}
        </Flex>
        <IconButton rounded='full' _hover={{ bgColor: "none" }} aria-label='bag' variant='ghost' icon={icon} />
      </Box>
    </>
  );
};

export default IconButtonBadge;
