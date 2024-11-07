export class LibraryController {
    constructor(bookForm, bookList) {
      this.bookForm = bookForm;
      this.bookList = bookList;
      // Inisialisasi dengan array buku kosong
      this.books = JSON.parse(localStorage.getItem("books")) || [];
    }
  
    // Fungsi untuk menambahkan buku
    addBook(title, description, author, year ) {
        const newBook = {
          id: Date.now(), // Membuat ID unik berdasarkan waktu
          title, 
          description,
          author,
          year,
        };
        this.books.push(newBook);
        this.saveBooks();
      }
  
    // Fungsi untuk menghapus buku
    deleteBook(id) {
      this.books = this.books.filter(book => book.id !== Number(id));
      this.saveBooks();
    }
  
    // Fungsi untuk mengedit buku
    editBook(id) {
        const book = this.books.find(book => book.id === Number(id));
        if (book) {
          this.bookForm.fillForm(book);
          // Menghapus buku dari daftar sementara untuk edit
          this.deleteBook(id);
        }
      }
  
    // Simpan buku ke localStorage
    saveBooks() {
      localStorage.setItem("books", JSON.stringify(this.books));
      // Setelah buku disimpan, render ulang daftar buku
      this.bookList.render(
        this.books,
        this.deleteBook.bind(this),
        this.editBook.bind(this)
      );
    }
  
    // Fungsi untuk mengganti tema
    toggleTheme() {
      const currentTheme = document.body.classList.contains("theme-dark") ? "dark" : "light";
      document.body.classList.toggle("theme-dark", currentTheme === "light");
      document.body.classList.toggle("theme-light", currentTheme === "dark");
      localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
      this.updateThemeIcon();
    }
  
    // Fungsi untuk memperbarui ikon tema
    updateThemeIcon() {
      const themeIcon = document.getElementById("theme-icon");
      const isDarkTheme = document.body.classList.contains("theme-dark");
      themeIcon.classList.toggle("bi-sun-fill", !isDarkTheme);
      themeIcon.classList.toggle("bi-moon-fill", isDarkTheme);
    }
  
    // Inisialisasi tema
    initTheme() {
      const savedTheme = localStorage.getItem("theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  
      if (!savedTheme) {
        document.body.classList.toggle("theme-dark", systemTheme === "dark");
        document.body.classList.toggle("theme-light", systemTheme === "light");
      } else {
        document.body.classList.toggle("theme-dark", savedTheme === "dark");
        document.body.classList.toggle("theme-light", savedTheme === "light");
      }
      this.updateThemeIcon();
    }
  }