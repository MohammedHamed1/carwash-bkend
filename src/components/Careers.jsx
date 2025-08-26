import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Search, Send, Users, Award, Heart, Target } from 'lucide-react';

const Careers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'جميع الوظائف', count: 0 },
    { id: 'tech', name: 'التطوير التقني', count: 0 },
    { id: 'marketing', name: 'التسويق', count: 0 },
    { id: 'operations', name: 'العمليات', count: 0 },
    { id: 'hr', name: 'الموارد البشرية', count: 0 },
    { id: 'finance', name: 'المالية', count: 0 }
  ];

  const jobs = [
    {
      id: 1,
      title: "مطور تطبيقات موبايل",
      category: "tech",
      location: "الرياض",
      type: "دوام كامل",
      experience: "3-5 سنوات",
      salary: "15,000 - 25,000 ريال",
      department: "التطوير التقني",
      description: "نبحث عن مطور تطبيقات موبايل موهوب للانضمام إلى فريق التطوير التقني لدينا.",
      requirements: [
        "خبرة 3-5 سنوات في تطوير تطبيقات iOS و Android",
        "إتقان React Native أو Flutter",
        "خبرة في APIs و RESTful services",
        "مهارات قوية في حل المشاكل",
        "القدرة على العمل في فريق متعدد التخصصات"
      ],
      responsibilities: [
        "تطوير تطبيقات موبايل عالية الجودة",
        "العمل مع فريق التصميم لتحسين تجربة المستخدم",
        "كتابة كود نظيف وقابل للصيانة",
        "إجراء اختبارات وضمان الجودة",
        "المساهمة في تحسين العمليات التقنية"
      ],
      benefits: [
        "راتب تنافسي",
        "تأمين صحي شامل",
        "إجازة سنوية مدفوعة",
        "فرص التطوير المهني",
        "بيئة عمل مرنة"
      ]
    },
    {
      id: 2,
      title: "مدير تسويق رقمي",
      category: "marketing",
      location: "الرياض",
      type: "دوام كامل",
      experience: "5-7 سنوات",
      salary: "20,000 - 30,000 ريال",
      department: "التسويق",
      description: "نبحث عن مدير تسويق رقمي مبدع لقيادة استراتيجيات التسويق الرقمي لدينا.",
      requirements: [
        "خبرة 5-7 سنوات في التسويق الرقمي",
        "إتقان منصات التسويق الرقمي المختلفة",
        "خبرة في إدارة الميزانيات وتحليل النتائج",
        "مهارات قوية في التحليل والتفكير الاستراتيجي",
        "خبرة في إدارة الفرق"
      ],
      responsibilities: [
        "تطوير وتنفيذ استراتيجيات التسويق الرقمي",
        "إدارة الحملات الإعلانية عبر المنصات المختلفة",
        "تحليل الأداء وتحسين النتائج",
        "إدارة فريق التسويق الرقمي",
        "التعاون مع الأقسام الأخرى لتحقيق الأهداف"
      ],
      benefits: [
        "راتب تنافسي",
        "مكافآت الأداء",
        "تأمين صحي شامل",
        "إجازة سنوية مدفوعة",
        "فرص التطوير المهني"
      ]
    },
    {
      id: 3,
      title: "مدير عمليات",
      category: "operations",
      location: "الرياض",
      type: "دوام كامل",
      experience: "7-10 سنوات",
      salary: "25,000 - 35,000 ريال",
      department: "العمليات",
      description: "نبحث عن مدير عمليات متمرس لتحسين كفاءة العمليات وضمان جودة الخدمة.",
      requirements: [
        "خبرة 7-10 سنوات في إدارة العمليات",
        "خبرة في تحسين العمليات وإدارة الجودة",
        "مهارات قوية في القيادة وإدارة الفرق",
        "خبرة في تحليل البيانات واتخاذ القرارات",
        "إتقان أدوات إدارة المشاريع"
      ],
      responsibilities: [
        "إدارة العمليات اليومية لجميع الفروع",
        "تحسين كفاءة العمليات وتقليل التكاليف",
        "ضمان جودة الخدمة ورضا العملاء",
        "إدارة فريق العمليات",
        "تطوير وتنفيذ استراتيجيات تحسين العمليات"
      ],
      benefits: [
        "راتب تنافسي",
        "مكافآت الأداء",
        "تأمين صحي شامل",
        "إجازة سنوية مدفوعة",
        "فرص التطوير المهني"
      ]
    },
    {
      id: 4,
      title: "محلل مالي",
      category: "finance",
      location: "الرياض",
      type: "دوام كامل",
      experience: "3-5 سنوات",
      salary: "12,000 - 18,000 ريال",
      department: "المالية",
      description: "نبحث عن محلل مالي موهوب للمساهمة في التحليل المالي والتخطيط الاستراتيجي.",
      requirements: [
        "خبرة 3-5 سنوات في التحليل المالي",
        "إتقان Excel وبرامج التحليل المالي",
        "خبرة في إعداد التقارير المالية",
        "مهارات قوية في التحليل والتفكير النقدي",
        "خبرة في التخطيط المالي والموازنات"
      ],
      responsibilities: [
        "إعداد التحليلات والتقارير المالية",
        "تحليل الأداء المالي وتقديم التوصيات",
        "المساهمة في التخطيط المالي والموازنات",
        "مراقبة المؤشرات المالية الرئيسية",
        "العمل مع الإدارة العليا في القرارات المالية"
      ],
      benefits: [
        "راتب تنافسي",
        "تأمين صحي شامل",
        "إجازة سنوية مدفوعة",
        "فرص التطوير المهني",
        "بيئة عمل مرنة"
      ]
    },
    {
      id: 5,
      title: "متخصص موارد بشرية",
      category: "hr",
      location: "الرياض",
      type: "دوام كامل",
      experience: "2-4 سنوات",
      salary: "8,000 - 12,000 ريال",
      department: "الموارد البشرية",
      description: "نبحث عن متخصص موارد بشرية موهوب للمساهمة في تطوير فريق العمل.",
      requirements: [
        "خبرة 2-4 سنوات في الموارد البشرية",
        "خبرة في التوظيف وإدارة المواهب",
        "مهارات قوية في التواصل والتعامل مع الناس",
        "خبرة في تطوير السياسات والإجراءات",
        "إتقان أنظمة الموارد البشرية"
      ],
      responsibilities: [
        "إدارة عمليات التوظيف والاختيار",
        "تطوير وتنفيذ برامج تطوير المواهب",
        "إدارة علاقات الموظفين",
        "تطوير سياسات وإجراءات الموارد البشرية",
        "المساهمة في بناء ثقافة عمل إيجابية"
      ],
      benefits: [
        "راتب تنافسي",
        "تأمين صحي شامل",
        "إجازة سنوية مدفوعة",
        "فرص التطوير المهني",
        "بيئة عمل مرنة"
      ]
    }
  ];

  // حساب عدد الوظائف في كل فئة
  categories.forEach(category => {
    if (category.id === 'all') {
      category.count = jobs.length;
    } else {
      category.count = jobs.filter(job => job.category === category.id).length;
    }
  });

  // فلترة الوظائف
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.includes(searchTerm) || job.description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Header with Image */}
      <div className="relative h-96 bg-gradient-to-br from-green-500 to-green-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/90 to-green-600/90"></div>
        
        {/* Icon */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">انضم إلى فريقنا</h1>
          <p className="text-xl md:text-2xl mb-2 font-bold text-white">اكتشف الفرص الوظيفية المثيرة في PayPass</p>
          <p className="text-lg font-bold text-white max-w-2xl">
            انضم إلى فريق من المحترفين الذين يعملون على تطوير مستقبل غسيل السيارات الذكي
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        {/* Why Work With Us */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">لماذا تعمل معنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">فرص التطوير</h3>
              <p className="text-gray-600">نوفر فرص التطوير المهني والتعلم المستمر</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">فريق متميز</h3>
              <p className="text-gray-600">تعمل مع فريق من المحترفين والخبراء</p>
            </div>
            <div className="text-center">
              <Briefcase className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">مزايا تنافسية</h3>
              <p className="text-gray-600">رواتب تنافسية ومزايا شاملة</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث في الوظائف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Jobs List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">الوظائف المتاحة</h3>
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 border rounded-lg cursor-pointer transition ${
                      selectedJob?.id === job.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-bold text-gray-800 mb-2">{job.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:col-span-2">
            {selectedJob ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{selectedJob.title}</h2>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {selectedJob.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      {selectedJob.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      {selectedJob.salary}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      {selectedJob.department}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">الوصف</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">المتطلبات</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">المسؤوليات</h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">المزايا</h3>
                    <ul className="space-y-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                      <Send className="h-5 w-5" />
                      تقدم للوظيفة
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">اختر وظيفة لعرض التفاصيل</p>
              </div>
            )}
          </div>
        </div>

        {/* Application Process */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">كيفية التقديم</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">اختر الوظيفة</h3>
              <p className="text-gray-600 text-sm">تصفح الوظائف المتاحة واختر المناسبة لك</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">أرسل السيرة الذاتية</h3>
              <p className="text-gray-600 text-sm">أرسل سيرتك الذاتية وخطاب التقديم</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">مقابلة أولية</h3>
              <p className="text-gray-600 text-sm">سنقوم بمراجعة طلبك وإجراء مقابلة أولية</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">الانضمام للفريق</h3>
              <p className="text-gray-600 text-sm">بعد الموافقة، انضم إلى فريقنا المتميز</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">لا تجد الوظيفة المناسبة؟</h2>
          <p className="text-white font-bold mb-6">
            أرسل لنا سيرتك الذاتية وسنتواصل معك عند توفر فرص مناسبة
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            أرسل السيرة الذاتية
          </button>
        </div>
      </div>
    </div>
  );
};

export default Careers; 