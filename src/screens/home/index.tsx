import { ActivityIndicator, FlatList, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookItem } from "../../components/book-item";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import colors from "../../theme/colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { HomeStackProps } from "../../navigation";
import { StyledButtonNew, StyledButtonNewText } from "./styles";
import { useEffect, useState } from "react";
import { useBookStore } from "../../store";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  const { books, fetch } = useBookStore((state) => state);
  const { height } = useWindowDimensions();

  const navigation = useNavigation<HomeStackProps>();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await fetch();
      setIsLoading(false);
    }

    getData();
  }, [isFocused]);

  const containerStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(books.length > 0);
    return {
      transform: [
        {
          translateY: withTiming(isVisible ? 0 : height),
        },
      ],
    };
  });

  if (isLoading) {
    return <ActivityIndicator color={colors.red} />;
  }

  return (
    <SafeAreaView>
      <StyledButtonNew onPress={() => navigation.navigate("Form", {})}>
        <StyledButtonNewText>Add new book</StyledButtonNewText>
      </StyledButtonNew>
      <Animated.View style={containerStyle}>
        <FlatList
          data={books}
          renderItem={({ item }) => {
            return <BookItem book={item} />;
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
