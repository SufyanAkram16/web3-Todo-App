import { Button, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";

function AddTodo({ addTasks, setInput,input }) {
  

  
  return (
    <form >
      <HStack mt="8">
        <Input
          variant={"filled"}
          placeholder="Add task here ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button colorScheme={"green"} px="8" onClick={addTasks}>
          Add Todo
        </Button>
      </HStack>
    </form>
  );
}

export default AddTodo;
