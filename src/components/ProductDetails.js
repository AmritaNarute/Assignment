import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetails = ({ productId }) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    // Fetch product details using the product ID
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        setProductDetails(data); // Set product details to state
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    console.log('Child component re-rendered due to changes in props.');
  });
  console.log("ProductInfo:", productDetails)

  return (
    <View style={styles.container}>
      {productDetails && (
        <View>
          <Text>Product Details for ID: {productDetails.id} {productDetails.title}</Text>
          {/* Display other product details here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default ProductDetails;