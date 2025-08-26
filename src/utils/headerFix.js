/**
 * حل مشكلة الهيدر الثابت بشكل ديناميكي
 * يضيف padding-top تلقائياً للمحتوى ليتجنب الهيدر
 */

class HeaderFix {
  constructor() {
    this.header = null;
    this.headerHeight = 0;
    this.init();
  }

  init() {
    // انتظار تحميل DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // البحث عن الهيدر
    this.header = document.querySelector('header');
    
    if (!this.header) {
      console.warn('Header not found');
      return;
    }

    // حساب ارتفاع الهيدر
    this.calculateHeaderHeight();
    
    // تطبيق الحل
    this.applyFix();
    
    // مراقبة تغييرات الحجم
    window.addEventListener('resize', () => {
      this.calculateHeaderHeight();
      this.applyFix();
    });

    // مراقبة تغييرات DOM (للتطبيقات SPA)
    this.observeDOMChanges();
  }

  calculateHeaderHeight() {
    if (this.header) {
      this.headerHeight = this.header.offsetHeight;
    }
  }

  applyFix() {
    // تطبيق padding-top لجميع العناصر التي تحتوي على min-h-screen
    const minHeightElements = document.querySelectorAll('.min-h-screen');
    
    minHeightElements.forEach(element => {
      // تجنب إضافة padding إذا كان موجود بالفعل
      if (!element.style.paddingTop || element.style.paddingTop === '0px') {
        element.style.paddingTop = `${this.headerHeight}px`;
      }
    });

    // تطبيق scroll-margin-top للعناصر التي تحتوي على id
    const elementsWithId = document.querySelectorAll('[id]');
    
    elementsWithId.forEach(element => {
      element.style.scrollMarginTop = `${this.headerHeight}px`;
    });
  }

  observeDOMChanges() {
    // مراقبة تغييرات DOM للتطبيقات SPA
    const observer = new MutationObserver((mutations) => {
      let shouldApplyFix = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList && node.classList.contains('min-h-screen')) {
              shouldApplyFix = true;
            }
          });
        }
      });
      
      if (shouldApplyFix) {
        // تأخير قليل للتأكد من اكتمال التحديث
        setTimeout(() => this.applyFix(), 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // دالة مساعدة لإضافة padding يدوياً
  static addPaddingToElement(element, padding = null) {
    if (!element) return;
    
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 64; // fallback
    const paddingValue = padding || headerHeight;
    
    element.style.paddingTop = `${paddingValue}px`;
  }

  // دالة مساعدة لإزالة padding
  static removePaddingFromElement(element) {
    if (!element) return;
    element.style.paddingTop = '0px';
  }
}

// إنشاء instance تلقائياً
const headerFix = new HeaderFix();

// تصدير للاستخدام في المكونات
export default headerFix;
export { HeaderFix }; 