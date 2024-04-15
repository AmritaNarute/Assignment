import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo, useCallback} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ProductDetails from './src/components/ProductDetails'

const App = () => {
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products',
      {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
      const data = await response.json();
      // console.log(data)
      setProduct(data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("state:", product)

  const computeDetails = useMemo(() => (item) => {
    return `ID: ${item.id}, Title: ${item.title}`;
  }, []);

  // Callback function for selecting a product
  const selectProduct = useCallback((productId) => {
    setSelectedProduct(productId);
  }, []);


  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectProduct(item.id)}>
      <View style={styles.card}>
        <Text>{computeDetails(item)}</Text>
      </View>

    {/* <View style={styles.card}>
      <Text style={styles.id}>ID: {item.id}</Text>
      <Text style={styles.title}>Title: {item.title}</Text>
    </View> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
       showsVerticalScrollIndicator={false}
        data={product}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {selectedProduct && (
        <ProductDetails productId={selectedProduct} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    marginTop:10
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff', 
  },
  id: {
    fontWeight: 'bold',
  },
  title: {
    marginTop: 5,
  },
});

export default App