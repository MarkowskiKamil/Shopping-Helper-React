import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";

class ShopingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: "",
      unselectedProductId: [],
    };
  }
  handleClick = (index) => {
    this.props.onClick(index);
  };

  handleLineThrough = (unselectedProduktId2, event) => {
    event.preventDefault();

    if (this.state.unselectedProductId.includes(unselectedProduktId2)) {
      const newList = this.state.unselectedProductId.filter(
        (element) => element !== unselectedProduktId2
      );
      this.setState({unselectedProductId: newList})
    } else {
      this.setState({
        unselectedProductId: [...this.state.unselectedProductId, unselectedProduktId2],
      });
    }
  ;}

  render() {
    console.log(this.state.unselectedProductId);
    const { myShopingList } = this.props;
    const myShopingListWithIndexes = myShopingList.map((produkt, index) => ({
      ...produkt,
      id: index,
    }));
    return (
      <div className={commonColumnsStyles.App}>
        <header className={commonColumnsStyles.AppHeader}>
          <p>Shoping List</p>
          <ul>
            {myShopingListWithIndexes.map((produkt, index) => (
              <li
                style={{
                  "text-decoration": `${
                    this.state.unselectedProductId.includes(produkt.id)
                      ? "line-through"
                      : "auto"
                  }`,
                }}
                onClick={() => this.handleClick(index)}
                onContextMenu={(event) =>
                  this.handleLineThrough(produkt.id, event)
                }
                key={index}
              >{`${produkt.nazwa}`}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default ShopingList;
