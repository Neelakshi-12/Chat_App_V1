import React, { Component } from 'react';
import { Alert, Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminSignup from './screens/AdminSignup';
import UserSignup from './screens/UserSignup';
import UserLogin from './screens/UserLogin';
import AdminLogin from './screens/AdminLogin';


import Dashboard from './screens/Dashboard';
import AdminDashboard from './screens/AdminDashboard';
import AdminForm from './screens/AdminForm';
import UpdateAdminForm from './screens/UpdateAdminForm'

import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

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

class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="AdminSignup"
            component={AdminSignup}
          />
          <Stack.Screen name="UserSignup" component={UserSignup} />
          <Stack.Screen name="UserLogin" component={UserLogin} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} />

          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AdminForm" component={AdminForm} />
          <Stack.Screen name="UpdateAdminForm" component={UpdateAdminForm} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: 10 }}>
                    <Button
                      onPress={() => {
                        navigation.navigate('AdminForm')
                      }}
                      title="Create"
                      color="#f54260"
                    />

                  </View>
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;