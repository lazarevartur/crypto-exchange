"use client";
import {
  ChakraStylesConfig,
  GroupBase,
  OptionProps,
  Select,
  SelectComponentsConfig,
  ValueContainerProps,
  components,
} from "chakra-react-select";
import { FC, useId, useMemo, useRef, useState } from "react";
import { Box, Flex, Image, Text, useOutsideClick } from "@chakra-ui/react";
import { IReserveItem } from "@/lib/types";

const selectStyles = (isOpen: boolean): ChakraStylesConfig => ({
  container: (provided) => ({ ...provided, w: "347px" }),
  menu: (provided) => ({
    ...provided,
    mt: "0px",
    height: isOpen ? "400px" : "0px",
    overflow: "hidden",
    opacity: isOpen ? 1 : 0,
    transition: "all .3s",
    visibility: isOpen ? "visible" : "hidden",
  }),
  control: (provided) => ({
    ...provided,
    h: "60px",
    bg: "white",
    border: "1px solid",
    borderRadius: 'none',
    borderColor: "#dae0e7",
    boxShadow: "0 0 15px rgba(255, 255, 255, .25)",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    bg: "transparent",
    cursor: "pointer",
    svg: {
      color: "black",
      boxSize: "30px",
      transform: `rotate(${isOpen ? "180deg" : "0"})`,
      transition: "all .2s",
    },
  }),
});

const CustomOption: FC<OptionProps<IReserveItem>> = ({
  data,
  selectOption,
}) => {
  const { name, icon } = data;

  return (
    <Flex
      color="#212121"
      p="10px"
      fontSize="14px"
      transition="all .3s"
      cursor="pointer"
      _hover={{ bg: "#fcbf11" }}
      onClick={() => selectOption(data)}
    >
      <Image boxSize="18px" src={icon} alt={name} mr="10px" />
      <Text>{name}</Text>
    </Flex>
  );
};

const CustomValueContainer: FC<ValueContainerProps<IReserveItem>> = ({
  ...props
}) => {
  const value = props.getValue()[0];

  if (!value) {
    return (
      <components.ValueContainer {...props}>
        {props.children}
      </components.ValueContainer>
    );
  }

  return (
    <components.ValueContainer {...props}>
      <Flex
        color="#212121"
        p="10px"
        fontSize="14px"
        transition="all .3s"
        cursor="pointer"
      >
        <Box display="none">{props.children}</Box>
        <Image boxSize="18px" src={value?.icon} alt={value.name} mr="10px" />
        <Text>{value.name}</Text>
      </Flex>
    </components.ValueContainer>
  );
};

export const CurrencySelect = ({ options }: { options: IReserveItem[] }) => {
  const id = useId();
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const styles = useMemo(() => selectStyles(isOpen), [isOpen]);

  useOutsideClick({
    ref,
    handler: () => setIsOpen(false),
  });

  const components: Partial<
    SelectComponentsConfig<IReserveItem, boolean, GroupBase<IReserveItem>>
  > = useMemo(
    () => ({
      IndicatorSeparator: () => null,
      Option: CustomOption,
      ValueContainer: CustomValueContainer,
    }),
    [],
  );

  return (
    <Box onClick={() => setIsOpen(!isOpen)} ref={ref}>
      <Select
        options={options}
        isSearchable={false}
        instanceId={id}
        menuIsOpen
        classNamePrefix="currencySelect"
        chakraStyles={styles}
        onBlur={() => setIsOpen(false)}
        // @ts-ignore
        components={components}
      />
    </Box>
  );
};
