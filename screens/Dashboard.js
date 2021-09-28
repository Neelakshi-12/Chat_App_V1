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
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  ImageBackground,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Alert,
  Text,
  TextInput,
} from 'react-native';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      preferredName: '',
      inputField: [],
      isconfirmation: false,
    };
  }

  async componentDidMount() {
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          // console.log("id", documentSnapshot.data().id)
          // console.log("email", documentSnapshot.data().email)
          // console.log("preferredName", documentSnapshot.data().preferredName)
          // console.log("number", documentSnapshot.data().number)
          // console.log("auth().currentUser.uid", auth().currentUser.uid)
          if (documentSnapshot.data().id == auth().currentUser.uid) {
            AsyncStorage.setItem(
              'Userid' + auth().currentUser.uid,
              documentSnapshot.uid,
            );
            //  console.log("component did mount", documentSnapshot.data().preferredName)
            this.setState({
              preferredName: documentSnapshot.data().preferredName,
            });
            console.log('this.state.preferredName', this.state.preferredName);
          }
        });
      });
    firestore()
      .collection('Forms')
      .where('preferredName', '==', this.state.preferredName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          // console.log("TotalInputs", documentSnapshot.data().totalInput)
          // console.log("admin input fields", documentSnapshot.data().inputField)
          console.log('isFormUpdated', documentSnapshot.data().isFormUpdated);

          // console.log("documentSnapshot.data().id", documentSnapshot.data().id)
          // console.log("component did mount", documentSnapshot.data().totalInput, documentSnapshot.data().inputField)
          this.setState({
            inputField: documentSnapshot.data().inputField,
            isFormUpdated: documentSnapshot.data().isFormUpdated,
          });
        });
      });
    firestore()
      .collection('Feedback')
      .where('id', '==', auth().currentUser.uid)
      .where('feedbackData.preferredName', '==', this.state.preferredName)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log('testing again n again');
          console.log('id', documentSnapshot.id);
          console.log('documentSnapshot.data().id', documentSnapshot.data().id);
          this.setState({
            id: documentSnapshot.data().id,
            uid: documentSnapshot.id,
          });
          console.log('after setting state', this.state.uid);
        });
      });
  }

  SubmitFeedback = () => {
    console.log(
      'this.state.id this.state.id',
      this.state.id,
      this.state.isFormUpdated,
    );
    if (auth().currentUser.uid == this.state.id) {
      Alert.alert('The Feedback has already been Submitted.');
    } else {
      Alert.alert('SubmitFeedback');
      console.log('this.state', this.state);
      console.log('this.state.inputField', this.state.inputField);
      console.log('individual items');
      try {
        let uid = auth().currentUser.uid;
        firestore()
          .collection('Feedback')
          .add({
            id: uid,
            feedbackData: this.state,
          })
          .then(() => {
            console.log('Form Sent!');
          });

        Alert.alert('Feedback form submitted!');
        // this.props.navigation.navigate("UserLogin")
        console.log('Feedback form submitted!');
      } catch (e) {
        this.setState({showLoading: false});
        console.error(e.message);
      }
    }
  };
  UpdatedSubmitFeedback = () => {
    if (
      this.state.id == auth().currentUser.uid &&
      this.state.isconfirmation == true &&
      this.state.isFormUpdated == true
    ) {
      Alert.alert('You already Submitted Feedback');
    } else {
      console.log('idddddddddddddddddd', this.state.id);
      console.log('isFormUpdated status', this.state.isFormUpdated);
      console.log('this.state.id', this.state.uid);
      const updateDBRef = firestore()
        .collection('Feedback')
        .doc(this.state.uid);
      updateDBRef
        .set({
          id: this.state.id,
          feedbackData: this.state,
          isconfirmation: true,
        })
        .then(docRef => {
          this.setState({
            id: this.state.id,
            feedbackData: this.state,
            isconfirmation: true,
          });
          Alert.alert('Updated Feedback Form has been Submitted!');
        })
        .catch(error => {
          console.error('Error: ', error);
        });
    }
  };

  handleChange = (item, name) => {
    console.log('item', item);
    console.log('name', name);
    this.setState({
      [item]: name,
    });
  };

  list = () => {
    //console.log("inputFieldsssss", this.state.inputField)

    return this.state.inputField.map((item, index) => {
      // console.log("item.index", this.state)
      return (
        <ScrollView>
          <View mt={3} key={index}>
            <VStack space={2}>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{color: '#ffffff', fontSize: 'sm', fontWeight: 600}}
                  style={styles.labelFields}>
                  {item}
                </FormControl.Label>
                <Input
                  style={styles.textEmail}
                  value={this.state[item]}
                  onChangeText={name => {
                    this.handleChange(item, name);
                  }}
                />
              </FormControl>
            </VStack>
          </View>
        </ScrollView>
      );
    });
  };

  render() {
    return (
      <NativeBaseProvider>
        <Box flex={1} p={2} w="90%" mx="auto">
          <Heading size="lg" mt={14} color="danger.500">
            Welcome!!
          </Heading>
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
  textEmail: {
    fontSize: 15,
    marginBottom: 5,
    color: 'yellow',
    fontWeight: 'bold',
  },
  submitadd: {
    marginLeft: 220,
  },
  inputlabel: {
    marginRight: 80,
    height: 50,
  },
  preferredName: {
    marginTop: 20,
  },
  labelFields: {
    marginTop: -8,
  },
});
