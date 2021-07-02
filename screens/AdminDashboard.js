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
            .collection('AdminUsers')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log("id", documentSnapshot.data().id)
                    console.log("email", documentSnapshot.data().email)
                    console.log("number", documentSnapshot.data().number)
                    console.log("auth().currentUser.uid", auth().currentUser.uid)
                    if (documentSnapshot.data().id == auth().currentUser.uid) {
                        AsyncStorage.setItem('Userid' + auth().currentUser.uid, documentSnapshot.uid)
                        console.log("component did mount", documentSnapshot.data().email, documentSnapshot.data().number)
                        this.setState({
                            email: documentSnapshot.data().email,
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
                    name: 'AdminLogin',
                },
            ],
        })
        auth().signOut()
        AsyncStorage.setItem("loggedin", "false")
    }

    //https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
    render() {
        const image = { uri: "https://i.pinimg.com/564x/a8/b4/42/a8b442181f7c004f98d4eef842a76e76.jpg" };

        return (

            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <View style={styles.text}>

                        <Text style={styles.textStyle}>
                            Email Id : {this.state.email} ...👋
                        </Text>
                        <Text style={styles.textEmail}>
                            Contact Here : 🤗 {this.state.number}
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