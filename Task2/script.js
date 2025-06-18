function addNote() {
  const container = document.getElementById("noteContainer");
  const newNote = document.createElement("div");
  newNote.classList.add("note");
  const textarea = document.createElement("textarea");
  textarea.placeholder = "Write your note here...";
  newNote.appendChild(textarea);
  const addButton = document.querySelector(".add-note");
  container.insertBefore(newNote, addButton);
}
