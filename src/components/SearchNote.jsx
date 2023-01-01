import { useContext } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { UserContext } from "../context/provider"

const SearchNote = () => {

    const { search, setSearch } = useContext(UserContext)

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Buscar nota"
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: .5,
        borderBottomWidth: 3,
        borderBottomColor: 'rgb(39,171,103)',
        borderRadius: 5,
        height: 50,
        paddingLeft: 10
    }
})

export default SearchNote