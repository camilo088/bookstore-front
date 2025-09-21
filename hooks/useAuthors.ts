import { useAuthorsContext } from "@/context/AuthorsProvider";

/** Custom Hook del curso: compone estado/efectos y expone funciones CRUD */
export const useAuthors = () => useAuthorsContext();
