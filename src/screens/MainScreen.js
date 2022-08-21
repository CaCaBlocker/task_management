import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import TopNavBar from "../components/TopNavbar";
import Overlay from '../components/Overlay';

import { Status } from "../constants"
import actionTypes from "../actions/actionTypes"


function Main({navigation}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_CRYPTO
    })
  }, [dispatch])

  const tasks = useSelector(state => state.task.tasks);
  const date = useSelector((state) => state.custom.cryptoDate);
  const price = useSelector((state) => state.custom.cryptoPrice);

  const onNewTask = () => {
    navigation.navigate("NewTask");
  }

  const onSearch = () => {
    navigation.navigate("SearchTask");
  }
  return (
    <View style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <TopNavBar title="To Do" right="+" onRight={onNewTask} left="S" onLeft={onSearch}/>
        <View style={styles.flex}>
          <View style={styles.cryptoView}>
            <Text style={[styles.flex, styles.text]}>{"BTC"}</Text>
            <Text style={[styles.flex, styles.text]}>{date}</Text>
            <Text style={[styles.flex, styles.text]}>{price + "$"}</Text>
          </View>
          <ScrollView style={styles.scrollview}>
          {
            tasks.map((ele, index) => (
              <TouchableOpacity style={styles.eleContainer} key={ele.name + String(index)} onPress={() => {
                navigation.navigate("ViewTask", {index});
              }}>
                <Text style={[styles.text, styles.eleText]}>{ele.name}</Text>
                {ele.complete && <View style={styles.complete}/>}
              </TouchableOpacity>
            ))
          }
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  scrollview: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  eleContainer: {
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 5
  },
  text: {
    textAlign: "center"
  },
  textWhite: {
    color: "white"
  },
  textBlack: {
    color: "black"
  },
  eleText: {
    fontSize: 20
  },
  complete: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: "absolute",
    right: 10,
    top: 20,
    backgroundColor: "black"
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  selectView: { paddingVertical: 10, marginRight: 10 },
  select: { borderWidth: 1, width: 100, borderRadius: 10 },
  selectText: { fontSize: 14 },
  cryptoView: {
    marginTop: 10,
    padding: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  searchBtn: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 15,
  }
})

export default Main;
