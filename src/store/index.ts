import { create } from "zustand";
import { IBook } from "../types/db.types";
import { useGetBooks } from "../network/queries/books";
import BookService from "../network/services/bookService";

interface BookState {
  books: IBook[];
  fetch: () => void;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  fetch: async () => {
    const response = await BookService.get();
    set({ books: response as IBook[] });
  },
}));
