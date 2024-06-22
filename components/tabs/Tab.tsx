import { TabProps, Tab as ChakraTab } from "@chakra-ui/react";

export const Tab = (props: TabProps) => (
  <ChakraTab
    fontSize="14px"
    color="black"
    border="2px solid"
    borderColor="#d8dadc"
    borderRadius="10px"
    boxShadow="0 1px 4px rgba(0, 0, 0, .2)"
    _hover={{ boxShadow: "0 1px 4px rgba(0, 0, 0, .5)" }}
    _selected={{ boxShadow: "none", borderColor: "#fad753" }}
    textTransform="uppercase"
    {...props}
  />
);
