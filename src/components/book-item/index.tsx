import { IBook } from "../../types/db.types";
import {
  StyledBookItemAuthor,
  StyledBookItemContainer,
  StyledBookItemGenre,
  StyledBookItemTitle,
  StyledBorderButton,
  StyledBorderButtonText,
  StyledButton,
  StyledButtonText,
  StyledRow,
} from "./styles";
import { useDeleteBook } from "../../network/queries/books";
import { useNavigation } from "@react-navigation/native";
import { HomeStackProps } from "../../navigation";
import Toast from "react-native-toast-message";
import { useBookStore } from "../../store";

type BookItemProps = {
  book: IBook;
};
export function BookItem({ book }: BookItemProps) {
  const navigation = useNavigation<HomeStackProps>();
  const { mutateAsync } = useDeleteBook();
  const { fetch } = useBookStore((state) => state);

  const onRemove = async (id?: number) => {
    if (id) {
      const { status } = await mutateAsync(id);

      if (status === 204) {
        await fetch();
        Toast.show({
          type: "info",
          text1: "Successfully removed book",
        });
      }
    }
  };

  const onEdit = (id?: number) => {
    navigation.navigate("Form", { id });
  };

  return (
    <StyledBookItemContainer>
      <StyledRow>
        <StyledBookItemTitle>{book.title}</StyledBookItemTitle>
        <StyledRow>
          <StyledBorderButton onPress={() => onEdit(book.id)}>
            <StyledBorderButtonText>Edit</StyledBorderButtonText>
          </StyledBorderButton>
          <StyledButton onPress={() => onRemove(book.id)}>
            <StyledButtonText>Remove</StyledButtonText>
          </StyledButton>
        </StyledRow>
      </StyledRow>
      <StyledBookItemAuthor>{`By: ${book.author}`}</StyledBookItemAuthor>
      <StyledBookItemGenre>{book.genre}</StyledBookItemGenre>
    </StyledBookItemContainer>
  );
}
