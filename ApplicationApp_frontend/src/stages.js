// // builders

function buildStageShow(stage) {
    STAGE_CARD_VIEW.innerHTML = ''
    const div = document.createElement('div')
    div.id = `stage-card`
    const title = document.createElement('h3')
    const status = document.createElement('p')
    // const startDate = document.createElement('p')
    // const endDate = document.createElement('p')
    const dates = document.createElement('p')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    title.innerText = `Title: ${stage.title}`
    status.innerText = `Status: ${stage.status}`
    dates.innerText = `Start date: ${stage.startdate} •••• End date: ${stage.enddate}`
    // endDate.innerText = `End date: ${stage.enddate}`
    editBtn.innerText = 'Edit'
    deleteBtn.innerText ='Delete'
    
    editBtn.addEventListener('click', ()=> stageForm(stage))
    // if stage form exist new form
    // else set values
    deleteBtn.addEventListener('click', ()=> handleDeleteStage(stage))

    div.append(title, status, dates, editBtn, deleteBtn)
    STAGE_CARD_VIEW.appendChild(div)
}

function stageForm(object, condition="") { //<--- position will go in the argument whenthe stage button is moved.
    
    if (condition === "new") {
        let position = object
        STAGE.innerHTML = 'New Stage'

        const div = document.createElement('div')
        const form = document.createElement('form')
        const title = document.createElement('input')
        const status = document.createElement('select')
        const startDate = document.createElement('input')
        const endDate = document.createElement('input')
        const submit = document.createElement('button')
         
        div.id = 'new_stage'
        title.type = 'text'
        title.name = 'title'
        title.required = 'true'
        title.placeholder = 'Title'

        status.innerHTML = `<select name="status">
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        </select>`

        status.type = 'text'
        status.name = 'status'
        status.placeholder = 'Status'
        startDate.type = 'date'
        startDate.name = 'startdate'
        endDate.type = 'date'
        endDate.name = 'enddate'
        submit.type = 'submit'
        submit.name = 'submit'
        submit.innerText = 'Submit'

        form.append(title, status, startDate, endDate, submit)
        div.appendChild(form)
        STAGE.appendChild(div)

        form.addEventListener('submit', ()=> handleStageSubmit(position, "new"))
    } else {
        let stage = object
        STAGE.innerHTML = 'Edit Stage'
        const div = document.createElement('div')
        const form = document.createElement('form')
        const title = document.createElement('input')
        const status = document.createElement('select')
        const startDate = document.createElement('input')
        const endDate = document.createElement('input')
        const submit = document.createElement('button')
        
        div.id = 'new_stage'
        title.type = 'text'
        title.name = 'title'
        title.value = stage.title

        status.innerHTML = `<select name="status">
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        </select>`
        
        status.type = 'text'
        status.name = 'status'
        status.value = stage.status
        startDate.type = 'date'
        startDate.name = 'startdate'
        startDate.value = stage.startdate
        endDate.type = 'date'
        endDate.name = 'enddate'
        endDate.value = stage.enddate
        submit.type = 'submit'
        submit.name = 'submit'
        submit.innerText = 'Submit Edit'

        form.append(title, status, startDate, endDate, submit)
        div.appendChild(form)
        STAGE.appendChild(div)
        
        form.addEventListener('submit', ()=> handleStageSubmit(stage, "edit"))

    }
}

// // handler

function handleDeleteStage(stage) {
    console.log(stage)
    
    fetch(`${STAGE_URL}/${stage.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", accept: "application/json"}
    })
    .then(()=> {
        let div = document.getElementById(`stage${stage.id}`)
        let card = document.getElementById(`stage-card`)
        div.remove()
        card.remove()
        taskListUL.innerHTML = ""
        notesContainerDiv.innerHTML = ""
        fetchAll(userLink.id)
    })
    
}

function handleStageSubmit(object, condition="") {
    event.preventDefault();
    
    // works great for edit 
    let stageObj = {
        // id: object.id,
        title: event.target.title.value,
        status: event.target.status.value,
        startdate: event.target.startdate.value,
        enddate: event.target.enddate.value,
        // position_id: object.position_id
    }
    
    if (condition === "new") {
        stageObj.position_id = object.id
        submitStage(stageObj, 'POST')
    } else {
        stageObj.id = object.id 
        stageObj.position_id = object.position_id
        submitStage(stageObj, 'PATCH')
    }
}

// // fetches

function submitStage(stageObj, method = '') {
    let url = STAGE_URL
    if (method === 'PATCH') {
        url = `http://localhost:3000/stages/${stageObj.id}`
    }
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json",
            Accepts: 'Application/json'
        },
        body: JSON.stringify(stageObj)
    })
    .then(resp => resp.json())
    .then(stage => {
        let posId = stage.position_id
        fetchPosition(posId)
        buildStageShow(stage)
    }) // need to add new stage to stage list
}