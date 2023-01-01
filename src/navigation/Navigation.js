import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { UserContext } from '../context/provider'
import HomeNavigation from './HomeNavigation'
import ProfileNavigation from '../navigation/ProfileNavigation'
import LoginNavigation from './LoginNavigation'
import { Image } from 'react-native'
import CreateNavigation from './CreateNavigation'

const Tab = createBottomTabNavigator()

const Navigation = () => {

    const { user } = useContext(UserContext)

    return (
        <>
            <Tab.Navigator initialRouteName='Home' tabBarOptions={{ activeTintColor: '#27ab67' }}>
                {
                user ? (
                    <>
                        <Tab.Screen name='Home' component={HomeNavigation} options={{
                            headerTransparent: true,
                            title: '',
                            tabBarLabel: 'Inicio',
                            tabBarIcon: ({color, size}) => (
                                <Icon name='home' color={color} size={size} />)
                        }} />
                        <Tab.Screen name='Create' component={CreateNavigation} options={{
                                tabBarLabel: '',
                                tabBarIcon: () => (renderCreate())
                            }} />
                        <Tab.Screen name='Profile' component={ProfileNavigation} options={{
                            tabBarLabel: 'Perfil',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name='user' color={color} size={size} />)
                        }} />
                    </> 
                    ) : (
                    <>
                        <Tab.Screen name='Login' component={LoginNavigation} options={{
                            tabBarVisible: false
                        }} />
                    </>
                    )   
                }
            </Tab.Navigator> 
        </>
    )
}

const renderCreate = () => {
    return (
        <Image
            style={{
                width: 40,
                height: 40,
                top: 7
            }}
            source={require('../assets/img.png')}
            />
    )
}

export default Navigation