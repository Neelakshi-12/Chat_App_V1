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
import { ImageBackground, ScrollView, AsyncStorage, StyleSheet, Alert, Text } from 'react-native';

export default class AdminForm extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React',
            total: 0,
            totalInput: '',
            show: false,
        };
    }


    add = () => {
        // Alert.alert("added!!")
        console.log("Added")
        this.setState({
            total: this.state.totalInput
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    showValues = () => {
        console.log("showValues")
        this.setState({
            show: true
        })
    }

    render() {
        const image = { uri: "https://image.freepik.com/free-vector/spot-light-background_1284-4685.jpg" };

        const inputs = [];

        for (let i = 1; i <= this.state.total; i++) {
            inputs.push(
                <Input name={`input-${i}`} onChange={this.onChange}
                    placeholder="Enter Details"
                />
            )
        }

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
                            <View style={styles.text} mt={3}>
                                <VStack space={2} >
                                    <FormControl isRequired>
                                        <FormControl.Label _text={{ color: '#ffffff', fontSize: 'sm', fontWeight: 600 }}>
                                            Enter Number of Fields
                                        </FormControl.Label>
                                        <Input
                                            value={this.state.totalInput}
                                            keyboardType='numeric'
                                            //onChangeText={(text) => this.setState({ totalInput: e.target.value })}
                                            onChangeText={(text) => this.setState({ totalInput: text })}
                                            color='#ffffff'
                                        />
                                    </FormControl>

                                    <VStack space={2}>
                                        <Button colorScheme="danger" _text={{ color: 'white' }}
                                            onPress={() => { this.add() }}

                                            mt={4}
                                        >
                                            Add
                                        </Button>
                                        <View>{inputs}</View>

                                        <Button
                                            colorScheme="danger" _text={{ color: 'white' }}
                                            onPress={() => { this.showValues() }}
                                        >
                                            Show Inputs values
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