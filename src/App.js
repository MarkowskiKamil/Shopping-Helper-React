import React, { useState } from "react";
import ProductsList from "./components/ProductsList/ProductsList";
import ShopingList from "./components/ShopingList/ShopingList";
import AddProducts from "./components/AddProducts/AddProducts";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import styles from "./App.module.scss";
import produkty from "./common/consts/produkty";

function App() {
  const [productList, setProductsList] = useState(produkty);
  const [shopingList, setShopingList] = useState([]);
  const addProductToMyShoppingList = (matchProduct) => {
    setShopingList([...shopingList, matchProduct]);
  };
  const removeProductFromMyShoppingList = (matchProductIndex) => {
    setShopingList(shopingList.filter((product, index) => index !== matchProductIndex));
  };
  return (
    <div className={styles.appWrapper}>
      <AddProducts />
      <ProductsFilters produkty={produkty}
        sendFilteredProductsToParentComponent={setProductsList}/>
      <div className={styles.columnsWrapper}>
        <ProductsList
          productsToDisplay={productList}
          onClick={addProductToMyShoppingList}
        />
        <ShopingList
          myShopingList={shopingList}
          onClick={removeProductFromMyShoppingList}
        />
      </div>
    </div>
  );
}

export default App;
