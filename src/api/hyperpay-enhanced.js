// Enhanced HyperPay API based on the provided example
import axios from 'axios';
import crypto from 'crypto';

// Configuration
const HYPERPAY_CONFIG = {
    userId: '8a8294175060823a015060866a48002c',
    password: 'ZR9zWyRP',
    entityId: '8a82941750616e5a01506185ccc3007c',
    isTest: true,
    baseUrl: 'https://test.oppwa.com',
    productionUrl: 'https://oppwa.com'
};

// Helper function to get base URL
const getBaseUrl = () => {
    return HYPERPAY_CONFIG.isTest ? HYPERPAY_CONFIG.baseUrl : HYPERPAY_CONFIG.productionUrl;
};

// Enhanced HyperPay API
export const hyperpayEnhancedAPI = {
    // Create checkout session
    createCheckout: async (paymentData) => {
        try {
            console.log('🚀 Creating HyperPay checkout session...');
            
            const {
                amount = '1.00',
                currency = 'SAR',
                paymentType = 'DB',
                customerEmail = 'customer@example.com',
                customerName = 'Customer Name',
                customerSurname = 'Customer Surname',
                billingStreet = 'Test Street',
                billingCity = 'Riyadh',
                billingState = 'Central',
                billingCountry = 'SA',
                merchantTransactionId = Math.random() * (1000 - 50) + 1000
            } = paymentData;

            const formData = new URLSearchParams({
                'authentication.userId': HYPERPAY_CONFIG.userId,
                'authentication.password': HYPERPAY_CONFIG.password,
                'authentication.entityId': HYPERPAY_CONFIG.entityId,
                amount: amount.toString(),
                currency: currency,
                paymentType: paymentType,
                merchantTransactionId: merchantTransactionId.toString(),
                'customer.email': customerEmail,
                'customer.givenName': customerName,
                'customer.surname': customerSurname,
                'billing.street1': billingStreet,
                'billing.city': billingCity,
                'billing.state': billingState,
                'billing.country': billingCountry,
                testMode: 'EXTERNAL'
            });

            const response = await axios.post(`${getBaseUrl()}/v1/checkouts`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            console.log('✅ Checkout created successfully:', response.data);
            return {
                success: true,
                data: response.data,
                checkoutId: response.data.id
            };

        } catch (error) {
            console.error('❌ Error creating checkout:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    },

    // Get payment status
    getPaymentStatus: async (resourcePath) => {
        try {
            console.log('🔍 Checking payment status...');
            
            const path = resourcePath + 
                '?authentication.userId=' + HYPERPAY_CONFIG.userId +
                '&authentication.password=' + HYPERPAY_CONFIG.password +
                '&authentication.entityId=' + HYPERPAY_CONFIG.entityId;

            const response = await axios.get(`${getBaseUrl()}${path}`);
            
            console.log('📊 Payment status response:', response.data);
            
            const resultCode = response.data.result?.code;
            const successPattern = /(000\.000\.|000\.100\.1|000\.[36])/;
            const manualPattern = /(000\.400\.0[^3]|000\.400\.100)/;
            
            const isSuccess = successPattern.test(resultCode);
            const isManual = manualPattern.test(resultCode);

            return {
                success: true,
                data: response.data,
                isPaymentSuccessful: isSuccess || isManual,
                resultCode: resultCode,
                message: isSuccess || isManual ? 'Payment is Successful' : 'Payment is Rejected'
            };

        } catch (error) {
            console.error('❌ Error checking payment status:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    },

    // Process webhook
    processWebhook: (webhookData) => {
        try {
            console.log('🔔 Processing webhook...');
            
            const {
                secret = 'C66C535F0D3612EE663F52A8BF7CD2C861F3EB4F225B5DB03FFD0B88A99CEEB9',
                iv = '11E2A46B0D63CE87EB06A6A6',
                authTag = 'A5AAF62871EC9C573BBEC4927151B347',
                httpBody = ''
            } = webhookData;

            // Convert data to process
            const key = Buffer.from(secret, 'hex');
            const ivBuffer = Buffer.from(iv, 'hex');
            const authTagBuffer = Buffer.from(authTag, 'hex');
            const cipherText = Buffer.from(httpBody, 'hex');

            // Prepare decryption
            const decipher = crypto.createDecipheriv('aes-256-gcm', key, ivBuffer);
            decipher.setAuthTag(authTagBuffer);

            // Decrypt
            const result = decipher.update(cipherText) + decipher.final();
            
            console.log('✅ Webhook decrypted successfully:', result);
            
            return {
                success: true,
                data: JSON.parse(result)
            };

        } catch (error) {
            console.error('❌ Error processing webhook:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Get widget URL
    getWidgetUrl: (checkoutId) => {
        return `${getBaseUrl()}/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    },

    // Get configuration
    getConfig: () => {
        return {
            ...HYPERPAY_CONFIG,
            baseUrl: getBaseUrl()
        };
    }
};

// Frontend helper functions
export const hyperpayFrontendHelpers = {
    // Initialize payment widget
    initializeWidget: (checkoutId, options = {}) => {
        const defaultOptions = {
            brands: 'VISA MASTER MADA',
            style: 'card',
            locale: 'en',
            ...options
        };

        return {
            checkoutId,
            widgetUrl: hyperpayEnhancedAPI.getWidgetUrl(checkoutId),
            options: defaultOptions
        };
    },

    // Create payment form HTML
    createPaymentForm: (checkoutId, options = {}) => {
        const config = hyperpayFrontendHelpers.initializeWidget(checkoutId, options);
        
        return `
            <style>
                .wpwl-wrapper-brand { visibility: hidden; }
                .wpwl-label-brand { visibility: hidden; }
            </style>
            
            <script src="${config.widgetUrl}"></script>
            <form action="/payment/status" class="paymentWidgets" data-brands="${config.options.brands}"></form>
        `;
    },

    // Handle payment result
    handlePaymentResult: (resultCode) => {
        const successPattern = /(000\.000\.|000\.100\.1|000\.[36])/;
        const manualPattern = /(000\.400\.0[^3]|000\.400\.100)/;
        
        const isSuccess = successPattern.test(resultCode);
        const isManual = manualPattern.test(resultCode);

        return {
            isSuccessful: isSuccess || isManual,
            isManual: isManual,
            resultCode: resultCode,
            message: isSuccess || isManual ? 'Payment is Successful' : 'Payment is Rejected'
        };
    }
};

export default hyperpayEnhancedAPI;
