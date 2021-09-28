import React, {Component} from 'react';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Select,
  CheckIcon,
  View,
  HStack,
} from 'native-base';
import {
  ImageBackground,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class UserSignup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      preferredName: '',
      number: '',
    };
  }

  async storeData(email, password, number, preferredName) {
    console.log('yoooooo', email, password, preferredName, number);
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          if (response.user.sendEmailVerification()) {
            alert('Verification link is sent on email address');
          }
          let uid = auth().currentUser.uid;
          firestore()
            .collection('Users')
            .add({
              id: uid,
              email: email,
              password: password,
              number: number,
              preferredName: preferredName,
            })
            .then(() => {
              console.log('User added!');
              this.props.navigation.navigate('UserLogin');
              AsyncStorage.setItem('loggedin', 'true');
            });
          console.log('User account created & signed in!');
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
  }

  render() {
    return (
      <NativeBaseProvider>
        <Box flex={1} p={2} w="90%" mx="auto">
          <Heading size="lg" mt={5} color="secondary.500">
            Welcome
          </Heading>
          <Heading color="#ffffff" mb={0} size="xs">
            Sign un to continue!
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
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                    color="#ffffff"
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

                    // secureTextEntry={true}
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormControl.Label
                    _text={{
                      color: '#ffffff',
                      fontSize: 'sm',
                      fontWeight: 900,
                    }}>
                    Mobile Number
                  </FormControl.Label>
                  <Input
                    onChangeText={text => this.setState({number: text})}
                    value={this.state.number}
                    keyboardType="numeric"
                    color="#ffffff"
                    maxLength={10}
                  />
                </FormControl>
                <FormControl mt={4} isRequired isInvalid>
                  <FormControl.Label
                    _text={{
                      color: '#ffffff',
                      fontSize: 'sm',
                      fontWeight: 900,
                    }}>
                    Preferred Name
                  </FormControl.Label>
                  <Select
                    minWidth={200}
                    accessibilityLabel="Select your Usability"
                    placeholder="Select Why you are Using"
                    value={this.state.preferredName}
                    color="#ffffff"
                    onValueChange={text => this.setState({preferredName: text})}
                    _selectedItem={{
                      bg: 'teal.900',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt={1}>
                    <Select.Item label="Personal" value="Personal" />
                    <Select.Item label="Office" value="Office" />
                    <Select.Item label="Business" value="Business" />
                    <Select.Item
                      label="Business/Personal"
                      value="Business/Personal"
                    />
                    <Select.Item label="Other" value="Other" />
                  </Select>
                </FormControl>
                <VStack space={2}>
                  <Button
                    colorScheme="secondary"
                    _text={{color: 'white'}}
                    onPress={() => {
                      if (
                        this.state.email == '' ||
                        this.state.password == '' ||
                        this.state.number == '' ||
                        this.state.preferredName == ''
                      ) {
                        Alert.alert('All fields marked as * are mandatory');
                      } else {
                        this.storeData(
                          this.state.email,
                          this.state.password,
                          this.state.number,
                          this.state.preferredName,
                        );
                      }
                    }}
                    mt={4}>
                    Signup as a User
                  </Button>
                </VStack>
                <HStack justifyContent="center">
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('UserLogin')}>
                    <Text style={{color: 'white'}}>
                      Already have an Account? Login
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
