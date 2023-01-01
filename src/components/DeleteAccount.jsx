import { useContext } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Modal, View, SafeAreaView, StyleSheet, Text } from "react-native"
import { UserContext } from "../context/provider"
import { deleteUser } from '../services/deleteUser'
import { deleteNote } from '../services/getNotes'
import LoadingScreen from "./LoadingScreen"
import CustomButton from "./Button"
import { STORAGE } from '../../keys'

const DeleteAccount = () => {

    const { user, setUser, notes, setDeleteAccountVisible, deleteAccountVisible, loading, setLoading } = useContext(UserContext)

    const userDelete = async () => {
        const { id, token } = user

        try {
            setLoading(true)

            for (const note of notes) {
                await deleteNote(note.id, { token })
            }

            await deleteUser({ id, token })
            await AsyncStorage.removeItem(STORAGE)

            setUser(null)
            setDeleteAccountVisible(false)
            setLoading(false)
            
            alert('Su cuenta se elimino correctamente')
        } catch (error) {
            console.log('ocurrio un error al eliminar el usuario')
            alert('ocurrio un error')
        }
    }

    return (
        <Modal animationType="slide" transparent={false} visible={deleteAccountVisible}>
            {loading ? 
            <LoadingScreen/> : 
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <Text style={styles.text}>¿Seguro que quieres eliminar tu cuenta?</Text>
                    <View style={styles.containerButton}>
                        <CustomButton
                            cancel={setDeleteAccountVisible}
                            text='Cancelar'
                            color='#2959ea'
                            border='#2959ea'
                        />
                        <CustomButton
                            method={userDelete}
                            text='Eliminar cuenta'
                            border='#f33'
                            color='#f33'
                        /> 
                    </View>
                </View>
            </SafeAreaView>}
        </Modal>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    container: {
        padding: 15,
        borderWidth: .5,
        borderColor: '#888',
        borderRadius: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: "center",
    },
    text: {
        marginTop: 10,
        padding: 10,
        fontSize: 15,
        letterSpacing: 1.5,
        fontWeight: '600',
        textAlign: 'center'
    },
    containerButton: {
        flexDirection: 'row',
        marginTop: 15
    },
    button: {
        marginBottom: 15,
        borderWidth: .5,
        width: '45%',
        borderRadius: 5,
        marginHorizontal: 10
    }
})

export default DeleteAccount