"use client";
import {
  ChakraStylesConfig,
  components,
  ControlProps,
  createFilter,
  GroupBase,
  MenuListProps,
  OptionProps,
  Select,
  SelectComponentsConfig,
  ValueContainerProps,
} from "chakra-react-select";
import React, { FC, ReactNode, useId, useMemo, useRef } from "react";
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  useOutsideClick,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from "@chakra-ui/react";
import { IReserveItem } from "@/lib/types/types";
import { CATEGORIES } from "@/constants";

interface IMenuListDefaultProps
  extends MenuListProps<IReserveItem, boolean, GroupBase<IReserveItem>> {}

const filterConfig: Parameters<typeof createFilter<IReserveItem>>[0] = {
  ignoreCase: true,
  ignoreAccents: true,
  trim: true,
  stringify: (option) => `${option.data.name}`,
};

const selectStyles = (isOpen: boolean): ChakraStylesConfig => ({
  container: (provided) => ({
    ...provided,
    w: "100%",
    _focusVisible: { boxShadow: "none" },
  }),
  menu: (provided) => ({
    ...provided,
    mt: "0px",
    bg: "white",
    opacity: isOpen ? 1 : 0,
    transition: "all .2s",
    visibility: isOpen ? "visible" : "hidden",
    border: "1px solid #120773",
  }),
  control: (provided) => ({
    ...provided,
    h: "60px",
    bg: "white",
    border: "1px solid",
    borderRadius: "none",
    borderColor: "#dae0e7",
    boxShadow: "0 0 15px rgba(255, 255, 255, .25)",
    _focusVisible: { boxShadow: "none" },
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
  placeholder: (provided) => ({ ...provided, position: "absolute" }),
});

const Option: FC<OptionProps<IReserveItem>> = ({
  data,
  selectOption,
  selectProps,
}) => {
  const { name, icon } = data;
  // @ts-ignore
  const { toggleMenu } = selectProps;

  return (
    <Flex
      color="#212121"
      p="10px"
      fontSize="14px"
      transition="all .3s"
      cursor="pointer"
      _hover={{ bg: "#fcbf11" }}
      onClick={() => {
        selectOption(data);
        toggleMenu();
      }}
    >
      <Image boxSize="18px" src={icon} alt={name} mr="10px" />
      <Text>{name}</Text>
    </Flex>
  );
};

function RadioCard(props: UseRadioProps & { children: ReactNode }) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        fontSize="14px"
        color="black"
        border="2px solid"
        borderColor="#d8dadc"
        borderRadius="10px"
        boxShadow="0 1px 4px rgba(0, 0, 0, .2)"
        _hover={{ boxShadow: "0 1px 4px rgba(0, 0, 0, .5)" }}
        _checked={{ boxShadow: "none", borderColor: "#fad753" }}
        textTransform="uppercase"
        p="5px"
      >
        {props.children}
      </Box>
    </Box>
  );
}

function Buttons() {
  const options = CATEGORIES;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "categories",
    defaultValue: "all",
    onChange: console.log,
  });

  const group = getRootProps();
  const allRadio = getRadioProps({ value: "all" });

  return (
    <HStack {...group}>
      <RadioCard {...allRadio}>All</RadioCard>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

const MenuList: FC<IMenuListDefaultProps> = (props) => {
  return (
    <Flex flexDir="column" display="contents">
      <Flex color="red" flexDir="column" px="10px" py="5px" gap="5px">
        <Buttons />
      </Flex>
      <Flex flexDir="column" maxH="400px" overflow="auto">
        {props.children}
      </Flex>
    </Flex>
  );
};

const ValueContainer: FC<ValueContainerProps<IReserveItem>> = (props) => {
  const value = props.getValue()[0];

  if (!value) {
    return (
      <components.ValueContainer {...props}>
        <Flex color="#212121">{props.children}</Flex>
      </components.ValueContainer>
    );
  }

  return (
    <Flex
      color="#212121"
      p="10px"
      fontSize="14px"
      transition="all .3s"
      cursor="pointer"
      w="100%"
      alignItems="center"
    >
      <Box display="none">{props.children}</Box>
      <Image boxSize="18px" src={value?.icon} alt={value.name} mr="10px" />
      <Text>{value.name}</Text>
    </Flex>
  );
};

const Control: FC<ControlProps<IReserveItem>> = (props) => {
  // @ts-ignore
  const { toggleMenu } = props.selectProps;
  return (
    <components.Control {...props}>
      <Flex
        onClick={toggleMenu}
        sx={{
          h: "60px",
          w: "100%",
          bg: "white",
          cursor: "pointer",
          border: "1px solid",
          borderRadius: "none",
          borderColor: "#dae0e7",
          boxShadow: "0 0 15px rgba(255, 255, 255, .25)",
          ".currencySelect__indicator": {
            mr: "10px",
          },
        }}
      >
        {props.children}
      </Flex>
    </components.Control>
  );
};

export const CurrencySelect = ({
  options,
  onChange,
  defaultValue,
}: {
  options: IReserveItem[];
  defaultValue?: IReserveItem;
  onChange?: (item: IReserveItem) => void;
}) => {
  const id = useId();
  const ref = useRef(null);

  const { isOpen, onClose, onToggle } = useDisclosure();

  const styles = useMemo(() => selectStyles(isOpen), [isOpen]);

  useOutsideClick({
    ref,
    handler: () => onClose(),
  });

  const components: Partial<
    SelectComponentsConfig<IReserveItem, boolean, GroupBase<IReserveItem>>
  > = {
    IndicatorSeparator: () => null,
    Option,
    ValueContainer,
    MenuList,
    Control,
  };

  return (
    <Box ref={ref} h="100%">
      <Select
        isSearchable
        menuIsOpen
        toggleMenu={onToggle}
        options={options}
        defaultValue={defaultValue}
        placeholder="Search your token"
        instanceId={id}
        classNamePrefix="currencySelect"
        chakraStyles={styles}
        // @ts-ignore
        onChange={onChange}
        // @ts-ignore
        filterOption={createFilter(filterConfig)}
        // @ts-ignore
        components={components}
      />
    </Box>
  );
};
