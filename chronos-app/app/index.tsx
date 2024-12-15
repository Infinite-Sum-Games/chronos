import { Redirect } from "expo-router";
import "../global.css";
const StartPage = () => {
  return <Redirect href={"/Home"} />;
};

export default StartPage;
