import { IBook } from "../../types/db.types";
import { supabase } from "../supabase";

const tableName = "books";
const BookService = {
  get: async () => {
    const res = await supabase.from(tableName).select().throwOnError();

    return res.data;
  },
  getById: async (id: number) => {
    const res = await supabase
      .from(tableName)
      .select()
      .eq("id", id)
      .throwOnError();

    return res.data;
  },
  post: async (book: IBook) => {
    const res = await supabase.from(tableName).insert(book).throwOnError();

    return res;
  },
  update: async (book: IBook) => {
    const res = await supabase.from(tableName).update(book).eq("id", book.id);

    return res;
  },
  remove: async (id: number) => {
    const res = await supabase.from(tableName).delete().eq("id", id);

    return res;
  },
};

export default BookService;
