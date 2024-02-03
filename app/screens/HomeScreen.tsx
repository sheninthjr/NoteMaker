import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import color from "../config/color";
import { useIsFocused } from "@react-navigation/native";

interface Data {
  id: number;
  title: string;
  description: string;
}

function HomeScreen() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("http://192.168.245.37:3000/getAllTodo");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Fetch Error during refresh:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const getAllTodo = async () => {
      try {
        const response = await fetch("http://192.168.245.37:3000/getAllTodo");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    getAllTodo();
  }, []);

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);
  return (
    <SafeAreaView
      style={{ backgroundColor: "black", height: "100%", paddingTop: 20 }}
    >
      <FlatList
        data={data}
        keyExtractor={(item: Data) => item.id.toString()}
        renderItem={({ item }): any => (
          <View style={styles.subContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 4,
    gap: 10,
    borderBottomWidth: 2,
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
  description: {
    color: color.white,
    fontSize: 20,
    textAlign: "justify",
    backgroundColor: color.blackShade,
    padding: 10,
    borderRadius: 20,
  },
  title: {
    color: color.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "justify",
    backgroundColor: color.blackShade,
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
});
export default HomeScreen;
