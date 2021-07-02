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
    Checkbox,
} from 'native-base';
import { ImageBackground, ScrollView, AsyncStorage, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class AdminLogin extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            number: '',
            checked: false,
        };
    }

    // storeData = () => {
    //     console.log("yoooooo", this.setState.email, this.setState.password)
    // }
    async storeAdminData(email, password, number, checked) {
        console.log("adminyoooooo", email, password, number, checked)
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
                        checked: checked,

                    })
                    .then(() => {
                        console.log('Admin User added!');
                        this.props.navigation.navigate("AdminDashboard")
                        AsyncStorage.setItem("loggedin", 'true');
                    });
                console.log('User account created & signed in!');

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    console.log(email, password)
                }

                console.error(error);
            });
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
                                        <FormControl.Label _text={{ color: 'danger.500', fontSize: 'sm', fontWeight: 600 }}>
                                            Email ID
                                        </FormControl.Label>
                                        <Input
                                            onChangeText={(text) => this.setState({ email: text })}
                                            value={this.state.email}
                                        />
                                    </FormControl>
                                    <FormControl mt={4} isRequired>
                                        <FormControl.Label _text={{ color: 'danger.500', fontSize: 'sm', fontWeight: 600 }}>
                                            Password
                                        </FormControl.Label>
                                        <Input type="password"
                                            onChangeText={(text) => this.setState({ password: text })}
                                            value={this.state.password}
                                        />

                                    </FormControl>
                                    <FormControl mt={4} isRequired>
                                        <FormControl.Label _text={{ color: 'danger.500', fontSize: 'sm', fontWeight: 600 }}>
                                            Mobile Number
                                        </FormControl.Label>
                                        <Input
                                            onChangeText={(text) => this.setState({ number: text })}
                                            value={this.state.number}
                                        />
                                    </FormControl>
                                    {/* <FormControl mt={4} isRequired isInvalid>
                                        <FormControl.Label _text={{ color: 'danger.500', fontSize: 'sm', fontWeight: 600 }}>Company Name</FormControl.Label>
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

                                    </FormControl> */}

                                    <FormControl mt={4} isRequired>
                                        <HStack space={6}>
                                            <Checkbox accessibilityLabel="This is a dummy checkbox"
                                                onChangeText={(text) => this.setState({ checked: text })}
                                                value={this.state.checked}
                                            >
                                                *Accept Terms and Conditions
                                            </Checkbox>
                                            {/* <Checkbox
                                            value="test"
                                            accessibilityLabel="This is a dummy checkbox"
                                            defaultIsChecked
                                        /> */}
                                        </HStack>
                                    </FormControl>



                                    <VStack space={2}>
                                        <Button colorScheme="danger" _text={{ color: 'white' }}
                                            onPress={() => this.storeAdminData(this.state.email, this.state.password, this.state.number, this.state.checked)}

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
    }
})