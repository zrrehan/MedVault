'use client';

interface Medicine {
  id: string;
  name: string;
  image: string;
  manufacturer: string;
  category: string[];
}

interface SoldItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  medicine: Medicine;
}

interface Order {
  id: string;
  delivery_state: string;
  payment_state: string;
  userId: string;
  sold_data: SoldItem[];
}

interface OrderCardProps {
  order: Order;
  onCancel: (id: string) => void;
  onPay: (id: string) => void;
}

export default function OrderCard({ order, onCancel, onPay }: OrderCardProps) {
  const total = order.sold_data.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  const deliveryBadge: Record<string, string> = {
    PENDING: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    DELIVERED: 'bg-green-50 text-green-700 border border-green-200',
    CANCELLED: 'bg-red-50 text-red-700 border border-red-200',
  };

  const paymentBadge: Record<string, string> = {
    PENDING: 'bg-orange-50 text-orange-700 border border-orange-200',
    PAID: 'bg-green-50 text-green-700 border border-green-200',
    FAILED: 'bg-red-50 text-red-700 border border-red-200',
  };

  return (
    <div className="border rounded-2xl p-5 shadow-sm space-y-5">

      {/* Header */}
      <div className="flex justify-end w-full items-start gap-4">
       <div className="flex gap-10 items-end  text-right">
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Delivery:</span>
                <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    deliveryBadge[order.delivery_state] ?? 'bg-gray-100 text-gray-600'
                }`}
                >
                {order.delivery_state}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Payment:</span>
                <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    paymentBadge[order.payment_state] ?? 'bg-gray-100 text-gray-600'
                }`}
                >
                {order.payment_state}
                </span>
            </div>
        </div>
      </div>

      {/* 🧾 Medicines — Vertical Layout */}
      <div className="space-y-3">
        {order.sold_data.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border rounded-xl p-3 hover:bg-gray-50 transition"
          >
            {/* Image */}
            <img
              src={item.medicine.image}
              alt={item.medicine.name}
              className="w-16 h-16 rounded-lg object-cover border"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-black truncate">
                {item.medicine.name}
              </p>

              <p className="text-xs text-gray-500 truncate">
                {item.medicine.manufacturer}
              </p>

              <p className="text-xs text-gray-400">
                {item.medicine.category.join(', ')}
              </p>

              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <span>Qty: {item.quantity}</span>
                <span>•</span>
                <span>৳{item.priceAtPurchase}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-sm font-semibold text-black">
                ৳{(item.priceAtPurchase * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t">
        <div>
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-bold text-black">
            ৳{total.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onPay(order.id)}
            className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-150"
          >
            Pay Now
          </button>

          {order.delivery_state === 'PENDING' && (
            <button
              onClick={() => onCancel(order.id)}
              className="border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg hover:border-red-300 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all duration-150"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}