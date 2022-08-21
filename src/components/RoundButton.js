import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

function RoundButton({text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "white",
        textAlign: "center"
    },
    container: {
        backgroundColor: "black",
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    }
});

export default RoundButton;