import React, { Component } from 'react';
import {
    NativeBaseProvider,
    Box,
    Heading,

} from 'native-base';
import { ImageBackground, ScrollView, AsyncStorage, StyleSheet, Alert, Text } from 'react-native';

export default class UserFeedBack extends Component {

    constructor() {
        super();
        this.state = {
        };
    }


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
                            Enter Here!!
                        </Heading>

                        <ScrollView>

                            <Text>Helloo Neelu</Text>
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

})