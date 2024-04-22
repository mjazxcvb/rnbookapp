import { useMutation, useQuery } from "@tanstack/react-query";
import BookService from "../services/bookService";
import { IBook } from "../../types/db.types";

const useGetBooks = () => {
  return useQuery({
    queryKey: ["get-books"],
    queryFn: () => BookService.get(),
  });
};

const useGetBookById = () => {
  return useMutation({
    mutationKey: ["get-book-by-id"],
    mutationFn: BookService.getById,
  });
};

const usePostBook = () => {
  return useMutation({
    mutationKey: ["post-book"],
    mutationFn: BookService.post,
  });
};

const usePutBook = () => {
  return useMutation({
    mutationKey: ["put-book"],
    mutationFn: BookService.update,
  });
};

const useDeleteBook = () => {
  return useMutation({
    mutationKey: ["remove-book"],
    mutationFn: BookService.remove,
  });
};

export { useGetBooks, useGetBookById, usePostBook, usePutBook, useDeleteBook };
