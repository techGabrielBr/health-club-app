import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WaterRegistryList } from "../WaterRegistryList";
import { WaterRegistryCreate } from "../WaterRegistryCreate";

const Stack = createNativeStackNavigator();

/**
 * Water Registry Routes Container
 *
 * @export
 * @return {*} 
 */
export function WaterRegistry(){
    return <>
        <Stack.Navigator initialRouteName='WaterRegistryList'  screenOptions={{headerShown: false}}>
            <Stack.Screen name="WaterRegistryList" component={WaterRegistryList} />
            <Stack.Screen name="WaterRegistryCreate" component={WaterRegistryCreate} />
        </Stack.Navigator>
    </>
}