import React, {useEffect, useState} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text
} from "react-native"
import { useSelector, useDispatch } from "react-redux";

import TopNavBar from "../components/TopNavbar";
import RoundInput from '../components/RoundInput';
import RoundButton from "../components/RoundButton";
import Overlay from "../components/Overlay";

import { Status } from "../constants"

import actionTypes from "../actions/actionTypes";

function EditTaskScreen({route, navigation}) {

    const index = route.params.index;
    const currentTask = useSelector(state => state.task.tasks[index]);

    const [name, setName] = useState(currentTask.name);
    const [description, setDescription] = useState(currentTask.description);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();

    const updateTaskStatus = useSelector(state => state.task.updateTaskStatus);

    useEffect(() => {
        if (update && updateTaskStatus == Status.SUCCESS)
            navigation.navigate("Main");
    }, [updateTaskStatus])

    const onBack = () => {
        navigation.navigate("ViewTask", {index});
    }

    const onUpdate = () => {
        dispatch({
            type: actionTypes.UPDATE_TASK,
            payload: {
                index,
                name,
                description
            }
        });
        setUpdate(true);
    }

    return (
        <View style={styles.flex}>
            <SafeAreaView style={styles.flex}>
                <TopNavBar title="Edit Task" left="<" onLeft={onBack}/>
                {updateTaskStatus == Status.REQUEST && <Overlay/>}
                <View style={[styles.flex, styles.container]}>
                    <View>
                        <Text>Name</Text>
                        <RoundInput onChange={(text) => {setName(text)}} value={name}/>
                    </View>
                    <View>
                        <Text>Description</Text>
                        <RoundInput onChange={(text) => {setDescription(text)}} multiline={true} value={description}/>
                    </View>
                    <RoundButton text="Update" onPress={onUpdate}/>
                </View>
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

export default EditTaskScreen;