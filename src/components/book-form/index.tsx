import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IBook } from "../../types/db.types";
import {
  StyledForm,
  StyledFormControl,
  StyledFormError,
  StyledFormSubmit,
  StyledFormSubmitText,
  StyledInput,
} from "./styles";
import { usePostBook, usePutBook } from "../../network/queries/books";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { HomeStackProps } from "../../navigation";
import Toast from "react-native-toast-message";

type BookFormProps = {
  book?: IBook;
};

interface IFormInput {
  title: string;
  author: string;
  genre: string;
}
export default function BookForm(props: BookFormProps) {
  const { book } = props;
  const { mutateAsync: postAsync } = usePostBook();
  const { mutateAsync: putAsync } = usePutBook();

  const navigation = useNavigation<HomeStackProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
    },
  });

  const onSubmitPost = async (data: IFormInput) => {
    const postData = await postAsync(data);

    if (postData) {
      Toast.show({
        type: "success",
        text1: "Successfully added book",
      });

      navigation.goBack();
    }
  };

  const onSubmitUpdate = async (data: IFormInput) => {
    const postData = await putAsync({ ...data, id: book?.id });

    if (postData) {
      Toast.show({
        type: "success",
        text1: "Successfully updated book",
      });

      navigation.goBack();
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!book) {
      await onSubmitPost(data);
    } else {
      await onSubmitUpdate(data);
    }
  };

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("genre", book.genre);
    }

    return () => {
      reset();
    };
  }, [book]);

  return (
    <StyledForm>
      <StyledFormControl>
        <Controller
          control={control}
          rules={{
            required: "Title is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="none"
              autoCorrect={false}
              autoComplete="off"
              placeholder="Title"
            />
          )}
          name="title"
        />
        <StyledFormError>{errors?.title?.message}</StyledFormError>
      </StyledFormControl>

      <StyledFormControl>
        <Controller
          control={control}
          rules={{
            required: "Author is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="none"
              autoCorrect={false}
              autoComplete="off"
              placeholder="Author"
            />
          )}
          name="author"
        />
        <StyledFormError>{errors?.author?.message}</StyledFormError>
      </StyledFormControl>

      <StyledFormControl>
        <Controller
          control={control}
          rules={{
            required: "Genre is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StyledInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="none"
              autoCorrect={false}
              autoComplete="off"
              placeholder="Genre"
            />
          )}
          name="genre"
        />
        <StyledFormError>{errors?.genre?.message}</StyledFormError>
      </StyledFormControl>
      <StyledFormSubmit onPress={handleSubmit(onSubmit)}>
        <StyledFormSubmitText>Submit</StyledFormSubmitText>
      </StyledFormSubmit>
    </StyledForm>
  );
}
