import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Note from '../screens/Note'

const Stack = createStackNavigator()

const HomeNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{
                headerTitle: 'Appunti',
                headerTintColor: '#2ad',
                headerTitleStyle: { color: '#333', letterSpacing: 1, fontSize: Platform.OS === 'android' ? 15 : 16 },
                headerTitleAlign: 'center',
            }}/>
            <Stack.Screen name='Note' component={Note} options={{
                headerTitle: 'Detalles',
                headerBackTitle: 'volver',
                headerTintColor: '#2ad',
                headerTitleStyle: {color: '#333', letterSpacing: 1}
            }} />
        </Stack.Navigator>
    )
}

export default HomeNavigation