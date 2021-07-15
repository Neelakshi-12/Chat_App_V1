import React, { Component } from 'react';
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
import { StyleSheet, Text, Image, ImageBackground, ScrollView, Dimensions, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
class UserLogin extends Component {

    state = {
        email: '',
        password: '',
        companyName: '',
    }

    async login(email, password) {
        try {
            let response = await auth().signInWithEmailAndPassword(email, password)
            if (response && response.user) {
                this.props.navigation.navigate("Dashboard")
                AsyncStorage.setItem("loggedin", 'true');
            }
        } catch (e) {
            console.error(e.message)
        }
    }
    // async componentDidMount() {
    //     firestore()
    //         .collection('Users')
    //         .get()
    //         .then(querySnapshot => {
    //             querySnapshot.forEach(documentSnapshot => {
    //                 console.log("companyNameeeeeeeeeeeeeeeeeee in  login", documentSnapshot.data().companyName)
    //                 console.log("auth().currentUser.uid", auth().currentUser.uid)
    //                 if (documentSnapshot.data().id == auth().currentUser.uid) {
    //                     AsyncStorage.setItem('Userid' + auth().currentUser.uid, documentSnapshot.uid)
    //                     console.log("component did mount", documentSnapshot.data().companyName)
    //                     this.setState({
    //                         companyName: documentSnapshot.data().companyName,

    //                     })
    //                 }

    //             });
    //         });
    // }

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
                            Welcome
                        </Heading>
                        <Heading color="#ffffff" mb={17} size="xs">
                            Login in to continue!
                        </Heading>


                        <ScrollView>
                            <View style={styles.text} mt={10}>
                                <VStack space={2} >
                                    <FormControl isRequired>
                                        <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 900 }}>
                                            Email ID
                                        </FormControl.Label>
                                        <Input
                                            value={this.state.email}
                                            keyboardType='email-address'
                                            mode="outlined"
                                            color='#ffffff'
                                            onChangeText={text => this.setState({ email: text })} />


                                    </FormControl>
                                    <FormControl mt={4} isRequired>
                                        <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 900 }}>
                                            Password
                                        </FormControl.Label>
                                        <Input type="password"
                                            onChangeText={(text) => this.setState({ password: text })}
                                            value={this.state.password}
                                            color='#ffffff'
                                            secureTextEntry={true}
                                        />

                                    </FormControl>

                                    <VStack space={2}>
                                        <Button colorScheme="danger" _text={{ color: 'white' }}

                                            onPress={() => {
                                                if (this.state.email == ' ' || this.state.password == ' ') {
                                                    Toast.show("All fields marked as * are mandatory");

                                                } else {
                                                    this.login(this.state.email, this.state.password)
                                                }
                                            }}
                                            mt={4}
                                        >
                                            Login as a User
                                        </Button>
                                    </VStack>
                                    <HStack justifyContent="center">
                                        {/* <Text fontSize='sm' color='muted.700' fontWeight={400}>Already Have an Account. </Text>
                                        <Link _text={{ color: 'danger.500', bold: true, fontSize: 'sm' }} href="#">
                                            Sign Up
                                        </Link> */}
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate("UserSignup")}>
                                            <Text style={{ color: 'white' }}>New User? Create Account</Text>
                                        </TouchableOpacity>
                                    </HStack>
                                </VStack>
                            </View>
                        </ScrollView>
                    </Box>
                </ImageBackground>

            </NativeBaseProvider>
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
    }

})

export default UserLogin;