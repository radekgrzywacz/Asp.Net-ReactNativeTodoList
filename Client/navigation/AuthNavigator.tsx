import LoginScreen from "../screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";

const AuthStack = createStackNavigator();


const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
