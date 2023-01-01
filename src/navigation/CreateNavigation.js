import { createStackNavigator } from '@react-navigation/stack'
import Create from '../screens/Create'
const Stack = createStackNavigator()

const CreateNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Create' component={Create} options={{
                headerTitle: 'Crear Nota',
                headerTintColor: '#2ad',
                headerTitleStyle: { color: '#333', letterSpacing: 1, fontSize: Platform.OS === 'android' ? 15 : 16 },
                headerTitleAlign: 'center',
            }} />
        </Stack.Navigator>
    )
}

export default CreateNavigation