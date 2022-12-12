import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

export const productSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        increaseItemCount: (state, action) => {
            state.items = [...state.products, action.payload];
        },
        decreaseItemCount: (state, action) => {
            const index = state.products.findIndex(
                (product) => product.id === action.payload.id
            );
            let newCart = [...state.items];

            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove item (id: ${action.payload.id}) from cart as it is not in the cart!`
                );
            }

            state.products = newCart;
        },
    },
});


export const { increaseProductCount, decreaseProductCount } = productSlice.actions;


export const selectProducts = (state) => state.product.products;

export const selectProductsWithId = (state, id) =>
    state.product.items.filter((object) => object.id === id);

export const selectProductsTotal = (state) =>
    state.product.products.reduce((total, product) => (total += product.price), 0);

export default productSlice.reducer;
