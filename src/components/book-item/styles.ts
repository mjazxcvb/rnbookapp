import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

export const StyledBookItemContainer = styled(
  View,
  "h-25 rounded border-b border-red m-2 p-5"
);

export const StyledBookItemTitle = styled(Text, "text-lg mb-3");

export const StyledBookItemAuthor = styled(Text, "text-sm  mb-1");

export const StyledBookItemGenre = styled(Text, "text-xsm color-red");

export const StyledRow = styled(View, "flex-row justify-between");

export const StyledButton = styled(TouchableOpacity, "rounded bg-red p-2 h-9");

export const StyledBorderButton = styled(
  TouchableOpacity,
  "rounded bg-white border border-red p-2 h-9 mr-2"
);

export const StyledButtonText = styled(Text, "text-xs  color-white");

export const StyledBorderButtonText = styled(Text, "text-xs  color-red");
