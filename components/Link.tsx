import {  useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";

type LinkProps = {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
};

export const Link = ({ to, params, children }: LinkProps) => {
  const route = useRouter():


  const handlePress = () => {
    // navigation.navigate(to, params as any);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
