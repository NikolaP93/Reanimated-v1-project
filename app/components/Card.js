import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        padding: 10,
        width,
        position: 'absolute',
        height,
        shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        backgroundColor: 'white'
    }
})

const Card = ({ children }) => {
    return (
        <View style={[styles.container]}>
            {children}
        </View>
    )
}

export default Card
