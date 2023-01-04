import { Button, VStack } from "@chakra-ui/react";
import React from "react";

function ConnectWallet({ connectWallet }) {
  return (
    <VStack mt={"25%"}>
      <Button colorScheme={"yellow"} p="9" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </VStack>
  );
}

export default ConnectWallet;
