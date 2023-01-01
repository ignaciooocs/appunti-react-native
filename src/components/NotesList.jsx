import { useContext, useState } from "react"
import { FlatList, StyleSheet, Text, RefreshControl, View, Switch } from "react-native"
import { UserContext } from "../context/provider"
import NoteCard from "./NoteCard"
import SearchNote from "./SearchNote"
import { getUser } from "../services/getNotes"
import LoadingScreen from "./LoadingScreen"

const NotesList = () => {

    const { user, setNotes, searchNote, search, loading } = useContext(UserContext)

    const [fresh, setFresh] = useState(false)
    
    // Filter priority notes 
    const [check, setCheck] = useState(false)
    let priority = []

    if (check) {
        priority = searchNote.filter(note => note.important === true)
    }

    // reload notes
    const { id, token } = user
    const reFresh = () => {
        setFresh(true)
        getUser({ id, token }, setNotes)
        setTimeout(() => {
            setFresh(false)
        }, 1500)
    }

    // results message 
    const Message = ({text}) => {
        return (
            <View style={styles.message}>
                <Text style={styles.messageText}>{text}</Text>
            </View>
        )
    }

    return (
        <>
            { 
                loading ? (
                        <LoadingScreen/> 
                    ) : (
                    <>
                        <SearchNote/>
                        {searchNote.length > 0 && (
                            <View style={styles.check}>
                                <Text style={styles.textCheck}>Filtrar por notas prioritarias</Text>
                                    <Switch
                                        value={check}
                                        onValueChange={(value) => setCheck(value)}
                                    />
                            </View>
                            )
                        }
                            {(check && priority.length === 0) && <Message text='No hay notas prioritarias' />}
                            {(searchNote.length === 0 && search.length > 0) && <Message text={`No hay resultados de "${search}"`}/>}
                            {(searchNote.length === 0 && search.length === 0) && <Message text={`¡Pulsa el boton + para añadir tu primera nota!`}/>}
                        <FlatList 
                            data={check ? priority : searchNote}
                            keyExtractor={(note) => String(note.id)}
                            renderItem={({item}) => <NoteCard nota={item} />}
                            contentContainerStyle={styles.flatList}
                            refreshControl={
                                <RefreshControl refreshing={fresh} onRefresh={reFresh}/>
                            }
                        />
                    </>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    flatList: {
        paddingHorizontal: 5,
        paddingBottom: 140,
        minHeight: '100%'
    },
    message: { 
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40

    },
    messageText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center'
    },
    check: {
        paddingHorizontal: 20,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textCheck: {
        color: '#555',
        letterSpacing: .5
    }
})

export default NotesList