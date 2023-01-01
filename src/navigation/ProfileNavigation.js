import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'
import Profile from '../screens/Profile'
const Stack = createStackNavigator()

const ProfileNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={Profile} options={{
                headerTitle: 'Perfil',
                headerTintColor: '#2ad',
                headerTitleStyle: { color: '#333', letterSpacing: 1, fontSize: Platform.OS === 'android' ? 15 : 16 },
                headerTitleAlign: 'center',
            }} />
        </Stack.Navigator>
    )
}

export default ProfileNavigation