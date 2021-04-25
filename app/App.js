import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Task } from "./components/Task";

export default function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [text, setText] = useState("");

  const handleAddTask = () => {
    if (text !== "") {
      setTaskItems(
        taskItems.concat([
          {
            id: text,
            text,
          },
        ])
      );
      setText("");
      Keyboard.dismiss();
    }
  };

  const handleDeleteTask = (taskId) => {
    setTaskItems(taskItems.filter((value) => value.id !== taskId));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Today's Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.tasksContainer}
      >
        <ScrollView style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Task</Text>

          <View style={styles.taskItems}>
            {taskItems.map((taskItem, index) => {
              return (
                <TouchableOpacity onPress={() => handleDeleteTask(taskItem.id)}>
                  <Task key={index} text={taskItem.text} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Write Your Task"
            value={text}
            onChangeText={(value) => setText(value)}
          />

          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksContainer: {
    flex: 1,
  },
  tasksWrapper: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  taskItems: {},
  writeTaskWrapper: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 15,
  },
  addWrapper: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
