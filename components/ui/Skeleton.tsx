import { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

type SkeletonProps = ViewProps & {
  width?: number | string;
  height?: number;
};

export function Skeleton({
  width = "100%",
  height = 20,
  style,
  ...props
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      {...props}
      style={[
        {
          width: width as any,
          height,
          backgroundColor: "#D1D5DB",
          opacity,
        },
        style,
      ]}
    />
  );
}
