const get = async (id = "") => {
    const response = await fetch(`https://636478418a3337d9a2f7979e.mockapi.io/users/${id}`)
    if (!response.ok) {
        document.getElementById("alert-error").classList.add("show")
        setTimeout(() => {
            document.getElementById("alert-error").classList.remove("show")
        }, 2500)
        return null
    }
    return await response.json()
}

const create_update_remove = async (id, user, action) => {
    await fetch(`https://636478418a3337d9a2f7979e.mockapi.io/users/${id}`, {
        method: action,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}