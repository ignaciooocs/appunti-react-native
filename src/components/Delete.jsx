import { useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import { Modal, View, SafeAreaView, StyleSheet, Text } from "react-native"
import { UserContext } from "../context/provider"
import { deleteNote } from "../services/getNotes"
import CustomButton from "./Button"

const Delete = ({nota}) => {
    
    const { user, setLoading, deleteVisible, setDeleteVisible} = useContext(UserContext)

    const navigation = useNavigation()
    
    const { token } = user

    const deletenote = () => {
        setLoading(true)
        deleteNote(nota.id, { token })
        setTimeout(() => {
            setLoading(false)
        }, 1500)
        navigation.navigate('Home')
        setDeleteVisible(false)
    }

    return (
        <Modal animationType="fade" transparent={false} visible={deleteVisible}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <Text style={styles.text}>¿Quieres eliminar la nota?</Text>
                    <View style={styles.containerButton}>
                        <CustomButton
                            cancel={setDeleteVisible}
                            text='Cancelar'
                            color='#2959ea'
                            border='#2959ea'
                        />
                        <CustomButton
                            method={deletenote}
                            text='Eliminar'
                            color='#f33'
                            border='#f33'
                        />
                    </View>    
                </View>
            </SafeAreaView>
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
        margin: 20,
        padding: 10,
        fontSize: 16,
        letterSpacing: 1.5,
        fontWeight: '600'
    },
    containerButton: {
        flexDirection: 'row',
        marginVertical: 20
    },
    button: {
        borderWidth: .5,
        width: '40%', 
        borderRadius: 5, 
        marginHorizontal: 10 
    }
})

export default Delete