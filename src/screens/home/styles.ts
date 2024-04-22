import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

export const StyledButtonNew = styled(
  TouchableOpacity,
  "rounded border border-red p-3 m-auto absolute right-2 top-2"
);

export const StyledButtonNewText = styled(Text, "color-red text-center");
