import { useNavigation } from "@react-navigation/native"
import { StyleSheet, TouchableNativeFeedback, View, Text, Platform } from "react-native"

const NoteCard = ({nota}) => {
    const navigation = useNavigation()

    const goNote = () => {
        navigation.navigate('Note', {id: nota.id})
    }

    return (
        <TouchableNativeFeedback onPress={goNote}>
            <View style={styles.card}>
                <View style={styles.spacing}>
                    <View style={styles.bgStyles}>
                        <Text style={styles.date}>{nota.createdAt.split('T')[0]}</Text>
                        <Text style={styles.text}>{nota.content}</Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: Platform.OS === 'android' ? 110 : 100,
        margin: 5
    },
    spacing: {
        flex: 1,
        padding: 5,
    },
    bgStyles: {
        flex: 1,
        borderRadius: 5,
        padding: 5,
        paddingTop: 0,
        paddingBottom: 10,
        borderWidth:.5,
        borderColor: '#333',
        borderLeftWidth: Platform.OS === 'android' ? 1 : 5,
        borderLeftColor: 'rgb(39,171,103)' ,
        borderBottomWidth: Platform.OS === 'android' ? 5 : .5,
        borderBottomColor: 'rgb(39,171,103)'
    },
    text: {
        fontSize: Platform.OS === 'android' ?  14 : 16,
        color: '#333',
        marginBottom: 5
    },
    date: {
        textAlign: 'right',
        paddingRight: 5,
        paddingTop: 1,
        fontSize: Platform.OS === 'android' ? 12 : 14,
    }
})

export default NoteCard