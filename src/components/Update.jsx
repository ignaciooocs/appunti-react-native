import { useContext } from "react"
import { StyleSheet, TextInput, View, Text, Keyboard, Modal, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateNote } from "../services/getNotes"
import { UserContext } from "../context/provider"
import { useNavigation } from "@react-navigation/native"
import CustomButton from "./Button"

const Update = ({nota}) => {
    const { user, checkbox, setCheckbox, updateVisible, setUpdateVisible, setLoading } = useContext(UserContext)

    const navigation = useNavigation()

    const { token } = user

    const formik = useFormik({
        initialValues: { content: '' },
        validationSchema: Yup.object(validationSchemas),
        validateOnChange: false,
        onSubmit: (formValues) => {
            const { content } = formValues
            const newNote = {
                content,
                important: checkbox
            }
            setLoading(true)
            updateNote(nota.id, newNote, { token })
            setTimeout(() => {
                setLoading(false)
            }, 1500)

            formValues.content = ''
            navigation.navigate('Home')
            setCheckbox(false)
            setUpdateVisible(false)
        }
    })

    return (
        <Modal animationType="fade" transparent={false} visible={updateVisible}>
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.title}>Actualizar nota</Text>
                <Text style={styles.error}>{formik.errors.content}</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    keyboardType={"ascii-capable"}
                    onSubmitEditing={Keyboard.dismiss}
                    returnKeyType='done'
                    placeholder="Escribe tu nueva nota"
                    value={formik.values.content}
                    onChangeText={(text) => formik.setFieldValue('content', text)}
                />
                <View style={styles.containerCheck}>
                    <Text style={styles.checkText}>Marcar como prioridad</Text>
                    <Switch
                        value={checkbox}
                        onValueChange={(value) => setCheckbox(value)}
                    />
                </View>
                <View style={styles.containerButton}>
                     <CustomButton
                        method={formik.handleSubmit}
                        text='Actualizar'
                        border='rgb(39,171,103)'
                        color='rgb(39,171,103)'
                    />
                    <CustomButton
                        cancel={setUpdateVisible}
                        text='Cancelar'
                        border='#f33'
                        color='#f33'
                    />
                </View>
            </View>
            <Text style={{...styles.checkText, textAlign: 'center'}}>AVISO: La nota anterior se eliminará</Text>
        </SafeAreaView>
        </Modal>
    )
}

const validationSchemas = {
    content: Yup.string().required('Debe escribir algo').trim()
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    container: {
        borderWidth: .5,
        height: '60%',
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        overflow: 'hidden'

    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 2,
        color: '#333'
    },
    input: {
        height: 180,
        borderWidth: .5,
        borderRadius: 5,
        borderBottomWidth: 3,
        borderBottomColor: 'rgb(39,171,103)',
        paddingLeft: 10,
        letterSpacing: 2,
        marginBottom: 30,
    },
    error: {
        color: '#f33',
        margin: 5,
        letterSpacing: 1
    },
    containerCheck: {
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkText: {
        letterSpacing: 1,
        fontWeight: '600',
        color: '#555'
    },
    check: {
        height: 25,
        width: 25,
        borderWidth: .5,
        marginTop: 10
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default Update