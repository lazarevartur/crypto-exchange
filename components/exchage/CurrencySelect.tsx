"use client";
import {
  ChakraStylesConfig,
  components,
  ControlProps,
  GroupBase,
  MenuListProps,
  OptionProps,
  Select,
  SelectComponentsConfig,
  ValueContainerProps,
} from "chakra-react-select";
import { FC, useId, useMemo, useRef } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { IReserveItem } from "@/lib/types";

interface IMenuListDefaultProps
  extends MenuListProps<IReserveItem, boolean, GroupBase<IReserveItem>> {}

const selectStyles = (isOpen: boolean): ChakraStylesConfig => ({
  container: (provided) => ({ ...provided, w: "347px" }),
  menu: (provided) => ({
    ...provided,
    mt: "0px",
    bg: "white",
    opacity: isOpen ? 1 : 0,
    transition: "all .3s",
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

const MenuList: FC<IMenuListDefaultProps> = ({ children }) => {
  return (
    <Flex flexDir="column">
      <Flex color="red" flexDir="column" px="10px">
        <Flex>TABS</Flex>
        <Flex>SEARCH</Flex>
      </Flex>
      <Flex flexDir="column" h="400px" overflow="auto">
        {children}
      </Flex>
    </Flex>
  );
};

const ValueContainer: FC<ValueContainerProps<IReserveItem>> = (props) => {
  const value = props.getValue()[0];

  if (!value) {
    return (
      <components.ValueContainer {...props}>
        <Flex>{props.children}</Flex>
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

export const CurrencySelect = ({ options }: { options: IReserveItem[] }) => {
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
        toggleMenu={onToggle}
        options={options}
        isSearchable={false}
        instanceId={id}
        menuIsOpen
        classNamePrefix="currencySelect"
        chakraStyles={styles}
        onBlur={() => onClose()}
        // @ts-ignore
        components={components}
      />
    </Box>
  );
};
