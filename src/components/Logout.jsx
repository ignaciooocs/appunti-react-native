import { useContext } from "react"
import { Modal, View, SafeAreaView, StyleSheet, Text } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from "../context/provider"
import CustomButton from "./Button"
import { STORAGE } from '../../keys'

const Logout = () => {

    const { setUser, logoutVisible, setLogoutVisible, setLoading } = useContext(UserContext)

    const logout = async () => {
        try {
            setLoading(true)

            await AsyncStorage.removeItem(STORAGE)

            setUser(null)
            setLogoutVisible(false)
            
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        } catch (error) {
            console.log('ocurrio un error')
        }
    }

    return (
        <Modal animationType="fade" transparent={false} visible={logoutVisible}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <Text style={styles.text}>¿Cerrar sesión?</Text>
                    <View style={styles.containerButton}>
                        <CustomButton
                            cancel={setLogoutVisible}
                            text='Cancelar'
                            color='#2959ea'
                            border='#2959ea'
                        />
                        <CustomButton
                            method={logout}
                            text='Cerrar sesión'
                            border='#f33'
                            color='#f33'
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
        margin: 15,
        padding: 10,
        fontSize: 16,
        letterSpacing: 1.5,
        fontWeight: '600'
    },
    containerButton: {
        flexDirection: 'row',
        marginVertical: 15
    },
    button: {
        borderWidth: .5,
        width: '40%',
        borderRadius: 5,
        marginHorizontal: 10
    }
})

export default Logout