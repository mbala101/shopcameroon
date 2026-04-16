import axios from 'axios';

const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY || '';
const FLUTTERWAVE_BASE_URL = 'https://api.flutterwave.com/v3';

interface PaymentInitiateParams {
  orderId: string;
  amount: number;
  phoneNumber: string;
  paymentMethod: 'momo' | 'orange_money';
  customerEmail: string;
  customerName: string;
}

interface PaymentResponse {
  status: string;
  message: string;
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    status: string;
    [key: string]: any;
  };
}

export async function initiateMobileMoneyPayment(
  params: PaymentInitiateParams
): Promise<PaymentResponse> {
  const network = params.paymentMethod === 'momo' ? 'MTN' : 'ORANGE';

  try {
    const response = await axios.post(
      `${FLUTTERWAVE_BASE_URL}/payments`,
      {
        tx_ref: `ORDER-${params.orderId}-${Date.now()}`,
        amount: params.amount,
        currency: 'XAF',
        payment_type: 'mobilemoney',
        network: network,
        phone_number: params.phoneNumber.replace(/\D/g, ''),
        email: params.customerEmail || 'customer@example.com',
        name: params.customerName,
        callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payments/callback`,
        meta: {
          orderId: params.orderId,
          paymentMethod: params.paymentMethod,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Flutterwave payment initiation error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to initiate payment');
  }
}

export async function verifyPayment(transactionId: string): Promise<PaymentResponse> {
  try {
    const response = await axios.get(
      `${FLUTTERWAVE_BASE_URL}/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Flutterwave payment verification error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to verify payment');
  }
}

export function verifyWebhookSignature(payload: any, signature: string): boolean {
  // In production, verify the webhook signature using your encryption key
  // This is a simplified version - implement proper signature verification
  return true;
}
