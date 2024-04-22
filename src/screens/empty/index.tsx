import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmptyScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Empty</Text>
      </View>
    </SafeAreaView>
  );
}
