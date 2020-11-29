import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Buttton = ({title}) => {
    return (
        <TouchableOpacity style={
            {

                borderRadius: 20,
                padding: 10,
                width: '40%',
                height: 40,
                justifyContent:'center',
                backgroundColor: 'lightblue'
            }
        }>
            <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Buttton
