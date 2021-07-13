import React, { Component } from 'react';
import { NativeBaseProvider, Box, Heading, VStack, HStack, FormControl, Input, Button, Select, CheckIcon } from 'native-base';
import { ImageBackground, ScrollView, AsyncStorage, StyleSheet, View, Alert, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';

export default class AdminLogin extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            number: '',
            companyName: '',
            check: false,
        };
    }

    // storeData = () => {
    //     console.log("yoooooo", this.setState.email, this.setState.password)
    // }
    async storeAdminData(email, password, number, companyName, check) {
        console.log("adminyoooooo", email, password, number, companyName, check)
        try {
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    let uid = auth().currentUser.uid
                    firestore()
                        .collection('AdminUsers').
                        add({
                            id: uid,
                            email: email,
                            password: password,
                            number: number,
                            check: check,
                            companyName: companyName,

                        })
                        .then((res) => {

                            console.log('Admin User added!', res);
                            this.props.navigation.navigate("AdminDashboard", { companyName: this.state.companyName })
                            AsyncStorage.setItem("loggedin", 'true');
                        });
                    console.log('User account created & signed in!');

                })
        }
        catch (e) {
            this.setState({ showLoading: false })
            //console.error(e.message)
            if (e.message == '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.') {
                Alert.alert('User not found !')
                console.log(e.message)
            } else if (e.message == '[auth/wrong-password] The password is invalid or the user does not have a password.') {
                Alert.alert('The password is invalid or the user does not have a password.')
                console.log(e.message)
            } else if (e.message == '[auth/invalid-email] The email address is badly formatted.') {
                Alert.alert('The email address is badly formatted.')
            }
            else {
                console.log(e.message)
            }
        }
    }

    checkBoxTest = () => {

        this.setState({
            check: !this.state.check
        });
        Alert.alert("now value is" + !this.state.check)
    }



    render() {
        const image = { uri: "https://i.pinimg.com/564x/a8/b4/42/a8b442181f7c004f98d4eef842a76e76.jpg" };
        return (
            <NativeBaseProvider>
                <ImageBackground source={image} style={styles.image}>

                    <Box
                        flex={1}
                        p={2}
                        w="90%"
                        mx='auto'
                    >
                        <Heading size="lg" color='danger.600' mt={30} mb={10} fontSize='4xl' textAlign='center'>
                            Welcome Admin!!
                        </Heading>


                        <ScrollView>
                            <View style={styles.text}>
                                <VStack space={2}>
                                    <FormControl isRequired>
                                        <FormControl.Label _text={{ color: '#000000', fontSize: 'sm', fontWeight: 600 }}>
                                            Email ID
                                        </FormControl.Label>
                                        <Input
                                            onChangeText={(text) => this.setState({ email: text })}
                                            value={this.state.email}
                                        />
                                    </FormControl>
                                    <FormControl mt={4} isRequired>
                                        <FormControl.Label _text={{ color: '#000000', fontSize: 'sm', fontWeight: 600 }}>
                                            Password
                                        </FormControl.Label>
                                        <Input type="password"
                                            onChangeText={(text) => this.setState({ password: text })}
                                            value={this.state.password}

                                        />

                                    </FormControl>
                                    <FormControl mt={4} isRequired>
                                        <FormControl.Label _text={{ color: '#000000', fontSize: 'sm', fontWeight: 600 }}>
                                            Mobile Number
                                        </FormControl.Label>
                                        <Input
                                            onChangeText={(text) => this.setState({ number: text })}
                                            value={this.state.number}
                                            keyboardType="numeric"
                                            maxLength={10}
                                        />
                                    </FormControl>
                                    <FormControl mt={4} isRequired isInvalid>
                                        <FormControl.Label _text={{ color: '#000000', fontSize: 'sm', fontWeight: 600 }}>Company Name</FormControl.Label>
                                        <Select
                                            minWidth={200}
                                            accessibilityLabel="Select your Company"
                                            placeholder="Select your Company"
                                            value={this.state.companyName}
                                            onValueChange={(text) => this.setState({ companyName: text })}
                                            _selectedItem={{
                                                bg: "teal.600",
                                                endIcon: <CheckIcon size={5} />,
                                            }}
                                            mt={1}
                                        >
                                            <Select.Item label="Astrea1" value="Astrea1" />
                                            <Select.Item label="Astrea2" value="Astrea2" />
                                            <Select.Item label="Astrea3" value="Astrea3" />
                                            <Select.Item label="Astrea4" value="Astrea4" />
                                            <Select.Item label="Astrea5" value="Astrea5" />
                                        </Select>

                                    </FormControl>

                                    {/* <FormControl mt={4} isRequired>
                                        <HStack space={6}>
                                            <Checkbox accessibilityLabel="This is a dummy checkbox"
                                                onValueChange={(value) => this.setState({ checked: value })}
                                                value={this.state.checked}
                                            >
                                                *Accept Terms and Conditions
                                            </Checkbox>
                                          
                                        </HStack>
                                    </FormControl> */}


                                    <View style={styles.checked}>
                                        <CheckBox value={this.state.check} onValueChange={() => { this.checkBoxTest() }} />
                                        <Text style={styles.terms}> * Accept all Terms and Conditions</Text>
                                    </View>




                                    <VStack space={2}>
                                        <Button colorScheme="danger" _text={{ color: 'white' }}
                                            onPress={() => {
                                                if (this.state.email == '' || this.state.password == '' || this.state.number == '' || this.state.companyName == '' || this.state.check == '') {
                                                    Alert.alert("All fields marked as * are mandatory");
                                                } else {
                                                    this.storeAdminData(this.state.email, this.state.password, this.state.number, this.state.companyName, this.state.check)
                                                }
                                            }}

                                            mt={4}
                                        >
                                            Login as a Admin
                                        </Button>
                                    </VStack>
                                    {/* <HStack justifyContent="center">
                                    <Text fontSize='sm' color='muted.700' fontWeight={400}>I'm a new user. </Text>
                                    <Link _text={{ color: 'danger.500', bold: true, fontSize: 'sm' }} href="#">
                                        Sign Up
                                    </Link>
                                </HStack> */}
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
        backgroundColor: "#ffffffa0"
    },
    terms: {
        marginLeft: 30,
        marginTop: -25,
        fontWeight: "bold"
    }
})