import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MovieDetails = ({route}) => {
    const { item } = route.params
    return (
        <View>
            <Text>{item.title}</Text>
        </View>
    )
}

export default MovieDetails

const styles = StyleSheet.create({})
