import LoginScreen from "../screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../screens/Register";

const AuthStack = createStackNavigator();


const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={Register} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
