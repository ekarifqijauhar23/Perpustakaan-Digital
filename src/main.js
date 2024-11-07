import { LibraryController } from "./controllers/LibraryController.js";
import { BookForm } from "./views/BookForm.js";
import { BookList } from "./views/BookList.js";

const bookForm = new BookForm();
const bookList = new BookList();
const libraryController = new LibraryController(bookForm, bookList);

// Menambahkan event listener pada form
bookForm.render((title, author, year, description) => {
    libraryController.addBook(title, author, year, description);
    // Setelah buku ditambahkan, update daftar buku
    bookList.render(
      libraryController.books, // pastikan ini mengakses daftar buku yang benar
      libraryController.deleteBook.bind(libraryController),
      libraryController.editBook.bind(libraryController)
    );
  });

// Menampilkan daftar buku awal
bookList.render(
  libraryController.books, // pastikan books terinisialisasi dengan benar
  libraryController.deleteBook.bind(libraryController),
  libraryController.editBook.bind(libraryController)
);

// Tema
document
  .getElementById("theme-toggle")
  .addEventListener("click", () => libraryController.toggleTheme());

libraryController.initTheme();