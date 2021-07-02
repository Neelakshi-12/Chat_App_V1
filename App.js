import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminLogin from './screens/AdminLogin';
import UserLogin from './screens/UserLogin';
import Dashboard from './screens/Dashboard';
import AdminDashboard from './screens/AdminDashboard';
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
      <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>Welcome To DashBoard!🎉</Text>
      <View style={{ margin: 10 }}>
        <Button
          color="#000000"
          title="Login as Admin"
          onPress={() => navigation.navigate('AdminLogin')}
        />
      </View>
      <View>
        <Button
          color="#000000"
          title="Login as User"
          onPress={() => navigation.navigate('UserLogin')}
        />
      </View>
    </View>

  );
}



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
