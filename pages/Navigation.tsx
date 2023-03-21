import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Auth from "./Auth";
import Main from "./Main";

const Stack = createNativeStackNavigator()

export const Navigation = () => {
     return(
         <NavigationContainer>
             <Stack.Navigator screenOptions={{headerShown: false}}>
                 <Stack.Screen name={'Auth'} component={Auth}/>
                 <Stack.Screen name={'Main'} component={Main}/>
             </Stack.Navigator>
         </NavigationContainer>
     )
}