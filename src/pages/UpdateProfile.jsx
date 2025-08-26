import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { User, Mail, Phone, Save, ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Notification from '../components/common/Notification';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });



    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationData, setNotificationData] = useState({});

    // Initialize form data when component mounts
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });


        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};

        // Basic validations
        if (!formData.username.trim()) {
            newErrors.username = 'اسم المستخدم مطلوب';
        } else if (formData.username.length < 3) {
            newErrors.username = 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'البريد الإلكتروني غير صحيح';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'رقم الهاتف مطلوب';
        } else if (!/^\+966\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'رقم الهاتف يجب أن يكون بالصيغة الصحيحة (+966xxxxxxxxx)';
        }

        // Password validations (only if user wants to change password)
        if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = 'كلمة المرور الحالية مطلوبة لتغيير كلمة المرور';
            }

            if (!formData.newPassword) {
                newErrors.newPassword = 'كلمة المرور الجديدة مطلوبة';
            } else if (formData.newPassword.length < 6) {
                newErrors.newPassword = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
            } else if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };



    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Show notification helper
    const displayNotification = (type, title, message) => {
        setNotificationData({ type, title, message });
        setShowNotification(true);
    };

    const showSuccessNotification = (message) => {
        displayNotification('success', 'تم بنجاح', message);
    };

    const showErrorNotification = (message) => {
        displayNotification('error', 'خطأ', message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');

        try {
            // Prepare update data
            const updateData = {
                username: formData.username.trim(),
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim()
            };

            // Add password data only if user wants to change password
            if (formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            // Call API to update user
            const response = await fetch('http://localhost:5000/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('frontend_token')}`
                },
                body: JSON.stringify(updateData)
            });

            const data = await response.json();
            console.log('data profile', data)
            if (response.ok) {
                setSuccessMessage('تم تحديث البيانات بنجاح');

                // Show success toaster notification
                showSuccessNotification('تم تحديث البيانات بنجاح');

                // Update local user data
                if (updateUser) {
                    updateUser(data);
                }

                // Clear password fields
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));

                // Show success message and redirect after 3 seconds to allow toaster to be seen
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
            } else {
                const errorMessage = data.message || 'حدث خطأ في تحديث البيانات';
                setErrors({ submit: errorMessage });
                showErrorNotification(errorMessage);
            }
        } catch (error) {
            console.error('Update error:', error);
            const errorMessage = 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.';
            setErrors({ submit: errorMessage });
            showErrorNotification(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Success Message - Hidden since we now use toaster */}
                        {/* {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <Save className="w-4 h-4 text-green-600" />
                                    </div>
                                    <p className="text-green-800 font-semibold">{successMessage}</p>
                                </div>
                            </motion.div>
                        )} */}

                        {/* Error Message */}
                        {errors.submit && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
                            >
                                <p className="text-red-800 font-semibold">{errors.submit}</p>
                            </motion.div>
                        )}

                        {/* Personal Information Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                                    <User className="w-4 h-4 text-green-600" />
                                </div>
                                المعلومات الشخصية
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        اسم المستخدم
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        placeholder="أدخل اسم المستخدم"
                                    />
                                    {errors.username && (
                                        <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                                    )}
                                </div>

                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        الاسم الكامل
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        placeholder="أدخل الاسم الكامل"
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        البريد الإلكتروني
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 pl-12 border rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            placeholder="أدخل البريد الإلكتروني"
                                        />
                                        <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        رقم الهاتف
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 pl-12 border rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            placeholder="+966501234567"
                                        />
                                        <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                    {errors.phone && (
                                        <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>



                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>جاري الحفظ...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-3">
                                        <Save className="w-5 h-5" />
                                        <span>حفظ التغييرات</span>
                                    </div>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-2xl transition-all duration-300"
                            >
                                إلغاء
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Toaster Notification */}
            {showNotification && (
                <Notification
                    type={notificationData.type}
                    title={notificationData.title}
                    message={notificationData.message}
                    onClose={() => setShowNotification(false)}
                    position="top-right"
                    duration={4000}
                />
            )}
        </>
    );
};

export default UpdateProfile;
