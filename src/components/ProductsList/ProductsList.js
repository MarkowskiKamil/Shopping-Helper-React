import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: "",
    };
  }
  render() {
    const { productsToDisplay } = this.props;
    const handleClick = (index) => {
      this.props.onClick(index);
    };
    return (
      <div className={commonColumnsStyles.App}>
        <header className={commonColumnsStyles.AppHeader}>
          <p>Products list</p>
          <ul>
            {productsToDisplay.map((produkt, index) => (
              <li
                onClick={() => handleClick(produkt)}
                key={index}
              >{`${produkt.nazwa}`}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default ProductsList;

