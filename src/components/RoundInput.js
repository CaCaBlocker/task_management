import React from "react";
import {
    View,
    TextInput,
    StyleSheet
} from "react-native";

function RoundInput({style, placeholder, onChange, multiline = false, value}) {
    return (
        <View style={[style, styles.container]}>
            <TextInput style={!multiline ? styles.textinput : styles.multiline} placeholder={placeholder} onChangeText={onChange} multiline={multiline} defaultValue={value}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    textinput: {
        borderColor: "black",
        borderWidth: 1,
        fontSize: 12,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    multiline: {
        borderColor: "black",
        borderWidth: 1,
        fontSize: 12,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 300,
        textAlignVertical: "top",
        padding: 10,
    }
});

export default RoundInput;