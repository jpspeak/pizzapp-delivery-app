import { Box, Flex, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";

export type PizzaSizesType = "regular" | "large" | "extraLarge";

const RadioPizza = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Flex
        {...checkbox}
        cursor='pointer'
        justifyContent='center'
        alignItems='center'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        rounded='full'
        _checked={{
          bg: "orange.500",
          color: "white"
        }}
        _focus={{
          boxShadow: "outline"
        }}
        h='10'
        w='10'
      >
        {props.children}
      </Flex>
    </Box>
  );
};

function RadioPizzaGroup({ onChange }: { onChange: (value: PizzaSizesType) => void }) {
  const options = ["regular", "large", "extraLarge"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "size",
    defaultValue: "regular",
    onChange
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map(value => {
        const radio = getRadioProps({ value });
        return (
          <RadioPizza key={value} {...radio}>
            {value === "regular" && "R"}
            {value === "large" && "L"}
            {value === "extraLarge" && "XL"}
          </RadioPizza>
        );
      })}
    </HStack>
  );
}

export default RadioPizzaGroup;
