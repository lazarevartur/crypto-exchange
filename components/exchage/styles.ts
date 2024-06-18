import {SystemStyleObject} from "@chakra-ui/react";

export const InputStyles: SystemStyleObject = {
  border: "0px",
  borderBottom: "1px",
  borderRadius: "none",
  borderColor: "#0500ff",
  pl: "0px",
  textAlign: "center",
  color: "#212121",
  fontWeight: 600,
  fontSize: "24px",
  _hover: { borderColor: "#0500ff" },
  _focusVisible: {
    boxShadow: "none",
  },
};

export const SecondStepInputGroutStyles: SystemStyleObject = {
  flexDir: "column",
  fontSize: "16px",
  fontWeight: 600,
  color: "black",
  gap: "10px",
  input: {
    h: "56px",
    bg: "rgba(227, 227, 227, .4)",
    borderRadius: "7px",
  },
};