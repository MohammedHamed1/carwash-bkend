import React from 'react';
import { Calendar, Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "كيف تحافظ على لمعان سيارتك لفترة أطول",
      excerpt: "تعرف على أفضل الطرق للحفاظ على لمعان سيارتك وحمايتها من العوامل الخارجية الضارة...",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "أحمد محمد",
      date: "15 مارس 2024",
      readTime: "5 دقائق",
      category: "العناية بالسيارة",
      tags: ["تلميع", "حماية", "صيانة"]
    },
    {
      id: 2,
      title: "أفضل أوقات غسيل السيارة خلال اليوم",
      excerpt: "اكتشف الأوقات المثالية لغسيل سيارتك لتجنب الأضرار وتحقيق أفضل النتائج...",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "سارة أحمد",
      date: "12 مارس 2024",
      readTime: "3 دقائق",
      category: "نصائح",
      tags: ["توقيت", "نصائح", "فعالية"]
    },
    {
      id: 3,
      title: "الفرق بين غسيل السيارة اليدوي والآلي",
      excerpt: "مقارنة شاملة بين طرق غسيل السيارات المختلفة ومزايا وعيوب كل طريقة...",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "محمد علي",
      date: "10 مارس 2024",
      readTime: "7 دقائق",
      category: "تقنيات الغسيل",
      tags: ["مقارنة", "تقنيات", "جودة"]
    },
    {
      id: 4,
      title: "كيف تختار أفضل معطر للسيارة",
      excerpt: "دليل شامل لاختيار المعطر المناسب لسيارتك مع التركيز على الصحة والراحة...",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "فاطمة حسن",
      date: "8 مارس 2024",
      readTime: "4 دقائق",
      category: "العناية بالسيارة",
      tags: ["معطر", "رائحة", "صحة"]
    },
    {
      id: 5,
      title: "أهمية تنظيف محرك السيارة بانتظام",
      excerpt: "تعرف على أهمية تنظيف محرك السيارة وكيف يؤثر على الأداء والعمر الافتراضي...",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "علي أحمد",
      date: "5 مارس 2024",
      readTime: "6 دقائق",
      category: "صيانة المحرك",
      tags: ["محرك", "صيانة", "أداء"]
    },
    {
      id: 6,
      title: "نصائح للحفاظ على الإطارات في حالة ممتازة",
      excerpt: "إرشادات مهمة للحفاظ على إطارات سيارتك وتجنب المشاكل الشائعة...",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "خالد محمد",
      date: "3 مارس 2024",
      readTime: "5 دقائق",
      category: "صيانة الإطارات",
      tags: ["إطارات", "سلامة", "صيانة"]
    }
  ];

  const categories = [
    "جميع المقالات",
    "العناية بالسيارة",
    "نصائح",
    "تقنيات الغسيل",
    "صيانة المحرك",
    "صيانة الإطارات"
  ];

  const popularTags = [
    "تلميع", "حماية", "صيانة", "نصائح", "تقنيات", "جودة", "معطر", "رائحة", "صحة", "محرك", "أداء", "إطارات", "سلامة"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#232b33] to-[#151a22] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="PayPass Logo" className="h-20 w-20 object-contain drop-shadow-lg brightness-0 invert" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">المدونة</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            اكتشف أحدث النصائح والمعلومات حول العناية بسيارتك
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">التصنيفات</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className={`block py-2 px-3 rounded-lg transition ${
                        index === 0 
                          ? 'bg-green-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">العلامات الشائعة</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="bg-gray-100 hover:bg-green-500 hover:text-white text-gray-700 px-3 py-1 rounded-full text-sm transition"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 ml-1" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 ml-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <User className="h-4 w-4 ml-1" />
                    {blogPosts[0].author}
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition">
                    اقرأ المزيد
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.slice(1).map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 ml-1" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <User className="h-4 w-4 ml-1" />
                        {post.author}
                      </div>
                      <button className="text-green-500 hover:text-green-600 font-medium transition">
                        اقرأ المزيد
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border transition">
                  <ArrowRight className="h-4 w-4" />
                  السابق
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">1</button>
                <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border transition">2</button>
                <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border transition">3</button>
                <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border transition">
                  التالي
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 