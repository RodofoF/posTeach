import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from './navigation/LoginScreen';
import HomeScreen from './navigation/HomeScreen';
import MainAppNavigator from './navigation/MainAppNavigator';
import PostsReadScreen from './navigation/PostsReadScreen';
import PostsCreateScreen from './navigation/PostsCreateScreen'; 
import PostsEditScreen from './navigation/PostsEditScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="MainApp" component={MainAppNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="PostsReadScreen" component={PostsReadScreen} options={{ title: 'Post' }}/>
        <Stack.Screen name="PostsCreateScreen" component={PostsCreateScreen} options={{ title: 'Criar Post' }}/>
        <Stack.Screen name="PostsEditScreen" component={PostsEditScreen} options={{ title: 'Editar Post' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


