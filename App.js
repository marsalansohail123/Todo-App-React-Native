import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
const COLORS = { primary: '#1f145c', white: '#fff' };

const App = () => {

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  // Add The Item

  const addItem = () => {
    if (!inputData) {
      alert("Please Add Todo!")
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === edditItem) {
            return { ...curElem, value: inputData }
          };
          return curElem;
        })
      );
      setInputData("");
      setEdditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData =
      {
        id: new Date().getTime().toString(),
        value: inputData,
      }
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const removeAll = () => {
    setItems([])
  };

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  const [edditItem, setEdditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const editItem = (index) => {
    const todo_list_edit = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(todo_list_edit.value);
    setEdditItem(index);
    setToggleButton(true);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: COLORS.primary,
                  marginTop: 5
                }}>
                TODO APP
              </Text>
            </View>
            <TouchableOpacity onPress={removeAll}>
              <View style={styles.actionIcon}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  color: COLORS.primary,
                }}>
                  🗑️
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.writeTaskWrapper}
            >

              <TextInput
                style={styles.input}
                placeholder={"What's Your Task?"}
                defaultValue={inputData}
                onChangeText={(e) => setInputData(e)}
              >
              </TextInput>

              {toggleButton ?
                (
                  <TouchableOpacity onPress={addItem}>
                    <View style={styles.addWraper2}>
                      <Text style={styles.addText}>Edit</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={addItem}>
                    <View style={styles.addWraper2}>
                      <Text style={styles.addText}>Add</Text>
                    </View>
                  </TouchableOpacity>
                )
              }

            </KeyboardAvoidingView>
          </View>

          {
            items.map((curElem) => {
              return (

                <View style={styles.item} key={curElem.id}>
                  <View style={styles.itemLeft}>
                    <TouchableOpacity onPress={() => editItem(curElem.id)}>
                      <View style={styles.square}>
                        <Text style={{ fontSize: 20 }}>✏️</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.itemText}>{curElem.value}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteItem(curElem.id)}>
                    <View style={styles.circular}><Text style={{ fontSize: 17 }}>❌</Text></View>
                  </TouchableOpacity>
                </View>

              )
            })
          }
        </ScrollView >
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 30,
    width: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: COLORS.primary,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    marginRight: 15,
  },
  itemText: {
    maxWidth: '90%',
    color: COLORS.white,
  },
  circular: {
    paddingHorizontal: 1,
  },
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    marginLeft: 15,
  },
  addWraper2: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginRight: 15,
  },
})

export default App;