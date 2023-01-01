import { createContext, useState} from 'react'

export const UserContext = createContext()

const Provider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [notes, setNotes] = useState(null)
    const [search, setSearch] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [updateVisible, setUpdateVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [logoutVisible, setLogoutVisible] = useState(false)
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false)

    let searchNote = []

    if(!searchNote >= 1) {
        searchNote = notes
    } else {
        if(notes !== null){
            searchNote = notes.filter(note => {
                const contentNote = note.content.toLowerCase()
                const contentSearch = search.toLowerCase()
                return contentNote.includes(contentSearch)
            })
        }

    }

    return (
        <UserContext.Provider 
            value={{ 
                user,
                setUser, 
                notes, 
                setNotes, 
                loading, 
                setLoading, 
                search, 
                setSearch,
                searchNote,
                checkbox, 
                setCheckbox,
                updateVisible,
                setUpdateVisible,
                deleteVisible,
                setDeleteVisible,
                logoutVisible, 
                setLogoutVisible,
                deleteAccountVisible, 
                setDeleteAccountVisible
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default Provider