import { StyleSheet, TouchableNativeFeedback, View, Text} from 'react-native'

const CustomButton = (props) => {

    const { action, text, method, cancel, border, color } = props
    
    return (
        <TouchableNativeFeedback onPress={() => {
            {method && method()}
            {action && action(true)}
            {cancel && cancel(false)}
        }} >
            <View style={{...styles.containerAccountAndroid, borderColor: `${border}`}}>
                <Text style={{ color: `${color}` }}>{text}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}
const styles = StyleSheet.create({
    containerAccountAndroid: { 
        borderWidth: .5, 
        width: '45%', 
        height: 35, 
        borderRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 5 
    }
})

export default CustomButton