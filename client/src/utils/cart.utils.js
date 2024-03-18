export const updateCart = (state) => {
  state.itemsPrice = Number(
    state.cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2)
  );
  state.shippingPrice = Number(
    (state.itemsPrice === 0 ? 0 : state.itemsPrice > 100 ? 0 : 10).toFixed(2)
  );
  state.taxPrice = Number((state.itemsPrice * 0.15).toFixed(2));

  state.totalPrice = Number(
    (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2)
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
