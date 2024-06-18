import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const SelectNetwork = ({
  onChange,
}: {
  onChange: (val: string) => void;
}) => {
  const [value, setValue] = useState("Omni");

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <RadioGroup
      defaultValue="1"
      colorScheme="yellow"
      onChange={setValue}
      value={value}
    >
      <Stack spacing={5} direction="row">
        <Radio value="Omni">Omni</Radio>
        <Radio value="Bep-20">Bep - 20</Radio>
      </Stack>
    </RadioGroup>
  );
};
