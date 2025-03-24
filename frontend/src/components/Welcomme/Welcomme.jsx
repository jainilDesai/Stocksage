import {
  Grid,
  GridItem,
  Box,
  Heading,
  Image,
  Input,
  Button,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Text,
  Link as Anchor,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DataContext } from "../../context/data.context";
import Logo from "../Logo/Logo";
import styles from "./Welcomme.module.css";
import { BsFillPersonFill, BsGithub } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const Welcomme = () => {
  const navigate = useNavigate();
  const { wallet, setWallet, setUser, setBalance } = useContext(DataContext);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (userName.length < 3 || !/^[a-zA-Z]/.test(userName)) {
        toast({
          title: "Invalid Name",
          description:
            "Name must be at least 3 characters and start with a letter.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // Additional logic to set userName in your context or state
        setWallet({ ...wallet, deposit: initialDeposit });
        setUser({ userName: userName });
        setBalance(initialDeposit);
        toast({
          title: "Account Created",
          description: "You can now sign in with your credentials.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsSignUp(false);
      } catch (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Signed In",
          description: "Welcome back!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Redirect to home page after successful sign-in
        navigate("/overview");
      } catch (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box className={styles.bg}>
      <Grid className={styles.mainGrid}>
        <GridItem className={styles.leftGrid} colSpan={4} p="6%">
          <Box
            w="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* <Logo size="2rem" /> */}
            <h1>Stocksage</h1>
            <Box w="fit-content" className={styles.socialLinks}>
              <Anchor href="https://github.com/jainilDesai/Fintech" isExternal>
                <BsGithub />
              </Anchor>
              <Anchor
                href="https://www.linkedin.com/in/jainil-desai-ab51b9275/"
                isExternal
              >
                <BsFillPersonFill />
              </Anchor>
            </Box>
          </Box>
          <Box
            h="80%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="40px"
          >
            <Box textAlign="center">
              <Heading display="inline" fontWeight="500">
                {`Get started now and`}
                <br />
                {`take control of your finances! `}
              </Heading>
              <Text fontSize="1rem" display="inline">
                *
              </Text>
            </Box>
            <form
              className={`${styles.welcommeForm} box`}
              onSubmit={(e) => handleSubmit(e)}
            >
              {isSignUp && (
                <FormLabel w="100%">
                  Name:
                  <Input
                    name="name"
                    isRequired
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    type="text"
                    placeholder="Your Name"
                  />
                </FormLabel>
              )}
              <FormLabel w="100%">
                Email:
                <Input
                  name="email"
                  isRequired
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Your Email"
                />
              </FormLabel>
              <FormLabel w="100%">
                Password:
                <Input
                  name="password"
                  isRequired
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Your Password"
                />
              </FormLabel>
              <Button
                variant="solid"
                colorScheme="brand"
                type="submit"
                w="100%"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              <Text mt={4} textAlign="center">
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </Button>
              </Text>
            </form>
          </Box>
          <Text fontSize="0.9rem">
            {`* This web application is a hacathon project. By using this app you are not dealing with real stock market values.`}
          </Text>
        </GridItem>
        <GridItem
          className={styles.rightGrid}
          colSpan={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="40px"
        >
          <Box
            w="80%"
            display="flex"
            justifyContent="center"
            borderBottom="1.5px solid #ccc"
          >
            <Image
              w="500px"
              marginBottom="-1.5px"
              src="/images/dashboard-color-secondary.svg"
            />
          </Box>
          <Text className={styles.welcommeInfo}>
            {`Everything you need to efficiently manage your investments in one place.`}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Welcomme;
