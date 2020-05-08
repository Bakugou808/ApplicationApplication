// Tasks
const TASK_URL = "http://localhost:3000/tasks"
const taskDIV = document.querySelector("div.tasks")
const taskFormDIV = document.querySelector("div.task-form")
const taskListUL = document.querySelector("div.task-list")
const tasks = document.body.querySelector(".tasks")
// Notes
const NOTE_URL = "http://localhost:3000/notes"
const notesContainerDiv = document.getElementById("notes-container")
const notesView = document.body.querySelector(".note-view")
const noteView = document.body.querySelector(".note-view")
// stages
const STAGE_URL = "http://localhost:3000/stages"
const STAGE = document.body.querySelector('.stage-card-view')
const stageView = document.body.querySelector(".stage-view")
const scrollingWrapper = document.body.querySelector(".scrolling-wrapper")
const stageUl = document.getElementById('stage-list')
const STAGE_TITLE = document.body.querySelector(".div3")
const STAGE_CARD_VIEW = document.body.querySelector(".stage-card-view")

//  Positions
const POSITION_URL = "http://localhost:3000/positions"
const userLink = document.body.querySelector(".home")
const posMenu = document.body.querySelector(".positions")
// const posMenuUl = document.getElementById("positions-ul")
const posView = document.body.querySelector(".position-view")
const posViewBar = document.getElementById("pos-view-bar")
const posViewMenu = document.getElementById("pos-view-bar-content")
const posMenuDiv = document.getElementById("positions-div")

// .body.querySelector(".pos-content")
// user id
const USER_URL = "http://localhost:3000/users"




// const userId = userLink.id
const parentDiv = document.body.querySelector('.parent')
// Analytics
const graphs = document.body.querySelector(".graphs")


function fetchAll(userId){
    fetch(`${USER_URL}/${userId}`)
    .then(resp => resp.json())
    .then(user => buildLeftColumn(user))

}

function fetchPosition(posId){
    fetch(`${POSITION_URL}/${posId}`)
    .then(resp => resp.json())
    .then(position => buildStagesBar(position))
    
}

