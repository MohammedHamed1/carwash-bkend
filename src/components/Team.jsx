import React, { useEffect } from 'react';
import { Linkedin, Mail, Phone, MapPin, Award, Users, Target, Heart } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import AnimatedCard from './common/AnimatedCard';
import '../components/common/styles.css';

const Team = () => {
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "أحمد محمد",
      position: "المدير التنفيذي",
      department: "الإدارة التنفيذية",
      experience: "15+ سنة",
      education: "ماجستير إدارة الأعمال",
      email: "ahmed@paypass.sa",
      phone: "+966 50 123 4567",
      location: "الرياض",
      bio: "قائد استراتيجي مع خبرة 15+ سنة في مجال التكنولوجيا والخدمات. قاد تحول PayPass من فكرة إلى شركة رائدة في مجال غسيل السيارات الذكي.",
      skills: ["القيادة الاستراتيجية", "إدارة الأعمال", "التطوير المؤسسي", "الابتكار"],
      achievements: ["أفضل مدير تنفيذي 2023", "قائد التحول الرقمي", "رائد الأعمال المبتكر"]
    },
    {
      name: "سارة أحمد",
      position: "مدير العمليات",
      department: "العمليات",
      experience: "12+ سنة",
      education: "بكالوريوس إدارة الأعمال",
      email: "sara@paypass.sa",
      phone: "+966 50 234 5678",
      location: "الرياض",
      bio: "خبيرة في إدارة العمليات مع تركيز على تحسين الكفاءة وجودة الخدمة. تقود فريق العمليات لضمان تقديم أفضل تجربة للعملاء.",
      skills: ["إدارة العمليات", "تحسين الجودة", "إدارة المشاريع", "تحليل البيانات"],
      achievements: ["شهادة Six Sigma", "مدير العمليات المتميز", "قائد الجودة"]
    },
    {
      name: "محمد علي",
      position: "مدير التطوير التقني",
      department: "التطوير التقني",
      experience: "10+ سنة",
      education: "بكالوريوس علوم الحاسب",
      email: "mohammed@paypass.sa",
      phone: "+966 50 345 6789",
      location: "الرياض",
      bio: "مطور تقني مبدع مع خبرة في تطوير التطبيقات والأنظمة الذكية. يقود فريق التطوير لإنشاء حلول تقنية مبتكرة.",
      skills: ["تطوير التطبيقات", "الذكاء الاصطناعي", "قواعد البيانات", "الأمن السيبراني"],
      achievements: ["مطور العام 2023", "شهادة AWS", "مخترع نظام الباركود الذكي"]
    },
    {
      name: "فاطمة حسن",
      position: "مدير التسويق",
      department: "التسويق",
      experience: "8+ سنة",
      education: "بكالوريوس التسويق",
      email: "fatima@paypass.sa",
      phone: "+966 50 456 7890",
      location: "الرياض",
      bio: "استراتيجية تسويق مبدعة مع خبرة في بناء العلامات التجارية والتسويق الرقمي. تقود جهود التسويق لتعزيز حضور PayPass.",
      skills: ["التسويق الرقمي", "إدارة العلامات التجارية", "تحليل السوق", "التواصل"],
      achievements: ["أفضل استراتيجية تسويق 2023", "شهادة Google Ads", "قائد العلامة التجارية"]
    },
    {
      name: "علي محمود",
      position: "مدير الموارد البشرية",
      department: "الموارد البشرية",
      experience: "9+ سنة",
      education: "بكالوريوس إدارة الموارد البشرية",
      email: "ali@paypass.sa",
      phone: "+966 50 567 8901",
      location: "الرياض",
      bio: "خبير في إدارة الموارد البشرية مع تركيز على تطوير المواهب وبناء ثقافة عمل إيجابية. يقود جهود تطوير فريق العمل.",
      skills: ["إدارة المواهب", "تطوير القيادة", "ثقافة المؤسسة", "التوظيف"],
      achievements: ["أفضل مدير موارد بشرية", "شهادة SHRM", "قائد تطوير المواهب"]
    },
    {
      name: "نور الدين",
      position: "مدير المالية",
      department: "المالية",
      experience: "11+ سنة",
      education: "بكالوريوس المحاسبة",
      email: "nour@paypass.sa",
      phone: "+966 50 678 9012",
      location: "الرياض",
      bio: "محلل مالي استراتيجي مع خبرة في إدارة المالية المؤسسية والتخطيط المالي. يقود جهود النمو المالي المستدام.",
      skills: ["التحليل المالي", "التخطيط المالي", "إدارة المخاطر", "الاستثمار"],
      achievements: ["أفضل مدير مالي 2023", "شهادة CFA", "قائد النمو المالي"]
    }
  ];

  const departments = [
    {
      name: "الإدارة التنفيذية",
      members: 1,
      description: "قيادة استراتيجية للشركة وتطوير الرؤية المستقبلية"
    },
    {
      name: "العمليات",
      members: 1,
      description: "إدارة العمليات اليومية وضمان جودة الخدمة"
    },
    {
      name: "التطوير التقني",
      members: 1,
      description: "تطوير التطبيقات والأنظمة التقنية المبتكرة"
    },
    {
      name: "التسويق",
      members: 1,
      description: "بناء العلامة التجارية والتسويق الرقمي"
    },
    {
      name: "الموارد البشرية",
      members: 1,
      description: "إدارة المواهب وتطوير فريق العمل"
    },
    {
      name: "المالية",
      members: 1,
      description: "إدارة الشؤون المالية والتخطيط المالي"
    }
  ];

  return (
    <>
      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50" dir="rtl">
        <PageHeader
          title="فريق العمل"
          subtitle="فريق متخصص من الخبراء والمحترفين يعملون بجد لتقديم أفضل الخدمات لعملائنا"
          breadcrumbs={['الرئيسية', 'فريق العمل']}
        />

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">{teamMembers.length}</div>
            <div className="text-gray-600">عضو في الفريق</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">15+</div>
            <div className="text-gray-600">جائزة محققة</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">100+</div>
            <div className="text-gray-600">مشروع مكتمل</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-4" />
                            <div className="text-3xl font-bold text-gray-800 mb-2">+10K</div>
            <div className="text-gray-600">عميل راضي</div>
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">الأقسام</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                <p className="text-gray-600 mb-3">{dept.description}</p>
                <div className="text-sm text-gray-500">{dept.members} عضو</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Member Info */}
                <div className="lg:col-span-1">
                  <div className="text-center lg:text-right">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center text-white text-4xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-green-600 font-bold mb-1">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.department}</p>
                    
                    {/* Contact Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-green-500">
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${member.phone}`} className="text-gray-600 hover:text-green-500" dir="ltr">
                          {member.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{member.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Details */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <h4 className="text-lg font-bold mb-2">نبذة</h4>
                      <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                    </div>

                    {/* Experience & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-bold mb-2">الخبرة</h4>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="font-bold text-green-700">{member.experience}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">التعليم</h4>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-bold text-blue-700">{member.education}</div>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-lg font-bold mb-2">المهارات</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-bold mb-2">الإنجازات</h4>
                      <div className="space-y-2">
                        {member.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-gray-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">انضم إلى فريقنا</h2>
          <p className="text-white font-bold mb-6">
            نحن نبحث دائماً عن المواهب المبدعة والمتحمسة للانضمام إلى فريقنا
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/careers"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              الوظائف الشاغرة
            </a>
            <a
              href="/contact"
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800 transition"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Team; 