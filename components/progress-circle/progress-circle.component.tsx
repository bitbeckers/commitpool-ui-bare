import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { Text } from "../../components/";

interface CustomProgressCircle {
  progress: number;
}

const CustomProgressCircle = ({ progress }: CustomProgressCircle) => {
  return (
      <AnimatedCircularProgress
        size={180}
        width={15}
        rotation={0}
        fill={progress}
        tintColor="white"
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#D45353"
      >
        {(progress) => <Text text={`${progress.toFixed(1)} %`} />}
      </AnimatedCircularProgress>
  );
};

export default CustomProgressCircle;
