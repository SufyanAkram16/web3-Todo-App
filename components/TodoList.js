import {
  HStack,
  IconButton,
  VStack,
  Text,
  StackDivider,
  Spacer,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import React from "react";

function TodoList({ deleteTask, tasks }) {
  if (!tasks.length) {
    return (
      <Badge colorScheme={"green"} p="4" m={"4"} borderRadius="lg">
        No Todos, yay!!!
      </Badge>
    );
  }
  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth={"2px"}
      p={4}
      borderRadius="lg"
      w={"100%"}
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems="stretch"
    >
      {tasks.map((todo) => (
        <HStack key={todo.id}>
          <Text>{todo.taskText}</Text>
          <Spacer />
          <IconButton
            icon={<FaTrash />}
            isRound="true"
            onClick={() => deleteTask(todo.id)}
          />
        </HStack>
      ))}
    </VStack>
  );
}

export default TodoList;
