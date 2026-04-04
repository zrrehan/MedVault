import AllItemInCart from "../_component/cart/AllItemsInCart";

export default function Cart() {
    return(
        <div>
            <h1 className="text-3xl font-bold mx-auto w-fit mt-5">Your Cart</h1>
            <AllItemInCart></AllItemInCart>
        </div>
    )
}