'use server'

import { cookies } from "next/headers"

function handleErrors(message) {

    const errors = []

    Object.keys(message).map(key => {
        message[key].map(error => {
            errors.push(error)
        })
    })

    return (errors.join())
}


export async function register(State, formData) {

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')


    const res = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            c_password: confirmPassword
        })
    })

    const data = await res.json()

    if (res.ok) {
        return {
            success: "You are registered"
        }
    } else {
        return {
            error: handleErrors(data)
        }
    }
}

export async function login(State, formData) {

    const email = formData.get('email')
    const password = formData.get('password')


    if (!email || !password) {
        return {
            error: "email and password are required!"
        }
    }


    const res = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    const data = await res.json()

    if (res.ok) {

        const cookieStore = await cookies()
        cookieStore.set({
            name: 'token',
            value: data.token,
            httpOnly: true
        })

        return {
            success: "You are logged in",
            user: data.user
        }
    } else {
        return {
            error: handleErrors(data)
        }
    }
}


export async function me() {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
        return {
            error: "Not authorized"
        }
    }

    const res = await fetch('http://127.0.0.1:8000/api/me', {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Accept': "application/json"
        }
    })

    const data = await res.json()

    if (res.ok) {
        return {
            user: data.user
        }
    } else {
        return {
            error: "User forbidden"
        }
    }

}


export async function logout() {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
        return {
            error: "Not authorized"
        }
    }

    const res = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Accept': "application/json"
        }
    })

    const data = await res.json()

    if (res.ok) {
        cookieStore.delete('token')

        return {
            success: "You are logged out"
        }
    } else {
        return {
            error: handleErrors(data)
        }
    }

}