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
    ActivityIndicator,
    CheckIcon,
    View,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ImageBackground, ScrollView, AsyncStorage, StyleSheet, Alert, Text } from 'react-native';
import { textShadow } from 'styled-system';

var ListArray = [];

export default class AdminForm extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            totalInput: 0,
            inputField: [],
            companyName: '',
            fieldLabel: '',
            isFormAvailable: false,
        };
    }

    async componentDidMount() {


        // console.log("component did mount")
        await firestore()
            .collection('AdminUsers')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    // console.log("id", documentSnapshot.data().id)
                    // console.log("companyName", documentSnapshot.data().companyName)
                    if (documentSnapshot.data().id == auth().currentUser.uid) {
                        AsyncStorage.setItem('Userid' + auth().currentUser.uid, documentSnapshot.uid)
                        console.log("component did mount", documentSnapshot.data().companyName, documentSnapshot.data().id)
                        this.setState({
                            companyName: documentSnapshot.data().companyName,
                            id: documentSnapshot.data().id

                        })
                    }

                });
            });

        firestore()
            .collection('Forms')
            .where("companyName", '==', this.state.companyName)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log("hello testing")
                    console.log("component did mount", documentSnapshot.data().id)
                    this.setState({
                        isFormAvailable: true,
                        id: documentSnapshot.data().id
                    })
                });
            });
    }

    updateFeedback = () => {
        console.log("updateFeedback")
        Alert.alert(
            "Alert!!",
            "Would you like to create New form??",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        Alert.alert(
                            "Already Form Created??",
                            "Would you like to Update your form??",
                            [
                                {
                                    text: "No",
                                    onPress: () => this.props.navigation.navigate('AdminDashboard'),
                                    style: "cancel"
                                },
                                { text: "Yes", onPress: () => this.props.navigation.navigate('UpdateAdminForm') }
                            ]
                        );
                    }
                    ,
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        this.setState({
                            isFormAvailable: false,
                        })
                    }
                }
            ]
        );
    }
    add = () => {


        console.log("inputField", this.state.inputField)
        console.log("totalInput", this.state.totalInput)
        if (ListArray.length < this.state.totalInput && ListArray.indexOf(this.state.fieldLabel.toLowerCase()) === -1) {
            // this.state.fieldLabel.toLowerCase()
            ListArray.push(this.state.fieldLabel.toLowerCase());
            console.log("ListArray.toString()", ListArray)
            Alert.alert("Label Added!!")
        } else {
            Alert.alert("Duplicate Fields are not Allowed.!!")
        }





    }
    SubmitValues = () => {
        console.log("ListArray.length", ListArray.length)
        console.log("this.state.totalInput", this.state.totalInput)
        if (ListArray.length == this.state.totalInput) {
            firestore()
                .collection('Forms').
                add({
                    totalInput: this.state.totalInput,
                    inputField: ListArray,
                    companyName: this.state.companyName,
                    id: this.state.id
                })
                .then(() => {
                    console.log('Admin Form Created!');
                    Alert.alert("Form Created!!")
                    this.props.navigation.navigate("AdminDashboard")
                });
        } else {
            Alert.alert("Number of fields must be equal to the labels entered!!")
        }
    }
    render() {

        console.log(" this.state.isFormAvailable ", this.state.isFormAvailable)
        const image = { uri: "https://image.freepik.com/free-vector/spot-light-background_1284-4685.jpg" };

        // const inputs = [];

        // for (let i = 1; i <= this.state.total; i++) {
        //     inputs.push(
        //         <Input name={`input-${i}`} onChange={this.onChange}
        //             placeholder="Enter Details"
        //         />
        //     )
        // }


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
                            Enter Here!!
                        </Heading>

                        <ScrollView>
                            {
                                this.state.isFormAvailable ?
                                    <>
                                        {this.updateFeedback()}
                                    </> :
                                    <View style={styles.text} mt={3}>
                                        <VStack space={2} >
                                            <FormControl isRequired>
                                                {/* <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 600 }} style={styles.companyName}>
                                            Admin ID
                                        </FormControl.Label>
                                        <Input style={styles.textEmail}
                                            value={this.state.id}
                                        /> */}
                                                <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 600 }} style={styles.companyName}>
                                                    Company Name
                                                </FormControl.Label>
                                                <Input style={styles.textEmail}
                                                    value={this.state.companyName}
                                                />
                                                <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 600 }}>
                                                    Enter Number of Fields
                                                </FormControl.Label>
                                                <Input
                                                    value={this.state.totalInput}
                                                    keyboardType='numeric'
                                                    // onclick={this.myFunction()}
                                                    //onChangeText={(text) => this.setState({ totalInput: e.target.value })}
                                                    onChangeText={(text) => this.setState({ totalInput: text })}
                                                    color='#ffffff'
                                                />

                                                {this.state.totalInput !== '' && this.state.totalInput > '0' ?
                                                    <View>
                                                        <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 600 }} style={styles.companyName}>
                                                            Enter Labels
                                                        </FormControl.Label>
                                                        <Input
                                                            value={this.state.fieldLabel}
                                                            style={styles.inputlabel}
                                                            //onChangeText={(text) => this.setState({ totalInput: e.target.value })}
                                                            onChangeText={(text) => this.setState({ fieldLabel: text })}
                                                            color='#ffffff'
                                                        />

                                                        <Button colorScheme="danger" _text={{ color: 'white' }}
                                                            onPress={() => { this.add() }}
                                                            style={styles.submitadd}
                                                            mt={4}
                                                        >
                                                            Add
                                                        </Button>
                                                    </View>
                                                    :
                                                    <View>

                                                    </View>
                                                }

                                            </FormControl>

                                            <VStack space={2}>

                                                <Button
                                                    colorScheme="danger" _text={{ color: 'white' }}
                                                    mt={4}
                                                    onPress={() => {
                                                        if (this.state.totalInput == '' || this.state.fieldLabel == '') {
                                                            Alert.alert("All fields marked as * are mandatory , all r not equal");
                                                        } else {
                                                            this.SubmitValues()
                                                        }
                                                    }}
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


                            }

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
        marginBottom: 20,
        color: "yellow",
        fontWeight: "bold",
    },
    submitadd: {
        marginLeft: 220,
        marginTop: -50
    },
    inputlabel: {
        marginRight: 80,
        height: 50,
    },
    companyName: {
        marginTop: 20
    }

})