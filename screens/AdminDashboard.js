import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, AsyncStorage, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { ListItem, Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import { marginTop } from 'styled-system';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.firestoreRef = firestore().collection('Feedback');
        this.state = {
            companyName: '',
            userArr: [],
            feedbackData: [],
        }
    }
    componentDidMount() {
        const companyName = this.props.route.params?.companyName ?? 'companyName';
        console.log("companyNameaaaaaaaa", companyName)
        this.setState({
            companyName: companyName
        })
        console.log("companyName", companyName)
        console.log("this.state.feedbackData", this.state.feedbackData)
        firestore()
            .collection('Feedback')
            .where('feedbackData.companyName', "==", companyName)
            .get()
            .then(querySnapshot => {
                var allFields = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log("feedbackData[0]", documentSnapshot.data().feedbackData)
                    console.log("feedbackData[1]", documentSnapshot.data().feedbackData.companyName)
                    allFields.push({
                        id: documentSnapshot.data().id,
                        feedbackData: documentSnapshot.data().feedbackData
                    });
                    this.setState({
                        userArr: allFields
                    })
                    console.log("this.state.userArr  last", this.state.userArr)
                })
            })
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);

    }

    render() {
        const image = { uri: "https://i.pinimg.com/564x/a8/b4/42/a8b442181f7c004f98d4eef842a76e76.jpg" };
        console.log("this.state.userArr", this.state.userArr)
        console.log("feedbackdata", this.state.feedbackData)
        return (

            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <ScrollView>
                        <View style={styles.text}>
                            <Text style={styles.textEmail}>
                                Company Name : {this.state.companyName}
                            </Text>
                        </View>

                        {
                            this.state.userArr != '' ?
                                <View>
                                    {
                                        this.state.userArr.map((item, i) => {
                                            return (
                                                <Card containerStyle={{ padding: 10, marginLeft: 30, marginRight: 30 }} >
                                                    {Object.keys(item.feedbackData).map((data, index) => {
                                                        console.log(data)
                                                        return (
                                                            <>
                                                                {
                                                                    data != 'inputField' ?
                                                                        <>
                                                                            <View key={index} style={styles.user}>
                                                                                <Text> {data}: {item.feedbackData[data]} </Text>
                                                                            </View>
                                                                        </>
                                                                        : null
                                                                }
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </Card>
                                            );
                                        })
                                    }
                                </View> :
                                <View>
                                    <Text style={styles.textcurrent}>Currently Feedbacks for {this.state.companyName} are not Available</Text>
                                </View>
                        }

                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20,
        marginTop: 30,
        fontWeight: "bold",
        color: 'red',

    },
    textEmail: {
        fontSize: 25,
        marginBottom: 10,
        color: "#f66656",
        fontWeight: "bold",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    text: {
        padding: 20,
        marginLeft: 33,
        fontSize: 42,
        fontWeight: "bold",
    },
    user: {
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 18,
    },
    textcurrent: {
        color: "black",
        padding: 25,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#ffffffa0"
    },

});