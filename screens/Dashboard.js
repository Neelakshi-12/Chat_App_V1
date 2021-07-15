import React, { Component } from 'react';
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
import { ImageBackground, ScrollView, AsyncStorage, StyleSheet, Alert, Text, TextInput } from 'react-native';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            companyName: '',
            inputField: [],

        }
    }

    async componentDidMount() {
        await firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    // console.log("id", documentSnapshot.data().id)
                    // console.log("email", documentSnapshot.data().email)
                    // console.log("companyName", documentSnapshot.data().companyName)
                    // console.log("number", documentSnapshot.data().number)
                    // console.log("auth().currentUser.uid", auth().currentUser.uid)
                    if (documentSnapshot.data().id == auth().currentUser.uid) {
                        AsyncStorage.setItem('Userid' + auth().currentUser.uid, documentSnapshot.uid)
                        //  console.log("component did mount", documentSnapshot.data().companyName)
                        this.setState({
                            companyName: documentSnapshot.data().companyName,

                        })
                        console.log("this.state.companyName", this.state.companyName)
                    }

                });
            });
        firestore()
            .collection('Forms')
            .where('companyName', '==', this.state.companyName)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    // console.log("TotalInputs", documentSnapshot.data().totalInput)
                    // console.log("admin input fields", documentSnapshot.data().inputField)
                    // console.log("admincompanyName", documentSnapshot.data().companyName)
                    // console.log("documentSnapshot.data().id", documentSnapshot.data().id)
                    // console.log("component did mount", documentSnapshot.data().totalInput, documentSnapshot.data().inputField)
                    this.setState({
                        inputField: documentSnapshot.data().inputField,

                    })
                });
            });
        firestore()
            .collection('Feedback')
            .where("id", '==', auth().currentUser.uid)
            .where('feedbackData.companyName', '==', this.state.companyName)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log("documentSnapshot.data().id", documentSnapshot.data().id)
                    this.setState({
                        id: documentSnapshot.data().id,
                    })
                });
            });

    }



    // logout = async () => {
    //     console.log("hhgj")               //log out
    //     this.props.navigation.reset({
    //         index: 0,
    //         routes: [
    //             {
    //                 name: 'UserLogin',
    //             },
    //         ],
    //     })
    //     auth().signOut()
    //     AsyncStorage.setItem("loggedin", "false")
    // }

    SubmitFeedback = () => {
        if (auth().currentUser.uid == this.state.id) {
            Alert.alert("Hello")
        } else {
            // Alert.alert("SubmitFeedback")
            console.log("this.state", this.state)
            console.log("this.state.inputField", this.state.inputField)
            console.log("individual items")
            try {
                let uid = auth().currentUser.uid
                firestore()
                    .collection('Feedback')
                    .add({
                        id: uid,
                        feedbackData: this.state

                    })
                    .then(() => {
                        console.log('Form Sent!');
                    });

                Alert.alert("Feedback form submitted!")
                this.props.navigation.navigate("UserLogin")
                console.log('Feedback form submitted!');

            }
            catch (e) {
                this.setState({ showLoading: false })
                console.error(e.message)
            }
        }
    }

    handleChange = (item, name) => {
        console.log("item", item)
        console.log("name", name)
        this.setState({
            [item]: name
        })
    }

    list = () => {

        //console.log("inputFieldsssss", this.state.inputField)

        return this.state.inputField.map((item, index) => {
            // console.log("item.index", this.state)
            return (
                <ScrollView>
                    <View mt={3} key={index}>
                        <VStack space={2} >
                            <FormControl isRequired>
                                <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 600 }} style={styles.labelFields}>
                                    {item}
                                </FormControl.Label>
                                <Input style={styles.textEmail}
                                    value={this.state[item]}
                                    onChangeText={(name) => { this.handleChange(item, name) }}
                                />
                            </FormControl>
                        </VStack>
                    </View>
                </ScrollView>
            );
        });
    };


    render() {
        const image = { uri: "https://image.freepik.com/free-vector/spot-light-background_1284-4685.jpg" };



        return (
            <NativeBaseProvider>
                <ImageBackground source={image} style={styles.image}>
                    <Box
                        flex={1}
                        p={2}
                        w="90%"
                        mx='auto'
                    >
                        <Heading size="lg" mt={14} color='danger.500'>
                            Welcome!!
                        </Heading>

                        <ScrollView>
                            <View style={styles.text} mt={3}>
                                <VStack space={2} >
                                    <FormControl isRequired>
                                        <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 600 }} style={styles.companyName}>
                                            Company Name
                                        </FormControl.Label>
                                        <Input style={styles.textEmail}
                                            value={this.state.companyName}
                                        />
                                        {/* fieldLabel.map((item)=> {
                                            <View>
                                                <Text>
                                                    {item}
                                                </Text>
                                                <TextInput />
                                            </View>
                                        }) */}
                                        {/* <Input style={styles.textEmail}
                                            value={this.state.inputField}
                                        /> */}
                                        <View>{this.list()}</View>;
                                    </FormControl>

                                    <VStack space={2}>

                                        <Button
                                            colorScheme="danger" _text={{ color: 'white' }}

                                            onPress={() => { this.SubmitFeedback() }}
                                        >
                                            Submit
                                        </Button>

                                        {/* <View>
                                            {this.state.show &&
                                                <Text>{JSON.stringify(this.state, null, 4)}</Text>
                                            }
                                        </View> */}
                                    </VStack>

                                </VStack>

                            </View>
                        </ScrollView>
                    </Box>
                </ImageBackground>

            </NativeBaseProvider >
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    text: {
        color: "white",
        padding: 25,
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },
    textEmail: {
        fontSize: 15,
        marginBottom: 5,
        color: "yellow",
        fontWeight: "bold",
    },
    submitadd: {
        marginLeft: 220,
    },
    inputlabel: {
        marginRight: 80,
        height: 50,
    },
    companyName: {
        marginTop: 20
    },
    labelFields: {
        marginTop: -8
    }

})