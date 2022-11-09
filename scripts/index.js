const get = async (id = '') => {
    const response = await fetch(`https://636478418a3337d9a2f7979e.mockapi.io/users/${id}`)
    if (!response.ok) {
        document.getElementById('alert-error').classList.add('show')
        document.getElementById('results').innerHTML = ""
        setTimeout(() => {
            document.getElementById('alert-error').classList.remove('show')
        }, 2500)
        return null
    }
    return await response.json()
}

const create_update = async (id, user, action) => {
    await fetch(`https://636478418a3337d9a2f7979e.mockapi.io/users/${id}`, {
        method: action,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

const remove = async (id) => {
    const res = await fetch(`https://636478418a3337d9a2f7979e.mockapi.io/users/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) {
        document.getElementById('alert-error').classList.add('show')
        document.getElementById('results').innerHTML = ""
        setTimeout(() => {
            document.getElementById('alert-error').classList.remove('show')
        }, 2500)
        return false
    }
    return true
}

function printfUsers(users) {
    if (users) {
        if (!Array.isArray(users))
            users = [users]
        let htmlContentToAppend = ""
        users.forEach(({ id, name, lastname }) => {
            htmlContentToAppend += `
            <li class="list-group-item bg-dark text-white">
                ID: ${id}
                <br>
                NAME: ${name}
                <br>
                LASTNAME: ${lastname}
            </li>
            `
        });
        document.getElementById('results').innerHTML = htmlContentToAppend
    }
}

document.getElementById('btnGet1').addEventListener('click', async () => {
    const id = document.getElementById('inputGet1Id').value
    const users = await get(id)
    printfUsers(users)
})

document.querySelectorAll('#inputPostNombre, #inputPostApellido').forEach(element => {
    element.addEventListener('input', () => {
        const name = document.getElementById('inputPostNombre').value
        const lastname = document.getElementById('inputPostApellido').value

        if (name && lastname) {
            document.getElementById('btnPost').disabled = false
        }
        else {
            document.getElementById('btnPost').disabled = true
        }
    })
});

document.getElementById('btnPost').addEventListener('click', async () => {
    const name = document.getElementById('inputPostNombre').value
    const lastname = document.getElementById('inputPostApellido').value

    const user = {
        name,
        lastname
    }

    await create_update("", user, 'POST')
    const users = await get()
    printfUsers(users)
})

document.getElementById('inputPutId').addEventListener('input', (e) => {
    if (e.target.value) {
        document.getElementById('btnPut').disabled = false
    }
    else document.getElementById('btnPut').disabled = true
})

const myModal = new bootstrap.Modal(document.getElementById('dataModal'), {
    keyboard: false
})

document.getElementById('btnPut').addEventListener('click', async () => {
    const id = document.getElementById('inputPutId').value
    const user = await get(id)
    document.getElementById('inputPutNombre').value = user.name
    document.getElementById('inputPutApellido').value = user.lastname
    myModal.toggle()

    document.querySelectorAll('#inputPutNombre, #inputPutApellido').forEach(element => {
        element.addEventListener('input', () => {
            const name = document.getElementById('inputPutNombre').value
            const lastname = document.getElementById('inputPutApellido').value

            if (name && lastname) {
                document.getElementById('btnSendChanges').disabled = false
            }
            else {
                document.getElementById('btnSendChanges').disabled = true
            }
        })
    });
})

document.getElementById('btnSendChanges').addEventListener('click', async () => {
    const name = document.getElementById('inputPutNombre').value
    const lastname = document.getElementById('inputPutApellido').value

    if (name && lastname) {
        myModal.toggle()
        const user = {
            name,
            lastname
        }
        const id = document.getElementById('inputPutId').value
        await create_update(id, user, 'PUT')
        const users = await get()
        printfUsers(users)
    }
})

document.getElementById('inputDelete').addEventListener('input', (e) => {
    if (e.target.value) {
        document.getElementById('btnDelete').disabled = false
    }
    else document.getElementById('btnDelete').disabled = true
})

document.getElementById('btnDelete').addEventListener('click', async () => {
    const id = document.getElementById('inputDelete').value
    const type = await remove(id)
    if (type) {
        const users = await get()
        printfUsers(users)
    }
})