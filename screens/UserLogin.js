import React, {Component} from 'react';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  Input,
  Button,
  Select,
  CheckIcon,
  View,
} from 'native-base';
import {
  StyleSheet,
  Text,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
class UserLogin extends Component {
  state = {
    email: '',
    password: '',
    preferredName: '',
  };

  // async login(email, password) {
  //     try {

  //         let response = await auth().signInWithEmailAndPassword(email, password)
  //         if (response && response.user) {
  //             this.props.navigation.navigate("Dashboard")
  //             AsyncStorage.setItem("loggedin", 'true');
  //         }
  //     } catch (e) {
  //         console.error(e.message)
  //     }
  // }

  login = async (email, password) => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log('Login res', response);
          if (response.user.emailVerified) {
            this.setState({showLoading: false});
            firestore()
              .collection('Users')
              .where('uid', '==', auth().currentUser.uid)
              .get()
              .then(querySnapshot => {
                console.log('users data', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                  console.log(
                    'id',
                    documentSnapshot.id,
                    documentSnapshot.data(),
                  );
                });
              });
            this.props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Dashboard',
                },
              ],
            });
            AsyncStorage.setItem('loggedin', 'true');
            Alert.alert('Logged in Successfully!');
          } else {
            alert('Email not verified!');
          }
        });
    } catch (e) {
      this.setState({showLoading: false});
      //console.error(e.message)
      if (
        e.message ==
        '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'
      ) {
        Alert.alert('User not found !');
        console.log(e.message);
      } else if (
        e.message ==
        '[auth/wrong-password] The password is invalid or the user does not have a password.'
      ) {
        Alert.alert(
          'The password is invalid or the user does not have a password.',
        );
        console.log(e.message);
      } else if (
        e.message ==
        '[auth/invalid-email] The email address is badly formatted.'
      ) {
        Alert.alert('The email address is badly formatted.');
      } else {
        console.log(e.message);
      }
    }
  };

  render() {
    return (
      <NativeBaseProvider>
        <Box flex={1} p={2} w="90%" mx="auto">
          <Heading size="lg" mt={14} color="secondary.500">
            Welcome
          </Heading>
          <Heading color="#ffffff" mb={17} size="xs">
            Login in to continue!
          </Heading>

          <ScrollView>
            <View style={styles.text} mt={10}>
              <VStack space={2}>
                <FormControl isRequired>
                  <FormControl.Label
                    _text={{
                      color: '#ffffff',
                      fontSize: 'sm',
                      fontWeight: 900,
                    }}>
                    Email ID
                  </FormControl.Label>
                  <Input
                    value={this.state.email}
                    keyboardType="email-address"
                    mode="outlined"
                    color="#ffffff"
                    onChangeText={text => this.setState({email: text})}
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormControl.Label
                    _text={{
                      color: '#ffffff',
                      fontSize: 'sm',
                      fontWeight: 900,
                    }}>
                    Password
                  </FormControl.Label>
                  <Input
                    type="password"
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    color="#ffffff"
                    secureTextEntry={true}
                  />
                </FormControl>

                <VStack space={2}>
                  <Button
                    colorScheme="secondary"
                    _text={{color: 'white'}}
                    onPress={() => {
                      if (
                        this.state.email == ' ' ||
                        this.state.password == ' '
                      ) {
                        Alert.alert('All fields marked as * are mandatory');
                      } else {
                        this.login(this.state.email, this.state.password);
                      }
                    }}
                    mt={4}>
                    Login as a User
                  </Button>
                </VStack>
                <HStack justifyContent="center">
                  {/* <Text fontSize='sm' color='muted.700' fontWeight={400}>Already Have an Account. </Text>
                                        <Link _text={{ color: 'danger.500', bold: true, fontSize: 'sm' }} href="#">
                                            Sign Up
                                        </Link> */}
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('UserSignup')
                    }>
                    <Text style={{color: 'white'}}>
                      New User? Create Account
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </View>
          </ScrollView>
        </Box>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    padding: 25,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});

export default UserLogin;
