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
    Row,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ImageBackground, ScrollView, AsyncStorage, StyleSheet, Alert, Text } from 'react-native';
import { fontSize, textShadow } from 'styled-system';

var ListArray = [];

export default class UpdateAdminForm extends Component {

    constructor() {
        super();
        this.state = {
            uid: '',
            id: '',
            totalInput: 0,
            inputField: [],
            companyName: '',
            fieldLabel: '',
            allArr: [],
        };
    }

    async componentDidMount() {
        await firestore()
            .collection('AdminUsers')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().id == auth().currentUser.uid) {
                        AsyncStorage.setItem('Userid' + auth().currentUser.uid, documentSnapshot.uid)
                        console.log("component did mount", documentSnapshot.data().companyName, documentSnapshot.data().id)
                        this.setState({
                            companyName: documentSnapshot.data().companyName,
                        })
                    }

                });
            });
        // console.log("company nameeee", this.state.companyName)
        firestore()
            .collection('Forms')
            .where('companyName', "==", this.state.companyName)
            .onSnapshot((querySnapshot) => {
                var allData = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log("id", documentSnapshot.id)
                    console.log("inputField", documentSnapshot.data().inputField)
                    console.log("companyName", documentSnapshot.data().companyName)
                    console.log("total input", documentSnapshot.data().totalInput)

                    allData.push({
                        uid: documentSnapshot.id,
                        id: documentSnapshot.data().id,
                        companyName: documentSnapshot.data().companyName,
                        inputField: documentSnapshot.data().inputField,
                        totalInput: documentSnapshot.data().totalInput
                    });
                    this.setState({
                        allData: this.state.allData,
                        uid: documentSnapshot.id,
                        id: documentSnapshot.data().id,
                        companyName: documentSnapshot.data().companyName,
                        inputField: documentSnapshot.data().inputField,
                        totalInput: documentSnapshot.data().totalInput
                    })
                    console.log("allData", allData)
                    console.log("this.state.companyName", this.state.companyName)
                    console.log("this.state.id", this.state.id)
                    console.log("this.state.uid", this.state.uid)
                    console.log("this.state.inputfield", this.state.inputField)
                });

            });

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
    del = (item, i) => {

        console.log("inputField", item)
        // for (var i = 0; i < this.state.inputField.length; i++) {

        //     if (this.state.inputField[i] === this.state.inputField[0]) {
        //         this.state.inputField.splice(i, 1);
        //         i--;
        //     }
        // }

        Alert.alert("Delete Function!!")
        firestore()
            .collection("Forms")
            .doc(this.state.uid)
            .update({
                inputField: firestore.FieldValue.arrayRemove(item),
            })
            .then(r => console.log("YEAAAH"))
    }
    // deleteNote=(id,text)=>{
    //     console.log("deleteing",id);
    //     console.log("deleting",text);
    //      firestore()
    //     .collection('Todo_tasks')
    //     .doc(id)
    //     .delete()
    //     .then(() => {
    //       console.log("Deleted!");
    //       Alert.alert("Deleted!!");
    //     });

    //   }
    // var arr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 5, 9, 0];

    // for( var i = 0; i < arr.length; i++){ 

    //     if ( arr[i] === 5) { 
    //         arr.splice(i, 1); 
    //         i--; 
    //     }
    // }

    deleteUser() {
        console.log('deleteUser', this.state.uid)
        console.log("delete")
        firestore().collection('Forms').doc(this.state.uid)
            .delete()
            .then((res) => {
                console.log('Item removed from database', res)
                // this.props.navigation.navigate('AdminDashboard');
            })
    }

    updateForm() {
        console.log("this.state.id", this.state.uid)
        const updateDBRef = firestore().collection('Forms').doc(this.state.uid);
        updateDBRef.set({
            totalInput: this.state.totalInput,
            inputField: ListArray,
            companyName: this.state.companyName,
            id: this.state.id,
            // inputField: firestore.FieldValue.arrayUnion(item),
        }).then((docRef) => {
            this.setState({
                totalInput: this.state.totalInput,
                inputField: 'ListArray',
                companyName: this.state.companyName,
                id: this.state.id
            });
            // this.props.navigation.navigate('UserScreen');
            Alert.alert("Form Updated!")
        })
            .catch((error) => {
                console.error("Error: ", error);
            });

    }
    openTwoButtonAlert = () => {
        Alert.alert(
            'Delete Feedback',
            'Are you sure?',
            [
                { text: 'Yes', onPress: () => this.deleteUser() },
                { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }
    render() {
        const image = { uri: "https://image.freepik.com/free-vector/spot-light-background_1284-4685.jpg" };


        console.log("allData inside", this.state.inputField)
        return (

            < NativeBaseProvider >
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
                            <View style={styles.text} mt={2}>
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
                                            onChangeText={(text) => this.setState({ totalInput: text })}
                                            color='#ffffff'
                                        />

                                        <View>

                                            <Text style={styles.headingtwo}>Previous Entered Labels</Text>
                                            {
                                                console.log("this.state.inputField inside array", this.state.inputField),
                                                this.state.inputField && this.state.inputField.map((item, i) => {

                                                    return (
                                                        <View key={i}>
                                                            <Text style={styles.previousLable}>{i} {item} </Text>
                                                            <Button colorScheme="warning"
                                                                onPress={() => { this.del(item, i) }}
                                                                style={styles.submitdel}  >❌ </Button>

                                                        </View>
                                                    )


                                                })

                                            }


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


                                    </FormControl>

                                    <VStack space={2}>

                                        {/* <Button
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


                                        </Button> */}
                                        <Button
                                            colorScheme="danger" _text={{ color: 'white' }}
                                            mt={4}
                                            onPress={() => {

                                                this.updateForm()

                                            }}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            colorScheme="danger" _text={{ color: 'white' }}
                                            mt={4}
                                            onPress={() => {

                                                this.openTwoButtonAlert()

                                            }}
                                        >
                                            Delete
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
        marginTop: 5
    },
    previousLable: {
        color: 'white',
        marginTop: 3,
        fontSize: 18,
        textTransform: 'capitalize',
        width: '50%',
        borderRadius: 5,
        backgroundColor: "#fa2a5b",
        padding: 10
    },
    headingtwo: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
    },
    submitdel: {
        marginLeft: 220,
        marginTop: -45,
        marginBottom: 13,
        padding: 0
    }

})