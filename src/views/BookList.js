export class BookList {
    constructor() {
      this.bookListContainer = document.getElementById("book-list");
    }
  
    render(books, onDelete, onEdit) {
      // Form Filter
      this.bookListContainer.innerHTML = `
          <div class="mb-4">
            <h2 class="h4 mb-3">Daftar Buku</h2>
            <form id="filter-form" class="mb-3">
              <input type="text" id="filter-title" class="form-control" placeholder="Filter berdasarkan Judul" style="width: 200px; display: inline-block;" />
              <input type="text" id="filter-author" class="form-control" placeholder="Filter berdasarkan Penulis" style="width: 200px; display: inline-block;" />
              <input type="number" id="filter-year" class="form-control" placeholder="Filter berdasarkan Tahun" style="width: 200px; display: inline-block;" />
              <button type="submit" class="btn btn-primary ms-2">Filter</button>
            </form>
          </div>
          <div class="row" id="book-list-content"></div>
      `;
  
      // Handle filter
      const filterForm = document.getElementById("filter-form");
      const filterTitle = document.getElementById("filter-title");
      const filterAuthor = document.getElementById("filter-author");
      const filterYear = document.getElementById("filter-year");

      filterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const filteredBooks = books.filter(book => {
          const titleMatch = book.title.toLowerCase().includes(filterTitle.value.toLowerCase());
          const authorMatch = book.author.toLowerCase().includes(filterAuthor.value.toLowerCase());
          const yearMatch = book.year.toString().includes(filterYear.value);
          
          return titleMatch && authorMatch && yearMatch;
        });

        this.renderBookList(filteredBooks, onDelete, onEdit);
      });
  
      // Initial render of all books
      this.renderBookList(books, onDelete, onEdit);
    }
  
    renderBookList(books, onDelete, onEdit) {
      const bookListContent = document.getElementById("book-list-content");
      if (books.length === 0) {
        bookListContent.innerHTML =
          "<p class='text-center'>Belum ada buku yang ditambahkan.</p>";
        return;
      }
  
      bookListContent.innerHTML = books
        .map(
          (book) => `
            <div class="col-md-6 mb-3">
              <div class="card shadow-neumorphic book-card glassy">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text"><strong>Deskripsi:</strong> ${book.description}</p> 
                  <p class="card-text"><strong>Penulis:</strong> ${book.author}</p>
                  <p class="card-text"><strong>Tahun:</strong> ${book.year}</p>
                  <div class="d-flex justify-content-end">
                    <button class="btn btn-warning btn-sm edit-btn shadow-neumorphic" data-id="${book.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn shadow-neumorphic" data-id="${book.id}">Hapus</button>
                  </div>
                </div>
              </div>
            </div>
          `
        )
        .join("");
  
      this.bookListContainer.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => onDelete(button.dataset.id));
      });
  
      this.bookListContainer.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => onEdit(button.dataset.id));
      });
    }
}
