// QR Code Service for Frontend
import QRCode from 'qrcode';

class QRCodeService {
  constructor() {
    this.defaultOptions = {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    };
  }

  // Generate QR code for wash order
  async generateWashQR(orderData) {
    try {
      const qrData = {
        type: 'wash_order',
        orderId: orderData.id,
        userId: orderData.userId,
        packageId: orderData.packageId,
        washingPlaceId: orderData.washingPlaceId,
        status: orderData.status,
        createdAt: orderData.createdAt,
        expiresAt: this.calculateExpiryTime(orderData.createdAt)
      };

      const qrString = JSON.stringify(qrData);
      const qrImage = await this.generateQR(qrString);
      
      return {
        success: true,
        data: {
          qrImage,
          qrData,
          qrString
        }
      };
    } catch (error) {
      throw new Error('فشل في إنشاء رمز QR');
    }
  }

  // Generate QR code for payment
  async generatePaymentQR(paymentData) {
    try {
      const qrData = {
        type: 'payment',
        paymentId: paymentData.id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        method: paymentData.method,
        status: paymentData.status,
        createdAt: paymentData.createdAt,
        expiresAt: this.calculateExpiryTime(paymentData.createdAt)
      };

      const qrString = JSON.stringify(qrData);
      const qrImage = await this.generateQR(qrString);
      
      return {
        success: true,
        data: {
          qrImage,
          qrData,
          qrString
        }
      };
    } catch (error) {
      throw new Error('فشل في إنشاء رمز QR للدفع');
    }
  }

  // Generate QR code for user package
  async generatePackageQR(packageData) {
    try {
      const qrData = {
        type: 'user_package',
        packageId: packageData.id,
        userId: packageData.userId,
        packageType: packageData.packageType,
        washesLeft: packageData.washesLeft,
        expiresAt: packageData.expiresAt,
        createdAt: packageData.createdAt
      };

      const qrString = JSON.stringify(qrData);
      const qrImage = await this.generateQR(qrString);
      
      return {
        success: true,
        data: {
          qrImage,
          qrData,
          qrString
        }
      };
    } catch (error) {
      throw new Error('فشل في إنشاء رمز QR للباقة');
    }
  }

  // Generate QR code for branch
  async generateBranchQR(branchData) {
    try {
      const qrData = {
        type: 'branch',
        branchId: branchData.id,
        name: branchData.name,
        address: branchData.address,
        phone: branchData.phone,
        coordinates: {
          latitude: branchData.latitude,
          longitude: branchData.longitude
        },
        isOpen: branchData.isOpen
      };

      const qrString = JSON.stringify(qrData);
      const qrImage = await this.generateQR(qrString);
      
      return {
        success: true,
        data: {
          qrImage,
          qrData,
          qrString
        }
      };
    } catch (error) {
      throw new Error('فشل في إنشاء رمز QR للفرع');
    }
  }

  // Generate generic QR code
  async generateQR(data, options = {}) {
    try {
      const qrOptions = { ...this.defaultOptions, ...options };
      const qrImage = await QRCode.toDataURL(data, qrOptions);
      return qrImage;
    } catch (error) {
      throw new Error('فشل في إنشاء رمز QR');
    }
  }

  // Generate QR code as canvas
  async generateQRCanvas(data, options = {}) {
    try {
      const qrOptions = { ...this.defaultOptions, ...options };
      const canvas = await QRCode.toCanvas(data, qrOptions);
      return canvas;
    } catch (error) {
      throw new Error('فشل في إنشاء رمز QR');
    }
  }

  // Generate QR code as SVG
  async generateQRSVG(data, options = {}) {
    try {
      const qrOptions = { ...this.defaultOptions, ...options };
      const svg = await QRCode.toString(data, { type: 'svg', ...qrOptions });
      return svg;
    } catch (error) {
      throw new Error('فشل في إنشاء رمز QR');
    }
  }

  // Scan QR code from image
  async scanQRFromImage(imageFile) {
    try {
      // This would require a QR code scanning library
      // For now, we'll return a placeholder
      throw new Error('ماسح رمز QR غير متوفر حالياً');
    } catch (error) {
      throw new Error('فشل في قراءة رمز QR');
    }
  }

  // Validate QR data
  validateQRData(qrData) {
    if (!qrData || typeof qrData !== 'object') {
      return false;
    }

    if (!qrData.type) {
      return false;
    }

    // Check if QR code is expired
    if (qrData.expiresAt && new Date(qrData.expiresAt) < new Date()) {
      return false;
    }

    return true;
  }

  // Parse QR string
  parseQRString(qrString) {
    try {
      const qrData = JSON.parse(qrString);
      return this.validateQRData(qrData) ? qrData : null;
    } catch (error) {
      return null;
    }
  }

  // Calculate expiry time (30 minutes from creation)
  calculateExpiryTime(createdAt) {
    const expiryTime = new Date(createdAt);
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);
    return expiryTime.toISOString();
  }

  // Check if QR code is expired
  isQRExpired(qrData) {
    if (!qrData.expiresAt) {
      return false;
    }
    return new Date(qrData.expiresAt) < new Date();
  }

  // Get QR code type text
  getQRTypeText(type) {
    const typeMap = {
      wash_order: 'طلب غسيل',
      payment: 'دفع',
      user_package: 'باقة مستخدم',
      branch: 'فرع'
    };
    
    return typeMap[type] || type;
  }

  // Get QR code status text
  getQRStatusText(status) {
    const statusMap = {
      pending: 'في الانتظار',
      active: 'نشط',
      completed: 'مكتمل',
      expired: 'منتهي الصلاحية',
      cancelled: 'ملغي'
    };
    
    return statusMap[status] || status;
  }

  // Download QR code as image
  async downloadQR(qrImage, filename = 'qr-code.png') {
    try {
      const link = document.createElement('a');
      link.href = qrImage;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw new Error('فشل في تحميل رمز QR');
    }
  }

  // Print QR code
  async printQR(qrImage) {
    try {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>رمز QR</title>
            <style>
              body { 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0; 
              }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <img src="${qrImage}" alt="رمز QR" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } catch (error) {
      throw new Error('فشل في طباعة رمز QR');
    }
  }
}

// Create singleton instance
const qrCodeService = new QRCodeService();

export default qrCodeService; 