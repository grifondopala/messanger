import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Auth from "./Auth";
import Messages from "./Messages";
import Profile from "./Profile";
import Clock from "./Clock";
import Phone from "./Phone";
import Search from "./Search"
import {Chat} from "./Chat";

const Stack = createNativeStackNavigator()

export const Navigation = () => {
     return(
         <NavigationContainer>
             <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}>
                 <Stack.Screen name={'Auth'} component={Auth}/>
                 <Stack.Screen name={'Messages'} component={Messages}/>
                 <Stack.Screen name={'Profile'} component={Profile}/>
                 <Stack.Screen name={'Clock'} component={Clock}/>
                 <Stack.Screen name={'Phone'} component={Phone}/>
                 <Stack.Screen name={'Search'} component={Search}/>
                 <Stack.Screen name={'Chat'} component={Chat}/>
             </Stack.Navigator>
         </NavigationContainer>
     )
}