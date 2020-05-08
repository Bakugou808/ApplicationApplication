const loginDiv = document.querySelector('.login-form-div')
const signupDiv = document.querySelector('.signup')
const userDisplay = document.querySelector('.logged-in-user')

function buildSignUpForm() {
    parentDiv.style.display = 'none'

    const brk1 = document.createElement('br')
    const brk2 = document.createElement('br')
    const brk3 = document.createElement('br')
    const brk4 = document.createElement('br')
    const form = document.createElement('form')
    const username = document.createElement('input')
    const first = document.createElement('input')
    const last = document.createElement('input')
    const password = document.createElement('input')
    const submit = document.createElement('button')

    username.type = 'text'
    username.name = 'username'
    username.placeholder = 'Username'
    first.type = 'text'
    first.name = 'firstname'
    first.placeholder = 'First Name'
    last.type = 'text'
    last.name = 'lastname'
    last.placeholder = 'Last Name'
    password.type = 'text'
    password.name = 'password'
    password.placeholder = "Password"
    submit.innerText = "Submit"

    form.addEventListener('submit', handleUserSubmit)
    form.append(username, brk1, first, brk2, last, brk3, password, brk4, submit)
    signupDiv.append(form)
}

function buildLoginForm() {
    loginDiv.innerHTML = ''
    userDisplay.style.display = 'none'

    const form = document.createElement('form')
    const username = document.createElement('input')
    const password = document.createElement('input')
    const submit = document.createElement('button')

    form.id = 'login-form'
    username.type = 'text'
    username.name = 'username'
    username.placeholder = 'Username'
    password.type = 'text'
    password.name = 'password'
    password.placeholder = "Password"
    submit.innerText = "Submit"

    form.addEventListener('submit', handleUserLogin)

    form.append(username, password, submit)
    loginDiv.appendChild(form)
}

function handleUserLogin() {
    event.preventDefault();

    const user = {
        username: event.target.username.value,
        password: event.target.password.value
    }
    // const loginForm = document.getElementById('login-form')
    // loginForm.remove()

    fetch(`${USER_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            Accepts: 'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => {
        console.log(user)
        if (user.status == 500) {
            alert('Something went wrong here!')
            buildLoginForm()
        } else {
        changePageView(user)
        logoutUser();
        }
    })
}

function logoutUser() {
    let logout = document.getElementById('logout-btn')
    logout.addEventListener('click', () => {
        location.reload()
        userLink.id = ''
        buildLoginForm();
        signupDiv.style.display = 'block'
        parentDiv.style.display = 'none'
    })
}

function changePageView(user) {
    
    const loginForm = document.getElementById('login-form')
    loginForm.remove()
    signupDiv.style.display = 'none'
    parentDiv.style.display = 'grid'
    userDisplay.style.display = 'block'
    userDisplay.innerHTML = `${user.username} <button id='logout-btn'> Logout </button>`
    userLink.id = user.id 
    
    fetchAll(user.id);
    buttonBuilders();
}



function handleUserSubmit() {
    event.preventDefault();
    const user = {
        username: event.target.username.value,
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        password: event.target.password.value
    }
    postUser(user)
}

function postUser(user) {
    fetch(USER_URL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            Accepts: 'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => changePageView(user))
}

function refreshView(){
    // clear:
    posViewBar.innerText = ""
    posViewMenu.innerText = ""
    taskListUL.innerText = ""
    document.querySelector("div#task-list-title").innerText = ""
    scrollingWrapper.innerText = ""
    STAGE.innerText = ""
    notesContainerDiv.innerText = ""
    buildStagesBar(position)
    fetchAll(userLink.id)
}





buildSignUpForm()
buildLoginForm()