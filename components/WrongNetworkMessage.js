import { VStack, Heading, Text } from "@chakra-ui/react";
import React from "react";

function WrongNetworkMessage() {
  return (
    
    <VStack mt={"25%"} bgColor={"green.100"}>
      <Heading>--------------------</Heading>

      <Text> Not connected GORELI Testnet !!!</Text>

      <Heading>--------------------</Heading>
    </VStack>
  );
}

export default WrongNetworkMessage;
