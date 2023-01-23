import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} added by one`, {
          position: "top-left",
        });
      } else {
        const tempProducts = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProducts);
        toast.success(`${action.payload.name} Product added to cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} removed one item`, {
          position: "top-left",
        });
      } else if ((state.cartItems[productIndex].cartQuantity = 1)) {
        const newCartItem = state.cartItems.filter(
          (items) => items.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.info(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (items) => items.id !== action.payload.id
      );
      state.cartItems = newCartItem;
      toast.info(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info("Removed All products from cart", {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALACULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      // console.log(totalAmount);
      state.cartTotalAmount = totalAmount;
    },
    CALACULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const cartItemQuantity = cartQuantity;
        return array.push(cartItemQuantity);
      }, 0);
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      // console.log(totalQuantity);
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALACULATE_SUBTOTAL,
  CALACULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;
//
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectpreviousURL = (state) => state.cart.previousURL;
//
export default cartSlice.reducer;
