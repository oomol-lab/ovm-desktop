import type { SigninContentProps } from "./SigninContent";
import type { Meta, StoryFn } from "@storybook/react";

import { useState } from "react";

import { SigninContent } from "./SigninContent";

const storyMeta: Meta = {
  title: "SigninPanel/SigninContent",
  component: SigninContent,
};

export default storyMeta;

const styles: React.CSSProperties = {
  width: 100,
  height: 100,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const colors = ["#f76869", "#d9ff88", "#7ed0fd"];
const mod = (i: number, n: number): number => {
  return ((i % n) + n) % n;
};

export const Overview: StoryFn<SigninContentProps> = () => {
  const [key, setKey] = useState(0);

  return (
    <div>
      <p>
        <button onClick={() => setKey(Math.trunc(Math.random() * 100))}>
          key: {key}
        </button>
      </p>
      <SigninContent transitionKey={key}>
        <div style={{ ...styles, background: colors[mod(key, colors.length)] }}>
          {key}
        </div>
      </SigninContent>
    </div>
  );
};
