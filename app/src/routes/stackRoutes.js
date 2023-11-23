import Login from '../screens/Login/index';
import SignUp from '../screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabContainer from '../screens/TabContainer';

const Stack = createNativeStackNavigator();

/**
 * Creating Stack routes
*/
function StackRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'  screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TabContainer" component={TabContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackRoutes;