import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            email: '',
            companyName: '',
            number: '',
        }
    }


    componentDidMount() {
        // console.log("component did mount")
        firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log("id", documentSnapshot.data().id)
                    console.log("email", documentSnapshot.data().email)
                    console.log("companyName", documentSnapshot.data().companyName)
                    console.log("number", documentSnapshot.data().number)
                    console.log("auth().currentUser.uid", auth().currentUser.uid)
                    if (documentSnapshot.data().id == auth().currentUser.uid) {
                        AsyncStorage.setItem('Userid' + auth().currentUser.uid, documentSnapshot.uid)
                        console.log("component did mount", documentSnapshot.data().email, documentSnapshot.data().companyName, documentSnapshot.data().number)
                        this.setState({
                            email: documentSnapshot.data().email,
                            companyName: documentSnapshot.data().companyName,
                            number: documentSnapshot.data().number,

                        })
                    }

                });
            });

    }


    logout = async () => {
        console.log("hhgj")               //log out
        this.props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'UserLogin',
                },
            ],
        })
        auth().signOut()
        AsyncStorage.setItem("loggedin", "false")
    }

    //https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
    render() {
        const image = { uri: "https://image.freepik.com/free-vector/spot-light-background_1284-4685.jpg" };

        return (

            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <View style={styles.text}>

                        <Text style={styles.textStyle}>
                            Email Id : {this.state.email} ...👋
                        </Text>
                        <Text style={styles.textEmail}>
                            Company Name : 🤗 {this.state.companyName}
                        </Text>
                        <View style={styles.CreateProfile}>
                            <Button
                                color="#f22e55"
                                title="Logout"
                                onPress={() => this.logout()}
                            />

                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20,
        marginTop: 30,
        fontWeight: "bold",
        color: 'white'
    },
    textEmail: {
        fontSize: 15,
        marginBottom: 20,
        color: "#cdcdcd",
        fontWeight: "bold",
    },
    CreateProfile: {
        marginVertical: 10,
        minWidth: 100
    },
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
});