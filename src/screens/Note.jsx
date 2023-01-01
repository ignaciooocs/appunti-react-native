import { useContext, useEffect, useState } from "react"
import { StyleSheet, ScrollView, View, Text, TouchableNativeFeedback } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import Delete from "../components/Delete"
import LoadingScreen from "../components/LoadingScreen"
import Update from "../components/Update"
import { UserContext } from "../context/provider"
import { getNoteId } from "../services/getNotes"

const Note = ({ route: {params}}) => {
    const { user, setUpdateVisible, setDeleteVisible } = useContext(UserContext)
    const [note, setNote] = useState({})
    const { token } = user

    useEffect(() => {
        getNoteId(params.id, setNote, {token})
    }, [note])

    return (
        <>
            {
                note.content ? (
                <ScrollView style={styles.ScrollView}>
                    <Text style={styles.username}>@{user.username}</Text>
                    <View style={styles.container}>
                        <Text style={styles.content}>{note.content}</Text>
                        {note.createdAt && 
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>Creado: {note.createdAt.split('T')[0]}</Text>
                            <Text style={styles.date}>Editado: {note.updatedAt.split('T')[0]}</Text>
                        </View>}
                    </View>
                    <View style={styles.containerIcon}>
                        <TouchableNativeFeedback onPress={() => setUpdateVisible(true)}>
                            <View style={styles.icon}>
                                    <Icon name='edit' style={{ fontSize: 18, color: 'rgb(39, 171, 103)'}} />
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => setDeleteVisible(true)}>
                            <View style={styles.icon}>
                                    <Icon name='trash' style={{ fontSize: 16, color: '#f33' }} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <Update nota={note}/>
                    <Delete nota={note}/>
                </ScrollView>
                ) : ( 
                <LoadingScreen/>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    ScrollView: {
        paddingHorizontal: 30,
        backgroundColor: '#fff'
    },
    username: {
        textAlign: 'center',
        fontSize: 24,
        letterSpacing: 3,
        margin: 20,
        color: 'rgb(39, 171, 103)',
        fontWeight: 'bold'
    },
    container: {
        padding: 15,
        borderWidth: .5,
        borderColor: '#888',
        borderRadius: 10,
        // minHeight: 350,
    },
    content: {
        fontSize: 16,
        lineHeight: 25,
        letterSpacing: .5,
        color: '#555'
    },
    dateContainer: {
        marginTop: 25
    },
    date: {
        marginVertical: 5,
        letterSpacing: 1
    },
    containerIcon: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row'
    },
    icon: {
        borderWidth: .5,
        borderColor: '#888',
        height: '100%',
        width: '45%',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5
    }
})

export default Note