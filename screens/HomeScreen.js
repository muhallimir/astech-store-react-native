import React from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TextInput, View } from "react-native";
import Header from "../components/Header";
import Categories from "../components/Categories";



const HomeScreen = () => {
  const navigation = useNavigation();


  return (
    <SafeAreaView className="bg-white">
      <Header />
      <Categories />
    </SafeAreaView>
  );
};

export default HomeScreen;
