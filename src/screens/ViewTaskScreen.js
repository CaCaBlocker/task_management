import React, { useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text
} from "react-native"
import { useDispatch, useSelector } from "react-redux";
import TopNavBar from "../components/TopNavbar";
import RoundButton from "../components/RoundButton";
import Overlay from "../components/Overlay";

import { Status } from "../constants"

import actionTypes from "../actions/actionTypes";

function ViewTaskScreen({route, navigation}) {

    const taskIndex = route.params.index;
    const task = useSelector(state => state.task.tasks[taskIndex])
    const [remove, setRemove] = useState(false);
    const [complete, setComplete] = useState(false);
    const dispatch = useDispatch();

    const deleteTaskStatus = useSelector(state => state.task.deleteTaskStatus);
    const completeTaskStatus = useSelector(state => state.task.completeTaskStatus);
    useEffect(() => {
        if (remove && deleteTaskStatus == Status.SUCCESS)
            navigation.navigate("Main");
    }, [deleteTaskStatus, completeTaskStatus])

    const onBack = () => {
        navigation.navigate("Main");
    }

    const onUpdate = (index) => {
        navigation.navigate("EditTask", {index})
    }
    const onDelete = (index) => {
        dispatch({
            type: actionTypes.DELETE_TASK,
            payload: {
                index
            }
        });
        setRemove(true)
    }
    const onComplete = (index) => {
        dispatch({
            type: actionTypes.COMPLETE_TASK,
            payload: {
                index
            }
        });
        setComplete(true);
    }

    return (
        <View style={styles.flex}>
            <SafeAreaView style={styles.flex}>
                <TopNavBar title="View Task" left="<" onLeft={onBack}/>
                {(deleteTaskStatus == Status.REQUEST || completeTaskStatus == Status.REQUEST) && <Overlay/>}
                <View style={[styles.flex, styles.container]}>
                    <View style={[styles.flex]}>
                        <View>
                            <Text style={styles.textBlack}>Name</Text>
                            <Text style={styles.content}>{task?.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.textBlack}>Description</Text>
                            <Text style={styles.content}>{task?.description}</Text>
                        </View>
                    </View>
                    {!task?.complete && <RoundButton text="Complete" onPress={() => onComplete(taskIndex)}/>}
                    {!task?.complete && <RoundButton text="Update" onPress={() => onUpdate(taskIndex)}/>}
                    <RoundButton text="Delete" onPress={() => onDelete(taskIndex)}/>
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
        marginHorizontal: 20,
        marginVertical: 20,
    },
    content: {
        marginVertical: 10
    },
    textBlack: {
        color: "black"
    }
});

export default ViewTaskScreen;