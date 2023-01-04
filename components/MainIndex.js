import React from 'react'
import {
    Heading,
    VStack,
    IconButton,
    useColorMode,
    Button,
    HStack,
    Input,
  } from "@chakra-ui/react";
  import TodoList from "../components/TodoList";
  import AddTodo from "../components/AddTodo";
  import { FaSun, FaMoon } from "react-icons/fa";

function MainIndex({deleteTask,tasks, addTasks, setInput,input}) {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
    <VStack p={4}>
    

          <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            isRound="true"
            size={"lg"}
            alignSelf="flex-end"
            onClick={toggleColorMode}
          />
        

        <Heading
          m="8"
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-r, green.500, green.300, blue.500)"
          bgClip="text"
        >
          Todo Application
        </Heading>
        <TodoList tasks = {tasks} deleteTask={deleteTask} />
        <AddTodo addTasks= {addTasks} setInput={setInput} input = {input} />
      </VStack>

      <footer>
      <VStack mt={"96"}>
      <Heading size={"xs"}>
        created by Sufian
      </Heading>
      </VStack>
    </footer>
    </>
  )
}

export default MainIndex