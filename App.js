import React, {Component} from 'react';
import {Alert, Button, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UserSignup from './screens/UserSignup';
import UserLogin from './screens/UserLogin';

import Dashboard from './screens/Dashboard';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'grey', fontSize: 20, fontWeight: 'bold'}}>
        Welcome To DashBoard!
      </Text>

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
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="UserSignup" component={UserSignup} />
          <Stack.Screen name="UserLogin" component={UserLogin} />

          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
