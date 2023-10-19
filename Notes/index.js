document.getElementById('new-note-button').addEventListener('click', function() {
    let note = document.createElement('div');
    note.className = 'note';

    let textarea = document.createElement('textarea');
    note.appendChild(textarea);

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        textarea.disabled = !textarea.disabled;
    });
    note.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        note.parentNode.removeChild(note);
    });
    note.appendChild(deleteButton);

    document.getElementById('notes-container').appendChild(note);
});