function deletePos(position){
    fetch(`${POSITION_URL}/${position.id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        }
    })
    .then(() => {
        refreshView()
        // fetchAll(userLink.id)
        // // posForm() Add splash 
    })
}

function submitPosition(positionObj, method=""){
    
    let url = POSITION_URL
    if (method === "PATCH"){
        url = `${POSITION_URL}/${positionObj.id}`
    }
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify(positionObj)
    })
    .then(resp => resp.json())
    .then(position => {
        fetchAll(userLink.id)
        buildPosView(position)
        document.getElementById("new_position").innerHTML = ""
        buildStagesBar(position)
    })
}

// builders: specifically for row 3

function buildStagesBar(position){
    scrollingWrapper.innerHTML = ""
    // scrollingWrapper.style = "max-width:800px;margin:10 auto;"
    scrollingWrapper.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) {scrollingWrapper.scrollLeft += 100;}
        else {scrollingWrapper.scrollLeft -= 100;}
      });

    if (position){
        position.stages.forEach(stage => {
            let stageDiv = document.createElement("div")
            stageDiv.classList.add("stage-card")
            stageDiv.id = `stage${stage.id}`
            // stageDiv.innerText = stage.title
            stageDiv.innerHTML = `<br><h2>${stage.title}<h2><br>`
            stageDiv.onclick = ()=> {
                console.log(`${stage.title} button was clicked`)
                buildStageShow(stage)
    
                fetchStageTasks(stage.id)
                allNotes(stage)
            } 
            // buildStageShow(stage)
            scrollingWrapper.append(stageDiv)
        })
    }
    let addStage = document.createElement("div")
    addStage.id = "addStageCard"
    addStage.classList.add("stage-card")
    addStage.innerHTML = `<h2>Add Next Stage</h2>`
    addStage.onclick = () => stageForm(position,"new")
    // console.log("bring me the form for a new stage")
    scrollingWrapper.appendChild(addStage)

}

// builders
// step 1 modifed
function buildLeftColumn(user){

// older 'changes pre upstream'
    // userLink.innerHTML = ""
    posMenuDiv.innerHTML = ""
    // let userName = document.createElement("h2")
    // userName.innerText = user.username
    // userLink.id = user.id 
    // userLink.innerHTML = ""
    // posMenuUl.innerHTML = ""
    // let userName = document.createElement("h2")
    // userName.innerText = user.username
    // userLink.id = user.id 
    // have a link for usrname
    // userName.onclick = ()=> openUser(user)
    
    user.positions.forEach(position => {
        buildPosP(position)
    })
    let title = document.createElement("h3")
    title.id = "pos-sidebar-header"
    title.innerText = "Positions"
    posMenuDiv.prepend(title)


    let newPosBtn = buttonBuilders()
    posMenuDiv.appendChild(newPosBtn)

    // userLink.appendChild(userName)

    // let newPosBtn = document.createElement("button")
    // newPosBtn.innerText = "+"
    // newPosBtn.onclick = () => posForm()
    // posMenu.prepend(newPosBtn)
    
    // userLink.appendChild(userName)
    
}

function buildPosView(position){
    
    if (document.getElementById("pos-view-position") && document.getElementById("pos-view-company")
    ){
        document.getElementById("pos-view-position").remove()
        document.getElementById("pos-view-company").remove()
    }
  
    
    let title = document.createElement("h1")
    let company = document.createElement("h3")
    let contact = document.createElement("h3")
    let details = document.createElement("p")
    let dates = document.createElement("p")
    let procon = document.createElement("p")
    let rating = document.createElement("p")
    let requirements = document.createElement("p")
    let salary = document.createElement("h3")
    let status = document.createElement("h3")
    let website = document.createElement("p")
    let editBtn = document.createElement("button")
    let deleteBtn = document.createElement("button")

    let midDiv = document.createElement("div")
    midDiv.id = "pos-details"

    

    // posView.id = position.id
    company.innerText = position.company
    title.innerText = position.title 
    dates.innerText = `Posting Date - Closing Date \n${position.postdate} - ${position.closingdate}`
    salary.innerText = `Salary: ${position.salary}`
    details.innerText = `Details:\n\n${position.details}` 
    requirements.innerText = `Requirements: ${position.requirements}`
    contact.innerText = `Contact: ${position.contact}`
    website.innerText = position.website
    procon.innerText = `Pros/Cons: ${position.procon}` 
    rating.innerText = `Rating: ${position.rating}` 
    status.innerText = `Status: ${position.status}` 

    editBtn.innerText = "Edit Position"
    editBtn.classList.add("button")
    editBtn.onclick = ()=>{
        // refreshView()
        posForm(position)
    } 

    deleteBtn.innerText = "Delete Position"
    deleteBtn.classList.add("button")
    deleteBtn.onclick = ()=> deletePos(position)

    let pPos = document.createElement('div')
    pPos.id = "pos-view-position"
    let pComp = document.createElement('div')
    pComp.id = "pos-view-company"
    pPos.innerText = position.title 
    pComp.innerText = position.company
    posViewBar.append(pPos, pComp)
    // posViewBar.innerText = `Position: ${title.innerText} \nCompany: ${company.innerText}`
    midDiv.append(salary, status, editBtn, deleteBtn, dates, contact, website, rating, procon, requirements, details)

    posViewMenu.append(midDiv)


    // addStageBtn.innerText = 'Add Stage'
    // addStageBtn.onclick = ()=> stageForm(position)

    // posView.append(company, title, salary, dates, status, contact, website, rating, procon, requirements, details, editBtn, deleteBtn, addStageBtn)
}

function posForm(position=""){

    let formDiv = document.createElement("div")
    let cancelBtn = document.createElement("button")
    cancelBtn.innerText = "Cancel"
    cancelBtn.onclick = ()=> cancelAction(position)
    formDiv.id = "new_position"
    if (position === ""){
        formDiv.innerHTML = `
        <form id="position-form">
        <h3>Add a New Position</h3>
        <input
          type="text"
          name="title"
          value=""
          placeholder="Job Title"
          class="input-text"
          required
        >
        <br >
        <input
          type="text"
          name="company"
          value=""
          placeholder="Company Name"
          class="input-text"
          required
        >
        <br >
        <input
            type="number"
            name="salary"
            step="1000"
            value=""
            placeholder="Salary"
            class="input-text"
        >
        <br >
        <input
            type="text"
            name="contact"
            value=""
            placeholder="Company Contact"
            class="input-text"
        >
        <br >
        <input
            type="text"
            name="website"
            value=""
            placeholder="Company Website"
            class="input-text"
        >
        <br >
        <textarea
            type="text"
            name="requirements"
            value=""
            placeholder="Requirements"
            class="new-input-text-scrollable"
        >Requirements
        </textarea>
        <br >
        <label name="postdate"> 
            Date Posted
        </label>
        <input
            type="date"
            name="postdate"
            placeholder="Date Posted"
            value=""
            class="input-text"
        >
        <br >
        <label name="closingdate"> 
            Closing Date
        </label>
        <input
            type="date"
            name="closingdate"
            value=""
            placeholder="Closing Date"
            class="input-text"
        >
        <br >
        Rating:
        <select name="rating">
            <option value="1">Awesome</option>
            <option value="2">It's Ok</option>
            <option value="3">Better than Nothing</option>
        </select>
        <br >
        <textarea
            type="text"
            name="procon"
            value=""
            placeholder="Pros/Cons:"
            class="new-input-text-scrollable"
        >Pros & Cons
        </textarea>
        <br >
        Status:
        <select name="status">
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
        </select>
        <br >
        <textarea
            id="pos-desc-input-txt" 
            type="text" 
            font-size:1.3em; 
            padding:.5em;
            name="details"
            value=""
            placeholder="Details"
            class="new-input-text-scrollable"
            required
        >Description
        </textarea>
        <br >
        <input
          type="submit"
          name="submit"
          value="Create Position"
          class="submit"
        >
      </form>`
    } else {
        formDiv.innerHTML = `
        <form id="position-form">
            <h3>Edit Position</h3>
        <label name="title">
            Job Title
        </label>
        <br >
        <input
          type="text"
          name="title"
          value="${position.title}"
          placeholder="Job Title"
          class="input-text"
          required
        >
        <br >
        <label name="company">Company</label>
        <br >
        <input
          type="text"
          name="company"
          value="${position.company}"
          placeholder="Company Name"
          class="input-text"
          required
        >
        <br >
        <label name="salary">
            Salary
        </label>
        <br >
        <input
            type="number"
            name="salary"
            step="1000"
            value="${position.salary}"
            placeholder="Salary"
            class="input-text"
        >
        <br >
        <label name="contact">
            Company Contact
            </label>
        <br >
        <input
            type="text"
            name="contact"
            value="${position.contact}"
            placeholder="Company Contact"
            class="input-text"
        >
        <br >
        <label name="website">
            Company Website
        </label>
        <br >
        <input
            type="text"
            name="website"
            value="${position.website}"
            placeholder="Company Website"
            class="input-text"
        >
        <br >
        <label name="requirements">
            Requirements
        </label>
        <br >
        <textarea
            type="text"
            name="requirements"
            placeholder="Requirements"
            class="edit-input-text-scrollable"
            >
            "${position.requirements}"
        </textarea>
        <br >
        <label name="postdate">
            Date Posted
        </label>
        <br >
        <input
            type="date"
            name="postdate"
            value="${position.postdate}"
            placeholder="Date Posted"
            class="input-text"
        >
        <br >
        <label name="closingdate">
            Closing Date
        </label>
        <br >
        <input
            type="date"
            name="closingdate"
            value="${position.closingdate}"
            placeholder="Closing Date"
            class="input-text"
        >
        <br >
        <label name="rating">
            Rating
        </label>
        <br >
        <select name="rating">
            <option value="1">Awesome</option>
            <option value="2">It's Ok</option>
            <option value="3">Better than Nothing</option>
        </select>
        <br >
        <label name="procon">
            Pros/Cons
        </label>
        <br >
        <textarea
            type="text"
            name="procon"
            value=
            placeholder="Pros/Cons:"
            class="edit-input-text-scrollable"
            >
            "${position.procon}"
        </textarea>
        <br >
        <label name="status">
            Application Status
        </label>
        <br >
        <select name="status">
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
        </select>
        <br >
        <label name="details">
            Details
        </label>
        <br >
        <textarea   
            id="details-input"
            type="textarea"
            name="details"
            placeholder="Details"
            class="edit-input-text-scrollable"
            >
            "${position.details}"
        </textarea>
        <br >
        <input
            type="submit"
            name="submit"
            value="Save Edits"
            class="submit"
        >
      </form>`
    }


    // ---> switch back to input --> set a standard width and height -> if they go beyond the size have an overflow scroll property .

    // // fetch the former form and repopulate it
    formDiv.appendChild(cancelBtn)

    posViewBar.innerHTML = ""
    document.body.querySelector(".div2").appendChild(formDiv)
    let form = document.getElementById("position-form")
    form.addEventListener("submit", ()=> handlePosSubmit(position))
}

function handlePosSubmit(position=""){
    event.preventDefault()
    console.log(position)
    let p = event.target
    let positionObj = {
        title: p.title.value,
        company: p.company.value, 
        requirements: p.requirements.value, 
        details: p.details.value, 
        postdate: p.postdate.value, 
        closingdate: p.closingdate.value, 
        salary: p.salary.value, 
        contact: p.contact.value, 
        website: p.website.value, 
        rating: p.rating.value, 
        procon: p.procon.value, 
        status: p.status.value, 
        user_id: userLink.id
    }

    if (position === ""){
        submitPosition(positionObj,"POST")
    } else {
        positionObj.id = position.id
        submitPosition(positionObj, "PATCH")
    }
}

function buttonBuilders(){
    // position form
    let newPosBtn = document.createElement("p")
    newPosBtn.id = "new-position-button"
    newPosBtn.classList.add("new-pos-link")
    newPosBtn.innerText = "Add a Position"
    // posMenu.appendChild(newPosBtn);
    newPosBtn.onclick = () => {
        posForm()
        closePosNav()
        notesContainerDiv.innerHTML = ""
        taskListUL.innerHTML = ""
        // stage view and stage card 
        scrollingWrapper.innerHTML = ""
        // buildStagesBar(position)
        STAGE_CARD_VIEW.innerHTML = ""
        posViewMenu.innerHTML = ""
    } 
    return newPosBtn
}

// callbacks
function showDetails(){
    let detailDiv = document.querySelector("#pos-details")
    detailDiv.toggleAttribute("hidden")
}


function buildPosP(position){
    
    let p = document.createElement("p")
        p.onclick = ()=> {
            buildPosView(position)

            fetchPosition(position.id)
            notesContainerDiv.innerHTML = ""
            taskListUL.innerHTML = ""
            STAGE_CARD_VIEW.innerHTML = ""
            closePosNav()
        } 
        // li.onclick = ()=> buildPosView(position); //include buildStageLIst(position) function to populate position areas on position click and first/last stage area on position click 
        p.innerText = position.title
        p.setAttribute('data-pos-id', `${position.id}`)
        // have a link for positions
        posMenuDiv.appendChild(p)
}

function cancelAction(position){
    position === "" ? posView.innerHTML = "" : buildPosView(position)
  
    // if position === "" set to blank div --> eventually set to splash page!
}
// callbacks
function showDetails(){
    let detailDiv = document.querySelector("#pos-details")
    detailDiv.toggleAttribute("hidden")
}
