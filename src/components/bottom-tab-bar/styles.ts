import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

export const StyledTabItem = styled(
  TouchableOpacity,
  "h-11 flex justify-center content-center bg-white"
);

export const StyledTabBar = styled(
  View,
  "flex-row justify-between"
);

export const StyledTabItemLabel = styled(
  Text,
  "text-center pt-3.5 pb-5 text-base"
);


export const StyledActiveTabLeft = styled(
  View,
)

export const StyledActiveTabRight = styled(
  View,
  'bg-white absolute border-red bg-white rounded-[20px] bottom-0 -right-4'
)