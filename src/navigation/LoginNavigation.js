import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Stack = createStackNavigator()

const LoginNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{
                headerTransparent: true,
                title: 'Bienvenido',
                headerTitleStyle: { color: '#333', letterSpacing: 1},
                headerTitleAlign: 'center',
        }}/>
            <Stack.Screen name='Register' component={Register} options={{
                title: 'Registrarse',
                headerTransparent: true,
                headerBackTitleVisible: false,
                headerTintColor: '#2ab',
                headerTitleStyle: { color: '#333', letterSpacing: 1 },
                headerTitleAlign: 'center'
            }} />
        </Stack.Navigator>
    )
}

export default LoginNavigation