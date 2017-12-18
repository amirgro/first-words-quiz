import React from "react";
import { render } from "react-dom";
import Milim from "./milim";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  paddingBottom: "200px",
  backgroundImage:'url(https://images.cdn4.stockunlimited.net/clipart/seamless-baby-toys-background_1300126.jpg)'
};

const App = () => (
  <div style={styles}>
    <Milim name="CodeSandbox" />
  </div>
);

render(<App />, document.getElementById("root"));
