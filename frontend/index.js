import { fetchNotes, addNote, saveEditNote } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = `
        <div class="container py-4">
            <h2 class="text-center mb-4">Tugas 2 Notes</h2>
            <div class="card p-3 mb-4">
                <div class="mb-3">
                    <input type="text" id="title" class="form-control" placeholder="Title">
                </div>
                <div class="mb-3">
                    <textarea id="content" class="form-control" placeholder="Tuliskan isi note disini ..."></textarea>
                </div>
                <button class="btn btn-primary w-100" id="addNoteBtn">Add Note</button>
            </div>
            <div id="notesContainer" class="row"></div>

            <!-- Edit Note Modal -->
            <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLabel">Edit Note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="editId">
                            <div class="mb-3">
                                <input type="text" id="editTitle" class="form-control">
                            </div>
                            <div class="mb-3">
                                <textarea id="editContent" class="form-control"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" id="saveEditBtn">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Load Bootstrap Scripts
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(bootstrapScript);

    // Attach event listeners
    document.getElementById("addNoteBtn").addEventListener("click", addNote);
    document.getElementById("saveEditBtn").addEventListener("click", saveEditNote);

    // Load initial notes
    fetchNotes();
});
