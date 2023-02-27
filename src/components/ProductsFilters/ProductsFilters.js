import React from "react";
import styles from "../../common/styles/Headers.module.scss";

class ProductsFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: "",
      searchOnlyFood: false,
      searchCategory: "",
    };
  }

  handleSearchPhraseChange = (event) => {
    this.setState({ searchPhrase: event.target.value }, () =>
      this.filterProducts()
    );
  };

  handleSearchCategoryChange = (event) => {
    this.setState({ searchCategory: event.target.value }, () =>
      this.filterProducts()
    );
  };

  handleOnlyFoodChange = (event) => {
    this.setState({ searchOnlyFood: event.target.checked }, () =>
      this.filterProducts()
    );
  };

  filterProducts = () => {
    const { produkty } = this.props;
    const { searchPhrase, searchCategory, searchOnlyFood } = this.state;
    let filteredProducts = produkty.filter((produkt) =>
      produkt.nazwa.includes(searchPhrase)
    );
    if (searchOnlyFood) {
      filteredProducts = filteredProducts.filter(
        (produkt) => produkt.produktSpozywczy === true
      );
    }
    if (searchCategory) {
      filteredProducts = filteredProducts.filter(
        (produkt) => produkt.kategoria === searchCategory
      );
    }
    this.props.sendFilteredProductsToParentComponent(filteredProducts);
  };

  handleResetFilters = () => {
    this.setState(
      {
        searchPhrase: "",
        searchOnlyFood: false,
        searchCategory: "",
      },
      () => {
        this.filterProducts();
      }
    );
  };

  getUniqueCategory = () => {
    const { produkty } = this.props;
    const categoryList = produkty.map((produkty) => produkty.kategoria);
    const uniqueCategoryList = [...new Set(categoryList)];
    return uniqueCategoryList;
  };

  render() {
    const uniqueCategory = this.getUniqueCategory();
    const { searchPhrase, searchOnlyFood, searchCategory } = this.state;
    return (
      <div className={styles.Wrapper}>
        <p>Products Filters</p>
        <input
          value={searchPhrase}
          onChange={this.handleSearchPhraseChange}
        ></input>
        <p> Only Food Products </p>
        <input
          type="checkbox"
          onChange={this.handleOnlyFoodChange}
          value={searchOnlyFood}
        ></input>
        <p> Kategoria Produktu </p>
        <select
          value={searchCategory}
          onChange={this.handleSearchCategoryChange}
        >
          <option key={"all"} value={""}>
            Wszystkie
          </option>
          {uniqueCategory.map((kategoria) => (
            <option key={kategoria} value={kategoria}>
              {kategoria}
            </option>
          ))}
        </select>
        <button onClick={this.handleResetFilters}>Zresetuj filtry</button>
      </div>
    );
  }
}

export default ProductsFilters;
