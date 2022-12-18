import React from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import { ScrollView } from "react-native-gesture-handler";



const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white">
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Carousel />
        <Categories />
        <Products />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
