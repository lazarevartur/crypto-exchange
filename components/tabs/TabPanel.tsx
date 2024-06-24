import {TabPanelProps, TabPanel as ChakraTabPanel} from "@chakra-ui/react";

export const TabPanel = (props: TabPanelProps) => (
    <ChakraTabPanel px="0px" {...props} />
);