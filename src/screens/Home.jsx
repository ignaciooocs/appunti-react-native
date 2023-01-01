import { useContext, useEffect } from "react"
import { SafeAreaView } from "react-native"
import LoadingScreen from "../components/LoadingScreen"
import { UserContext } from "../context/provider"
import { getUser } from "../services/getNotes"
import NotesList from "../components/NotesList"

const Home = () => {

    const { user, notes, setNotes } = useContext(UserContext)
 
    useEffect(() => {
        const { id, token } = user
        getUser({id, token}, setNotes)
    }, [notes])

    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            {notes !== null ? <NotesList/> : <LoadingScreen/>}
        </SafeAreaView>
    )
}

export default Home