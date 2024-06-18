import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export const SelectNetwork = () => (
  <RadioGroup defaultValue="1" colorScheme="yellow">
    <Stack spacing={5} direction="row">
      <Radio value="1">Omni</Radio>
      <Radio value="2">Bep - 20</Radio>
    </Stack>
  </RadioGroup>
);
