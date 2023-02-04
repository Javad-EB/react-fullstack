import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { Types } from 'mongoose'

// initial state
const InitialState = {
    user: null,
    fetchingUser: true,
    completeToDos: [],
    incompleteToDos: [],
}

// reducer
const globalReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                fetchingUser: false,
            }
        case "SET_COMPLETE_TODOS":
            return {
                ...state,
                completeToDos: action.payload,
            }
        case "SET_INCOMPLETE_TODOS":
            return {
                ...state,
                incompleteToDos: action.payload,
            }
        case "RESET_USER":
            return {
                ...state,
                user: null,
                completeToDos: [],
                incompleteToDos: [],
                fetchingUser: false,

            }
        default:
            return state
    }
}

// create a context
export const GlobalContext = createContext(InitialState)

// provider component
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(globalReducer, InitialState)

    useEffect(() => {
        getCurrentUser()
    }, [])
    // action: get current user
    const getCurrentUser = async () => {
        try {
            const res = await axios.get("/api/auth/current")

            if (res.data) {
                const toDoRes = await axios.get("/api/todos/current")

                if (toDoRes.data) {
                    dispatch({ type: "SET_USER", payload: res.data })
                    dispatch({ type: "SET_COMPLETE_TODOS", payload: toDoRes.data.complete })
                    dispatch({ type: "SET_INCOMPLETE_TODOS", payload: toDoRes.data.incomplete })
                }
            } else {
                dispatch({ type: "RESET_USER" })
            }
        } catch (err) {
            console.log(err)
            dispatch({ type: "RESET_USER" })
        }
    }

    const logout = async () => {
        try {
            await axios.put("/api/auth/logout")

            dispatch({ type: "RESET_USER" })
        } catch (err) {
            console.log(err)
            dispatch({ type: "RESET_USER" })
        }
    }

    const addToDo = (toDo) => {
        dispatch({
            type: "SET_INCOMPLETE_TODOS",
            payload: [toDo, ...state.incompleteToDos]
        })
    }

    const value = {
        ...state,
        getCurrentUser,
        logout,
        addToDo,
    }
    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}