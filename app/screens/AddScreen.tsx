import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import color from "../config/color";
import { useNavigation } from "@react-navigation/native";

function AddScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const response = await fetch("http://192.168.245.37:3000/addTodo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    if (response.ok) {
      console.log("Successful response");
      //@ts-ignore
      navigation.navigate("Home");
    } else {
      console.log("Unsuccessful response", response.status);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          placeholderTextColor={color.grayShade}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor={color.grayShade}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.black,
  },
  subContainer: {
    width: "80%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.blackShade,
    padding: 20,
    borderRadius: 40,
  },
  input: {
    height: 40,
    borderColor: color.white,
    color: color.white,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 10,
    width: "100%",
  },
  button: {
    backgroundColor: color.blackShade,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.white,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: color.white,
  },
});

export default AddScreen;
