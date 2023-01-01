import { useContext } from "react"
import { StyleSheet, TextInput, View, Text, Keyboard, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createNote } from "../services/getNotes"
import { UserContext } from "../context/provider"
import { useNavigation } from "@react-navigation/native"
import LoadingScreen from "../components/LoadingScreen"
import CustomButton from '../components/Button'

const Create = () => {
    const { user, checkbox, setCheckbox, loading, setLoading } = useContext(UserContext)

    const navigation = useNavigation()

    const { token } = user

    const formik = useFormik({
        initialValues: {content: ''},
        validationSchema: Yup.object(validationSchemas),
        validateOnChange: false,
        onSubmit: (formValues) => {
            const {content} = formValues
            createnote(content, formValues)
        }
    })

    const createnote = async (content, formValues) => {
      try {
          setLoading(true)
          const newNote = {
              content,
              important: checkbox
          }
          await createNote(newNote, { token })

          formValues.content = ''
          navigation.navigate('Home')
          setCheckbox(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    return (
        <>
            { loading ? <LoadingScreen/> : 
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
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
                    <CustomButton
                        method={formik.handleSubmit}
                        text='Crear'
                        border='rgb(39,171,103)'
                        color='rgb(39,171,103)'
                    />
                </View>
            </SafeAreaView>}
        </>
    )
}

const validationSchemas = {
    content: Yup.string().required('Debe escribir algo').trim()
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    container: {
        marginTop: 30,
        borderWidth: .5,
        height: '75%',
        borderRadius: 10,
        paddingHorizontal: 20,
        overflow: 'scroll'

    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 2,
        color: '#444'
    },
    input: {
        height: 180,
        borderWidth: .5,
        borderRadius: 5,
        borderBottomWidth: 3,
        borderBottomColor: 'rgb(39,171,103)',
        paddingLeft: 10,
        letterSpacing: 2,
        marginBottom: 40,
        marginTop: 10
    },
    error: {
        color: 'red',
        marginTop: 5,
        marginLeft: 20
    }, 
    containerCheck: {
        marginBottom: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
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
        marginTop: 10,
        fontSize: 20,
    },
    containerButton: {
        borderWidth: .5,
        width: '50%',
        borderRadius: 5,
        borderColor: 'rgb(39,171,103)',
    },
})

export default Create