import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookForm from "../../components/book-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackProps } from "../../navigation";
import { StyledCloseButton } from "./styles";
import { useEffect, useState } from "react";
import { useGetBookById } from "../../network/queries/books";
import { IBook } from "../../types/db.types";

export default function InfoScreen() {
  const navigation = useNavigation<HomeStackProps>();
  const route = useRoute();
  const { mutateAsync } = useGetBookById();
  const [value, setValue] = useState<IBook>();

  const { id } = route?.params || {};

  useEffect(() => {
    async function getById() {
      if (id) {
        const data = await mutateAsync(id);
        setValue(data?.[0]);
      }
    }

    getById();
  }, [id]);

  return (
    <SafeAreaView>
      <View>
        <StyledCloseButton onPress={() => navigation.goBack()}>
          <Text>x</Text>
        </StyledCloseButton>
        <BookForm book={value} />
      </View>
    </SafeAreaView>
  );
}
