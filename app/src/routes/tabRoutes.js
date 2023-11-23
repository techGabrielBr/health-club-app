import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { WaterRegistry } from "../screens/WaterRegistry";
import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';
import { User } from '../screens/User';
import { WorkoutRegistry } from '../screens/WorkoutRegistry';

const Tab = createMaterialBottomTabNavigator();

/**
 * Creating Tab routes
*/
function TabRoutes(){
    return <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'darkturquoise'}} activeColor="black" inactiveColor='white' tabBarBadge="string">
        <Tab.Screen name="Água" component={WaterRegistry} 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cup" color={color} size={26}/>
                )}
            }
        />
        <Tab.Screen name="Exercício" component={WorkoutRegistry} 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="dumbbell" color={color} size={26}/>
                )}
            }
        />
        <Tab.Screen name="Usuário" component={User} 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="face-man" color={color} size={26}/>
                )}
            }
        />
    </Tab.Navigator>
}

export default TabRoutes;