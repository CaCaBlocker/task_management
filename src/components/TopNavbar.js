import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const TopNavBar = ({title, onRight = () => {}, right, onLeft = () => {}, left}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLeft} style={styles.left}>
                <Text style={styles.text}>{left}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity onPress={onRight} style={styles.right}>
                <Text style={styles.text}>{right}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: "black",
        paddingVertical: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    text: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    },
    left: {
        position: "absolute",
        left: 15,
        width: 30,
        height: 30,
        top: 10,
        zIndex: 10,
    },
    right: {
        position: "absolute",
        right: 15,
        width: 30,
        height: 30,
        top: 10,
        zIndex: 10,
    }
});

export default TopNavBar;