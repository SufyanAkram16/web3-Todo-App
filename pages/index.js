import { useEffect, useState } from "react";
import TaskAbi from "../backend/build/contracts/TodosContract.json";
import { TodosContractAddress } from "../config";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import ConnectWallet from "../components/ConnectWallet";
import MainIndex from "../components/MainIndex";
import WrongNetworkMessage from "../components/WrongNetworkMessage";

export default function Home() {
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const toast = useToast();

  useEffect(() => {
    connectWallet();
    getAllTasks();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not Detected");
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("connected to chain", chainId);

      const goreliChainId = "0x5";
      if (chainId !== goreliChainId) {
        alert("you are not connected to the Goreli testnet");
        setCorrectNetwork(false);
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found account", accounts[0]);
      setIsUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (error) {}
  };

  const addTasks = async (e) => {
    e.preventDefault();

    if (!input) {
      toast({
        title: "Nothing to add.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    let task = {
      taskText: input,
      isDeleted: false,
    };

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TodosContractAddress,
          TaskAbi.abi,
          signer
        );

        TaskContract.addTasks(task.taskText, task.isDeleted).then((res) => {
          setTasks([...tasks, task]);
          setInput("");
          console.log("Added Task");
        });
      } else {
        console.log("ethereum object does not exist!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTasks = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TodosContractAddress,
          TaskAbi.abi,
          signer
        );

        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      } else {
        console.log("ethereum object doesnot exist!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (key) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TodosContractAddress,
          TaskAbi.abi,
          signer
        );

        const deleteTaskTx = await TaskContract.deleteTask(key, true)
        console.log("succesfully deleted")

        let allTasks = await TaskContract.getMyTasks()
        setTasks(allTasks)
      } else {
        console.log("ethereum object oesnot exist!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      {!isUserLoggedIn ? (
        <ConnectWallet connectWallet={connectWallet} />
      ) : correctNetwork ? (
        <MainIndex
          tasks={tasks}
          addTasks={addTasks}
          setInput={setInput}
          input={input}
          deleteTask = {deleteTask}
        />
      ) : (
        <WrongNetworkMessage />
      )}
    </>
  );
}
