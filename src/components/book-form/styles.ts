import { styled } from "nativewind";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const StyledForm = styled(View, " rounded p-5");

export const StyledFormControl = styled(View, "mb-2");

export const StyledFormLabel = styled(Text, "text-lg mb-3");

export const StyledFormError = styled(Text, "text-xs color-red mb-3");

export const StyledFormSubmit = styled(TouchableOpacity, "rounded bg-red p-3");

export const StyledFormSubmitText = styled(Text, "color-white text-center");

export const StyledInput = styled(TextInput, "border h-13 rounded-lg p-5 mb-2");
