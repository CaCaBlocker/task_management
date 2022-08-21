import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from 'react-native-select-dropdown'

import TopNavBar from "../components/TopNavbar";
import RoundInput from '../components/RoundInput';
import Overlay from '../components/Overlay';

import { Status } from "../constants"
import actionTypes from "../actions/actionTypes"

const STATUS_SELECT = [
  "All",
  "Ready",
  "Complete"
];

function SearchScreen({navigation}) {

  const dispatch = useDispatch();

  const [searchWord, setSearchWord] = useState('');
  const [selectWord, setSelectWord] = useState(STATUS_SELECT[0]);

  const tasks = useSelector(state => state.task.searchTasks);
  const searchTaskStatus = useSelector(state => state.task.searchTaskStatus);

  const onBack = () => {
    navigation.navigate("Main");
  }

  const onSearch = () => {
    dispatch({
      type: actionTypes.SEARCH_TASK,
      payload: {
        search: searchWord,
        select: selectWord
      }
    });
  }

  const onSearchWord = (text) => {
    setSearchWord(text);

  }

  const selectStatus = (status) => {
    setSelectWord(status);
  }
  return (
    <View style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <TopNavBar title="Search Task" left="<" onLeft={onBack}/>
        {searchTaskStatus == Status.REQUEST && <Overlay/>}
        <View style={styles.flex}>
          <View style={styles.searchView}>
            <RoundInput onChange={onSearchWord} placeholder={"Search..."} style={styles.flex}/>
            <View style={styles.selectView}>
              <SelectDropdown
                data={STATUS_SELECT}
                defaultValue={STATUS_SELECT[0]}
                buttonStyle={styles.select}
                buttonTextStyle={styles.selectText}
                onSelect={(selectedItem) => selectStatus(selectedItem)}
              />
            </View>
            <TouchableOpacity onPress={onSearch} style={styles.searchBtn}>
              <Text style={styles.textBlack}>S</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollview}>
          {
            tasks && tasks.length > 0 && tasks.map((ele, index) => (
              <TouchableOpacity style={styles.eleContainer} key={ele?.name + String(index)} onPress={() => {
                navigation.navigate("ViewTask", {index});
              }}>
                <Text style={styles.text}>{ele?.name}</Text>
                {ele?.complete && <View style={styles.complete}/>}
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

export default SearchScreen;
