// Type for a single cart item
interface CartItem {
  medicineId: string;
  quantity: number;
}

// Add or update a single item in cart
export function addCart(medicineId: string, quantity: number = 1) {
  if (typeof window === "undefined") {
    return { success: false, message: "Cannot access localStorage on server" };
  }

  const existing = localStorage.getItem("sold_data");
  const cart: CartItem[] = existing ? JSON.parse(existing) : [];

  const itemIndex = cart.findIndex((item) => item.medicineId === medicineId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity = quantity;
    localStorage.setItem("sold_data", JSON.stringify(cart));
    return { success: true, message: `Updated quantity of medicine in cart to ${quantity}` };
  }

  cart.push({ medicineId, quantity });
  localStorage.setItem("sold_data", JSON.stringify(cart));
  return { success: true, message: "Medicine added to cart successfully" };
}

// Get all cart items
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  
  const existing = localStorage.getItem("sold_data");
  return existing ? JSON.parse(existing) : [];
}

// Delete a single item from cart
export function removeCart(medicineId: string) {
  if (typeof window === "undefined") {
    return { success: false, message: "Cannot access localStorage on server" };
  }

  const existing = localStorage.getItem("sold_data");
  const cart: CartItem[] = existing ? JSON.parse(existing) : [];

  const updatedCart = cart.filter(item => item.medicineId !== medicineId);

  localStorage.setItem("sold_data", JSON.stringify(updatedCart));
  return { success: true, message: "Medicine removed from cart successfully" };
}