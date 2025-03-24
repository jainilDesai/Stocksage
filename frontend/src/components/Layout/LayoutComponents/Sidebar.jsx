import styles from "../Layout.module.css";
import { NavLink } from "react-router-dom";
import {
  FcAreaChart,
  MdOutlineDashboard,
  BsBarChartLine,
  TbZoomMoney,
  HiOutlineNewspaper,
  BsFillPersonFill,
  BsGithub,
} from "react-icons/all";
import chatIcon from "../chat_icon.svg";
import Logo from "../../Logo/Logo";
import { Box, Link as Anchor, Divider } from "@chakra-ui/react";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Box className={styles.logoResponsive}>
        <FcAreaChart />
      </Box>
      <Box className={styles.logo}>
        <h1>Stocksage</h1>
        {/* <Logo size="1.5rem" /> */}
      </Box>
      <nav className={styles.navbar}>
        <ul>
          <NavLink to={"/overview"}>
            <li>
              <MdOutlineDashboard />
              <span>Overview</span>
            </li>
          </NavLink>
          <NavLink to={"/stocks"}>
            <li>
              <TbZoomMoney />
              <span>Stocks</span>
            </li>
          </NavLink>
          <NavLink to={"/investments"}>
            <li>
              <BsBarChartLine />
              <span>Investments</span>
            </li>
          </NavLink>
          <NavLink to={"/wallet"}>
            <li>
              <img src={chatIcon} alt="" />
              <span>ChatBot</span>
            </li>
          </NavLink>
          <NavLink to={"/news"}>
            <li>
              <HiOutlineNewspaper />
              <span>News</span>
            </li>
          </NavLink>
        </ul>
        <ul>
          <Divider />
          <Box className={styles.socialLinks}>
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
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
