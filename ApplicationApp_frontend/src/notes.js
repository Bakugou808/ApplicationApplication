

// full crud is there, still need to fill out the openNote function, to render the note onto the main stage area of the page
// also need to add a cancel button


// fetches

function allNotes(stage){
    
    fetch(`${STAGE_URL}/${stage.id}`)
    .then(resp => resp.json())
    .then(stage => buildNotes(stage))
}

function submitNote(note, method=""){
    let stageId = note.stage_id
    let url = NOTE_URL

    if (method === "PATCH"){
        url = `${NOTE_URL}/${note.id}`
    }
    fetch(url,{
        method: method,
        headers: {
            "Content-Type": "application/json", 
            accept: "application/json"},
        body: JSON.stringify(note)
    })
    .then(resp => resp.json())
    .then(note => {
        let stage = {id: note.stage_id}
        allNotes(stage) //unqexpected end of JSON input
    })
}

function deleteNote(note){
    
    let url = `${NOTE_URL}/${note.id}`
    fetch(url,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json", 
            accept: "application/json"}
    })
    .then(resp => {
        let noteDiv = document.getElementById(`note${note.id}`)
        noteDiv.remove()
    })
}



// builders
function buildNotes(stage){
    notesContainerDiv.innerHTML = ""
    
    console.log(stage.notes)
    
    stage.notes.forEach(note => {
        buildNote(note, stage)
    })
    
    newNoteButtonBuilder(stage)
}

function buildNote(note, stage){
    let noteDiv = document.createElement("div")
    let editBtn = document.createElement("button")
    let deleteBtn = document.createElement("button")
    editBtn.innerText = "Edit Note"
    deleteBtn.innerText = "Delete Note"
    editBtn.onclick = ()=> buildNoteForm(note, stage, "edit")
    deleteBtn.onclick = ()=> deleteNote(note)

    noteDiv.classList.add("note-card")
    noteDiv.id = `note${note.id}`
    noteDiv.setAttribute("data-note-id", note.id)
    noteDiv.innerText = `\n\n${note.title}\n${note.details}\n\n` 

    noteDiv.onclick = () => openNote(note)
    noteDiv.append(editBtn, deleteBtn)
    notesContainerDiv.appendChild(noteDiv)
}

function buildNoteForm(note="", stage="", condition=""){

    // notesContainerDiv.innerHTML = ""
    notesView.innerHTML = ""
    
    let cancelBtn = document.createElement("button")
    cancelBtn.innerText = "Cancel"
    cancelBtn.onclick = () => {
        // notesView.innerHTML = ""
        buildNotes(stage)
    } 

    let formDiv = document.createElement("div")
    
    if (condition === "new"){
        formDiv.innerHTML = `
        <form id="note-form">
        <h3>Add a New Note</h3>
        <input
          type="text"
          name="title"
          value=""
          placeholder="Note Title"
          class="input-text"
          required
        />
        <br />
        <textarea
          type="text"
          name="details"
          value=""
          placeholder="Note Details"
          class="input-text"
          required
        /></textarea>
        <br />
        <input
          type="submit"
          name="submit"
          value="Create Note"
          class="submit"
        />
      </form>`
    } else {
        formDiv.innerHTML = `
        <form id="note-form">
        <h3>Edit Note</h3>
        <input
          type="text"
          name="title"
          value="${note.title}"
          placeholder="Job Title"
          class="input-text"
        />
        <br />
        <textarea
          type="text"
          name="details"
          value=
          placeholder="Note Details"
          class="input-text"
        />"${note.details}"</textarea>
        <br />
        <input
          type="submit"
          name="submit"
          value="Save Edits"
          class="submit"
        />
      </form>`
    }
    formDiv.addEventListener("submit", ()=> submitNoteHandler(note, stage))
    notesView.appendChild(formDiv)
    formDiv.appendChild(cancelBtn)

}

// callbacks 
function submitNoteHandler(note, stage=""){
    event.preventDefault()
    let noteObj = {title: event.target.title.value, details: event.target.details.value}
    if (note === ""){
        noteObj.stage_id = stage.id
        submitNote(noteObj, "POST")
    } else {
        noteObj.stage_id = note.stage_id
        noteObj.id = note.id
        submitNote(noteObj, "PATCH")
    }
}

function openNote(note){
    console.log(note)
    // render note in center stage --> allow for edits and view
}

// newNoteButton
function newNoteButtonBuilder(stage){
    notesView.innerHTML = ""
    // notesView.innerText = "Notes"
    let newNoteBtn = document.createElement("button")
    newNoteBtn.innerText = "+"
    newNoteBtn.setAttribute("data-stage-id", stage.id)
    newNoteBtn.onclick = ()=> buildNoteForm("", stage, "new")
    notesView.appendChild(newNoteBtn)
}

// invoke functions
// newNoteButtonBuilder()