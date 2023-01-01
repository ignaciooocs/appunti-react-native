import { useContext, useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/native'
import { StyleSheet, View, Text, TextInput } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { UserContext } from '../context/provider'
import LoadingScreen from '../components/LoadingScreen'
import CustomButton from '../components/Button'
import { BASE_URL, STORAGE } from '../../keys.js'

const Login = () => {
    const navigation = useNavigation()

    const { setUser, loading, setLoading } = useContext(UserContext)

    useEffect(() => {
        (async () => {
            try {
                const usuario = await AsyncStorage.getItem(STORAGE)
                if (usuario) {
                    setUser(JSON.parse(usuario))
                }
            } catch (error) {
                console.log('ocurrio un error')
            }
        })()
    }, [])

    const [attempts, setAttempts] = useState(0);
    const MAX_ATTEMPTS = 5;

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: Yup.object(validationSchemas),
        validateOnChange: false,
        onSubmit: (formValue) => {
            login(formValue)
        }
    })

    const login = async (formValue) => {
        try {
            setLoading(true)

            setAttempts(attempts + 1);

            if (attempts >= MAX_ATTEMPTS) {
                alert(`Has superado el límite de ${MAX_ATTEMPTS} intentos de inicio de sesión. Por favor, inténtelo de nuevo más tarde.`);
                setTimeout(() => {
                    setAttempts(0)
                }, 1000 * 60 * 3)
                return;
            }

            const url = `${BASE_URL}/login`
            const res = await axios.post(url, formValue)
            const { data } = res

            await AsyncStorage.setItem(STORAGE, JSON.stringify(data))

            setUser(data)
            
        } catch (error) {
            console.log('ocurrio un error')
            alert(error.response.data.error)
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
                            <Text style={styles.text}>Iniciar sesión</Text>
                            <Text style={styles.error}>{formik.errors.username}</Text>
                            <TextInput 
                                placeholder="Nombre de usuario"
                                style={styles.input}
                                autoCapitalize='none'
                                value={formik.values.username}
                                onChangeText={(text) => formik.setFieldValue('username', text)}
                                />
                                <Text style={styles.error}>{formik.errors.password}</Text>
                            <TextInput 
                                placeholder='Contraseña'
                                style={styles.input}
                                autoCapitalize='none'
                                secureTextEntry={true}
                                value={formik.values.password}
                                onChangeText={(text) => formik.setFieldValue('password', text)}
                            />
                            <View style={styles.containerButton}>
                                <CustomButton 
                                    method={formik.handleSubmit}
                                    text='Iniciar sesión'
                                    border='rgb(39,171,103)'
                                    color='rgb(39,171,103)'
                                />
                            </View>
                        </View>
                    </View>
                        <View style={styles.toRegister}>
                            <Text style={styles.textRegister}>¿No tienes cuenta?</Text>
                            <Text style={{ ...styles.textRegister, color: 'rgb(39,171,103)' }} onPress={() => navigation.navigate('Register')} >Regístrate</Text>
                        </View>
                </View>
                )
            } 
        </>
    )
}

const initialValue = {
    username: '',
    password: ''
}

const validationSchemas = {
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    containerForm: {
        justifyContent: 'center',
        padding: 30,
    },
    form: {
        marginTop: 40,
        height: '80%',
        justifyContent: 'center',
        borderWidth: .5,
        borderRadius: 10,
        paddingHorizontal: 10,
        overflow: 'scroll'
    },
    text: {
        marginBottom:20,
        textAlign: 'center',
        fontSize: 20,
        letterSpacing: 2
    },
    input: {
        height: 50,
        margin: 12,
        borderBottomWidth: 3,
        borderBottomColor: 'rgb(39,171,103)',
        padding: 12,
        borderRadius: 10,
        marginBottom: 50
    },
    toRegister: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 50
    },
    textRegister: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 5
    },
    error: {

        color: '#f55',
        marginTop: 5,
        marginLeft: 20,
    }, 
    containerButton: {
        marginLeft: 20,
    },
})

export default Login