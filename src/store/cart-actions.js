import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://shoping-cart-5da6d-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("could not fetch data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "fetching cart data failed...",
          title: "fetching failed",
          message: "fetching failed...",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending...",
        title: "Sending...",
        message: "Sending...",
      })
    );

    const sendReq = async () => {
      const res = await fetch(
        "https://shoping-cart-5da6d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("sending data failed....");
      }
    };
    try {
      await sendReq();
      dispatch(
        uiActions.showNotification({
          status: "Successful...",
          title: "Success...",
          message: "Sent data successfully...",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "Error...",
          title: "Error...",
          message: "Data sending failed...",
        })
      );
    }
  };
};
