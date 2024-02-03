import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import color from "../config/color";

function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          //@ts-ignore
          navigation.navigate("Home")
        }
      >
        <View style={styles.subContainer}>
          <AntDesign name="home" size={24} color="white" />
          <Text style={styles.text}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          //@ts-ignore
          navigation.navigate("Add")
        }
      >
        <View style={styles.subContainer}>
          <Ionicons name="create-outline" size={24} color="white" />
          <Text style={styles.text}>Add</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 2,
    backgroundColor: color.blackShade,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  text: {
    color: color.white,
    fontSize: 20,
  },
});

export default NavBar;
