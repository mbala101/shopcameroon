interface OrderSummary {
  orderId: string;
  customerName: string;
  customerPhone: string;
  total: number;
  paymentMethod: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export function formatWhatsAppMessage(order: OrderSummary): string {
  const itemsList = order.items
    .map((item) => `• ${item.name} x${item.quantity} - ${item.price.toLocaleString()} XAF`)
    .join('\n');

  const message = `🛒 *New Order Confirmation*

📦 Order ID: ${order.orderId}
👤 Customer: ${order.customerName}
📱 Phone: ${order.customerPhone}

📋 *Order Details:*
${itemsList}

💰 *Total: ${order.total.toLocaleString()} XAF*
💳 Payment Method: ${order.paymentMethod}

Thank you for shopping with us! 🎉`;

  return message;
}

export function getWhatsAppLink(phone: string, message: string): string {
  // Remove any non-numeric characters from phone
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
}

export function getAdminWhatsAppLink(message: string): string {
  const adminPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+237600000000';
  const cleanPhone = adminPhone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
}
