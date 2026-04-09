import SuccessPaid from "../../_component/SuccessPaid";

async function PaymentSuccess({searchParams}:any) {
  const {orderId} = await searchParams; 
  
  return (
    <>
      <SuccessPaid orderId={orderId}></SuccessPaid>
    </>
  )
}

export default PaymentSuccess;