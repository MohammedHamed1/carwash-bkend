import React, { useEffect } from 'react';
import { FileText, AlertTriangle, CheckCircle, Users, Shield, Calendar } from 'lucide-react';

const Terms = () => {
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 1,
      title: "قبول الشروط",
      icon: <CheckCircle className="h-6 w-6" />,
      content: `باستخدام خدمات PayPass، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.`
    },
    {
      id: 2,
      title: "وصف الخدمة",
      icon: <FileText className="h-6 w-6" />,
      content: `PayPass هي خدمة غسيل سيارات ذكية توفر:
• حجز باقات غسيل السيارات
• نظام باركود ذكي للوصول للخدمة
• تطبيق موبايل لإدارة الحساب
• خدمات غسيل في فروع متعددة
• خدمة عملاء`
    },
    {
      id: 3,
      title: "إنشاء الحساب",
      icon: <Users className="h-6 w-6" />,
      content: `للاستفادة من خدماتنا، يجب عليك:
• إنشاء حساب صحيح ودقيق
• توفير معلومات شخصية صحيحة
• الحفاظ على سرية بيانات الحساب
• إخطارنا فوراً بأي استخدام غير مصرح به
• أن تكون عمرك 18 عاماً أو أكثر

نحتفظ بالحق في رفض أو إلغاء أي حساب يخالف هذه الشروط.`
    },
    {
      id: 4,
      title: "استخدام الخدمة",
      icon: <Shield className="h-6 w-6" />,
      content: `يجب استخدام خدماتنا بطريقة قانونية وأخلاقية:

يُحظر:
• استخدام الخدمة لأغراض غير قانونية
• محاولة اختراق أنظمتنا
• إساءة استخدام الباركود أو مشاركته
• إلحاق الضرر بالمرافق أو المعدات
• إزعاج العملاء الآخرين أو الموظفين
• استخدام معلومات مزيفة أو مسروقة

يُسمح:
• استخدام الخدمة لغسيل سيارتك الشخصية
• مشاركة الباركود مع أفراد عائلتك
• التواصل مع خدمة العملاء للحصول على المساعدة
• تقديم ملاحظات وتقييمات بناءة`
    },
    {
      id: 5,
      title: "الدفع والفوترة",
      icon: <FileText className="h-6 w-6" />,
      content: `شروط الدفع:
• جميع الأسعار بالريال السعودي وتشمل الضريبة
• الدفع مقدم قبل استخدام الخدمة
• نقبل بطاقات الائتمان و Apple Pay
• الباركود صالح لمدة شهر من تاريخ الشراء
• لا يمكن استرداد المبلغ بعد استخدام الباركود
• الأسعار قابلة للتغيير مع إشعار مسبق

في حالة فشل الدفع:
• لن يتم إنشاء الباركود
• يمكن إعادة المحاولة
• قد يتم حظر الحساب في حالة تكرار الفشل`
    },
    {
      id: 6,
      title: "الباركود والاستخدام",
      icon: <CheckCircle className="h-6 w-6" />,
      content: `قواعد استخدام الباركود:
• الباركود صالح لاستخدام واحد فقط
• يجب استخدامه في غضون شهر من الشراء
• يمكن استخدامه في أي فرع من فروعنا
• لا يمكن استرداده أو تحويله لشخص آخر
• في حالة فقدان الباركود، لا يمكن استبداله
• الباركود غير قابل للبيع أو التداول

مسؤولياتك:
• الحفاظ على الباركود آمناً
• عدم مشاركته مع الغرباء
• استخدامه في الوقت المحدد
• اتباع التعليمات في الفرع`
    },
    {
      id: 7,
      title: "جودة الخدمة",
      icon: <Shield className="h-6 w-6" />,
      content: `نلتزم بتقديم خدمة عالية الجودة:
• استخدام مواد تنظيف عالية الجودة
• تدريب الموظفين بشكل مستمر
• صيانة المعدات بانتظام
• مراقبة جودة الخدمة

في حالة عدم الرضا:
• يمكن تقديم شكوى في أي وقت
• سنقوم بالتحقيق في الشكوى
• قد نقدم غسلة مجانية كتعويض
• نحتفظ بالحق في رفض التعويض في حالات معينة

لا نضمن:
• إزالة جميع البقع العنيدة
• إصلاح الأضرار الموجودة مسبقاً
• جودة الطلاء أو المواد الأصلية`
    },
    {
      id: 8,
      title: "المسؤولية والضمان",
      icon: <AlertTriangle className="h-6 w-6" />,
      content: `حدود المسؤولية:
• لا نتحمل مسؤولية الأضرار الموجودة مسبقاً
• لا نضمن إزالة جميع أنواع البقع
• لا نتحمل مسؤولية فقدان الممتلكات الشخصية
• لا نتحمل مسؤولية التأخير في الخدمة

مسؤوليتنا:
• تقديم خدمة غسيل احترافية
• الحفاظ على سلامة السيارة
• استخدام مواد آمنة وغير ضارة
• التعويض عن الأضرار الناتجة عن إهمالنا

مسؤوليتك:
• إزالة الممتلكات الشخصية من السيارة
• إخبارنا بأي أضرار موجودة مسبقاً
• اتباع التعليمات والإرشادات
• عدم ترك السيارة بدون مراقبة لفترة طويلة`
    },
    {
      id: 9,
      title: "الخصوصية والأمان",
      icon: <Shield className="h-6 w-6" />,
      content: `نلتزم بحماية خصوصيتك:
• جمع واستخدام البيانات حسب سياسة الخصوصية
• تشفير البيانات الشخصية
• عدم مشاركة البيانات مع أطراف ثالثة
• حذف البيانات عند الطلب

الأمان:
• مراقبة مستمرة للمرافق
• كاميرات مراقبة في جميع الفروع
• موظفين مدربين على الأمان
• إجراءات طوارئ واضحة

في حالة الحوادث:
• سنقوم بتوثيق الحادث
• سنتواصل معك فوراً
• سنتعاون مع السلطات المختصة
• سنقدم تقرير مفصل`
    },
    {
      id: 10,
      title: "إيقاف الخدمة",
      icon: <AlertTriangle className="h-6 w-6" />,
      content: `قد نوقف الخدمة في الحالات التالية:
• انتهاك الشروط والأحكام
• استخدام غير مصرح به
• سلوك غير لائق أو إزعاج
• عدم الدفع أو محاولة الاحتيال
• أسباب أمنية أو قانونية

إجراءات الإيقاف:
• إشعار مسبق عند الإمكان
• إيقاف فوري في حالات خطيرة
• عدم استرداد المبالغ المدفوعة
• حظر الوصول للخدمات المستقبلية

إعادة التفعيل:
• قد نسمح بإعادة التفعيل بعد فترة
• يتطلب مراجعة وتقييم
• قد يتطلب ضمانات إضافية
• لا نضمن إعادة التفعيل`
    },
    {
      id: 11,
      title: "التغييرات على الشروط",
      icon: <Calendar className="h-6 w-6" />,
      content: `نحتفظ بالحق في تحديث هذه الشروط:
• سنخطرك بالتغييرات الجوهرية
• التحديثات سارية من تاريخ النشر
• استمرارك في الاستخدام يعني الموافقة
• يمكنك إلغاء الحساب إذا لم توافق

إشعارات التغييرات:
• إشعار في التطبيق
• بريد إلكتروني
• إشعار على موقعنا الإلكتروني
• إشعار في الفروع

تاريخ آخر تحديث: 15 يناير 2024`
    },
    {
      id: 12,
      title: "التواصل معنا",
      icon: <Users className="h-6 w-6" />,
      content: `للاستفسارات حول هذه الشروط:

البريد الإلكتروني: legal@paypass.sa
الهاتف: <span dir="ltr">920000000</span>
العنوان: الرياض، المملكة العربية السعودية

ساعات العمل: الأحد - الخميس، 8 ص - 6 م

سنرد عليك في غضون 5 أيام عمل من استلام استفسارك.`
    }
  ];

  const lastUpdated = "15 يناير 2024";

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8" dir="rtl">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">الشروط والأحكام</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            يرجى قراءة هذه الشروط بعناية قبل استخدام خدمات PayPass
          </p>
          <div className="mt-4 text-sm text-gray-500">
            آخر تحديث: {lastUpdated}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-800 mb-2">تنبيه مهم</h3>
              <p className="text-yellow-700">
                باستخدام خدمات PayPass، فإنك توافق على جميع الشروط والأحكام المذكورة أدناه. 
                إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-green-500" />
            ملخص سريع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-bold mb-1">استخدام قانوني</h3>
              <p className="text-sm text-gray-600">استخدم الخدمة للأغراض المشروعة فقط</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold mb-1">حماية البيانات</h3>
              <p className="text-sm text-gray-600">نحمي بياناتك الشخصية</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-bold mb-1">حساب آمن</h3>
              <p className="text-sm text-gray-600">حافظ على سرية بيانات حسابك</p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Key Points */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">النقاط الرئيسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">الالتزام بالقوانين</h3>
              <p className="text-green-100">يجب استخدام خدماتنا وفقاً للقوانين والأنظمة المعمول بها</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">حماية الخصوصية</h3>
              <p className="text-green-100">نلتزم بحماية خصوصية بياناتك وعدم مشاركتها مع أطراف ثالثة</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">جودة الخدمة</h3>
              <p className="text-green-100">نلتزم بتقديم خدمة عالية الجودة مع ضمانات محدودة</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">التواصل</h3>
              <p className="text-green-100">نرحب بتواصلكم للاستفسارات والشكاوى</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">هل لديك أسئلة؟</h2>
          <p className="text-gray-600 mb-6">
            إذا كان لديك أي استفسارات حول الشروط والأحكام، لا تتردد في التواصل معنا
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@paypass.sa"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              راسلنا عبر البريد الإلكتروني
            </a>
            <a
              href="tel:920000000"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold transition"
            >
              اتصل بنا
            </a>
          </div>
        </div>

        {/* Acceptance */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-yellow-800">تأكيد الموافقة</h2>
          <p className="text-yellow-700 mb-6">
            باستخدام خدمات PayPass، فإنك تؤكد أنك قد قرأت وفهمت ووافقت على جميع الشروط والأحكام المذكورة أعلاه.
          </p>
          <div className="flex items-center justify-center gap-2 text-yellow-800">
            <CheckCircle className="h-5 w-5" />
            <span className="font-bold">أوافق على الشروط والأحكام</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 