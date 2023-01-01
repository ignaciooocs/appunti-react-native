import { useContext } from "react"
import { StyleSheet, Text, SafeAreaView, View } from "react-native"
import { UserContext } from "../context/provider"
import Logout from "../components/Logout"
import DeleteAccount from "../components/DeleteAccount"
import CustomButton from "../components/Button"


const Profile = () => {

    const { user, notes, setLogoutVisible, setDeleteAccountVisible } = useContext(UserContext)

    return (
        <SafeAreaView style={styles.ScrollView}>
            <Text style={styles.username}>@{user.username}</Text>
            <View style={styles.container}>
                <Text style={styles.text}>- <Text style={styles.negrita}>Nombre:</Text> {user.name}</Text>
                <View style={styles.border}/>
                <Text style={styles.text}>- <Text style={styles.negrita}>Nombre de usuario:</Text> {user.username}</Text>
                <View style={styles.border} />
                <Text style={styles.text}>- <Text style={styles.negrita}>Notas Totales:</Text> {notes.length}</Text>
                <View style={styles.border}/>
                <CustomButton
                    action={setLogoutVisible}
                    text='Cerrar sesión'
                    border='#f33'
                    color='#f33' /> 
            </View>
            <View style={styles.containerAccount}>
                <CustomButton
                    action={setDeleteAccountVisible}
                    text='Eliminar cuenta'
                    border='#f33'
                    color='#f33'
                />
            </View>
            <Logout/>
            <DeleteAccount/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ScrollView: {
        backgroundColor: '#fff',
        height: '100%'
    },
    username: {
        textAlign: 'center',
        fontSize: 24,
        letterSpacing: 3,
        margin: 30,
        color: 'rgb(39, 171, 103)',
        fontWeight: 'bold'
    },
    container: {
        paddingVertical: 40,
        paddingHorizontal: 15,
        borderWidth: .5,
        borderColor: '#888',
        borderRadius: 10,
        marginHorizontal: 30,
    },
    negrita: {
        color: '#000'
    },
    text: {
        fontSize: Platform.OS === 'android' ? 14 : 16,
        letterSpacing: 1,
        color: '#888'
    },
    border: {
        borderBottomWidth: .5,
        marginBottom: 30,
        marginTop: 10
    },
    containerButton: {
        borderWidth: .5,
        width: '50%',
        borderRadius: 5,
        borderColor: '#f33' 
    },
    containerAccount: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: 30,
    }
})

export default Profile