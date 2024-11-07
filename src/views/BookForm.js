export class BookForm {
    constructor() {
      this.formContainer = document.getElementById("book-form");
    }
  
    render(onSubmit) {
      this.formContainer.innerHTML = `
          <div class="card form-card glassy">
            <div class="card-body">
              <h2 class="h4 mb-3">- Tambah Buku -</h2>
              <form id="book-form">
                <div class="mb-3">
                  <label for="title" class="form-label">Judul Buku</label>
                  <input type="text" class="form-control rounded-pill" id="title" placeholder="Judul Buku" required>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Deskripsi Buku</label>
                        <td><input type="text" class="form-control rounded-pill" id="description" placeholder="Deskripsi Buku" required></td>
                </div>
                <div class="mb-3">
                  <label for="author" class="form-label">Penulis</label>
                  <input type="text" class="form-control rounded-pill" id="author" placeholder="Nama Penulis" required>
                </div>
                <div class="mb-3">
                  <label for="year" class="form-label">Tahun Terbit</label>
                  <input type="number" class="form-control rounded-pill" id="year" placeholder="Tahun" required>
                </div>
                
                <button type="submit" class="btn btn-primary w-100 rounded-pill shadow-neumorphic">Simpan Buku</button>
              </form>
            </div>
          </div>
        `;
  
      this.formContainer.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
  
        const title = document.getElementById("title").value; 
        const description = document.getElementById("description").value;
        const author = document.getElementById("author").value;
        const year = document.getElementById("year").value;
       
  
        onSubmit(title, description, author, year );
  
        this.resetForm();
      });
    }
  
    fillForm(book) {
      document.getElementById("title").value = book.title;
      document.getElementById("description").value = book.description;
      document.getElementById("author").value = book.author;
      document.getElementById("year").value = book.year;
      
    }
  
    resetForm() {
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("author").value = "";
      document.getElementById("year").value = "";
      
    }
}
