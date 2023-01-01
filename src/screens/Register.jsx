import { useContext } from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import { UserContext } from "../context/provider"
import CustomButton from "../components/Button"
import LoadingScreen from "../components/LoadingScreen"
import { BASE_URL } from '../../keys'

const Register = () => {

    const { loading, setLoading } = useContext(UserContext)
 
    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: Yup.object(validationSchemas),
        validateOnChange: false,
        onSubmit: (formValue) => {
            const {username, name, password, confirm} = formValue
            const registration = {
                username,
                name,
                password
            } 

            if(password !== confirm) {
                alert('Las contraseñas no coinciden')
                return
            }
            register(registration)
        }
    })

    const register = async (formValue) => {
        try {
            setLoading(true)
            const url = `${BASE_URL}/users`
            await axios.post(url, formValue)
            navigation.navigate('Login')
        } catch (error) {
            console.log('ocurrio un error en el registro')
            if(error.response.data.code === 11000){
                alert(error.response.data.error)
                return 
            }
            for (const errors of error.response.data.errors) {
                alert(errors.msg)
            }
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {
                loading ? (
                <LoadingScreen/>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.containerForm}>
                            <View style={styles.form}>
                                <Text style={styles.error}>{formik.errors.username}</Text>
                                <TextInput
                                    placeholder="Nombre de usuario"
                                    style={styles.input}
                                    autoCapitalize='none'
                                    value={formik.values.username}
                                    onChangeText={(value) => formik.setFieldValue('username', value)}
                                />
                                <Text style={styles.error}>{formik.errors.name}</Text>
                                <TextInput
                                    placeholder="Nombre"
                                    style={styles.input}
                                    value={formik.values.name}
                                    onChangeText={(value) => formik.setFieldValue('name', value)}
                                />
                                <Text style={styles.error}>{formik.errors.password}</Text>
                                <TextInput
                                    placeholder='Contraseña'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                    value={formik.values.password}
                                    onChangeText={(value) => formik.setFieldValue('password', value)}
                                />
                                <Text style={styles.error}>{formik.errors.confirm}</Text>
                                <TextInput
                                    placeholder='Confirmar contraseña'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                    value={formik.values.confirm}
                                    onChangeText={(value) => formik.setFieldValue('confirm', value)}
                                />
                                <View style={styles.containerButton}>
                                    <CustomButton
                                        method={formik.handleSubmit}
                                        text='Registrarse'
                                        border='rgb(39,171,103)'
                                        color='rgb(39,171,103)'
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.toRegister}>
                            <Text style={styles.textRegister}>¿Ya tienes una cuenta?</Text>
                            <Text style={{ ...styles.textRegister, color: 'rgb(39,171,103)' }} onPress={() => navigation.navigate('Login')} >Iniciar sesión</Text>
                        </View>
                    </View>
                )
            }

        </>
    )
}

const initialValue = {
    username: '',
    name: '',
    password: ''
}

const validationSchemas = {
    username: Yup.string().required('Campo requerido')
        .matches(/^\S*$/, 'No debe contener espacios')
        .matches(/^[a-z]+$/, 'Solo debe contener letras minúsculas'),
    name: Yup.string().required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
    confirm: Yup.string().required('Campo requerido'),
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    containerForm: {
        justifyContent: 'center',
        padding: 35,
        height: '90%',
    },
    form: {
        height: '85%',
        marginTop: 50,
        justifyContent: 'space-around',
        borderWidth: .5,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        overflow: 'hidden'
    },
    text: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 22,
        letterSpacing: 2
    },
    input: {
        height: 50,
        borderBottomWidth: 3,
        borderBottomColor: 'rgb(39,171,103)',
        padding: 12,
        borderRadius: 10,
        marginBottom: 25
    },
    toRegister: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        backgroundColor: '#fff'

    },
    textRegister: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 5
    },
    error: {
        fontSize: 11,
        color: '#f55',
        marginTop: 10,
        marginLeft: 15
    },
    containerButton: {
        marginVertical: 10,
    },
})

export default Register