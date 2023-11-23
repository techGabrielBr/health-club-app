import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkoutRegistryCreate } from "../WorkoutRegistryCreate";
import { WorkoutRegistryList } from "../WorkoutRegistryList";

const Stack = createNativeStackNavigator();

/**
 * WorkoutRegistry Route Container
 *
 * @export
 * @return {*} 
 */
export function WorkoutRegistry(){
    return <>
        <Stack.Navigator initialRouteName='WorkoutRegistryList'  screenOptions={{headerShown: false}}>
            <Stack.Screen name="WorkoutRegistryList" component={WorkoutRegistryList} />
            <Stack.Screen name="WorkoutRegistryCreate" component={WorkoutRegistryCreate} />
        </Stack.Navigator>
    </>
}