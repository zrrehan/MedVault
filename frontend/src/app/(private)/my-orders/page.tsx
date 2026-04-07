import getSinglePersonOrder from "../_action/getSinglePersonOrder"
import AllOrder from "../_component/AllOrder";

export default async function MyOrder() {
    const data = await getSinglePersonOrder();

    return(
        <div className="max-w-287.5 w-[90%] mx-auto">
            <h1 className="text-3xl font-bold mx-auto w-fit mt-5">Your Orders</h1>
            <AllOrder data = {data}></AllOrder>
        </div>
    )
}