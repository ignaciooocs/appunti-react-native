import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import Provider from './src/context/provider';

export default function App() {

  return (
    <NavigationContainer>
      <Provider>
        <Navigation/>
      </Provider>
    </NavigationContainer>
  );
}