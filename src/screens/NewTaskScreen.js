import React, {useEffect, useState} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text
} from "react-native"
import { useDispatch, useSelector } from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import actionTypes from "../actions/actionTypes"

import TopNavBar from "../components/TopNavbar";
import RoundInput from '../components/RoundInput';
import RoundButton from "../components/RoundButton";
import Overlay from "../components/Overlay";

import { Status } from "../constants"

function NewTaskScreen({navigation}) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [save, SetSave] = useState(false);

    const dispatch = useDispatch();

    const createTaskStatus = useSelector(state => state.task.createTaskStatus);

    useEffect(() => {
        if (save && createTaskStatus == Status.SUCCESS)
            navigation.navigate("Main");
    }, [createTaskStatus])

    const onBack = () => {
        navigation.navigate("Main");
    }

    const onSave = () => {
        dispatch({
            type: actionTypes.CREATE_TASK,
            payload: {
                name,
                description
            }
        });
        SetSave(true)
    }

    return (
        <View style={styles.flex}>
            <SafeAreaView style={styles.flex}>
                <TopNavBar title="New Task" left="<" onLeft={onBack}/>
                {createTaskStatus == Status.REQUEST && <Overlay/>}
                <KeyboardAwareScrollView>
                <View style={[styles.container, styles.flex]}>
                    <View style={[styles.flex]}>
                        <View>
                            <Text>Name</Text>
                            <RoundInput onChange={(text) => {setName(text)}}/>
                        </View>
                        <View>
                            <Text>Description</Text>
                            <RoundInput onChange={(text) => {setDescription(text)}} multiline={true}/>
                        </View>
                        
                    </View>
                    <RoundButton text="Create" onPress={onSave}/>
                </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        marginTop: 20,
        marginBottom: 50,
        marginHorizontal: 20
    }
});

export default NewTaskScreen;