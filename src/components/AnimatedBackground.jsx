import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let stars = [];
    let meteors = [];

    // تعيين حجم الكانفاس
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // إنشاء الجزيئات
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `hsl(${Math.random() * 60 + 120}, 70%, 60%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // إنشاء النجوم
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.angle = 0;
      }

      update() {
        this.angle += this.twinkleSpeed;
        this.opacity = 0.2 + Math.sin(this.angle) * 0.6;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // إنشاء الشهب
    class Meteor {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.angle = Math.PI / 4;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
      }

      draw() {
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
        ctx.stroke();
        ctx.restore();
      }

      isOffScreen() {
        return this.x > canvas.width + this.length || this.y > canvas.height + this.length;
      }
    }

    // إنشاء العناصر
    const createElements = () => {
      // إنشاء الجزيئات
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }

      // إنشاء النجوم
      for (let i = 0; i < 100; i++) {
        stars.push(new Star());
      }
    };

    // رسم الموجات
    const drawWaves = () => {
      const time = Date.now() * 0.001;
      
      // موجة علوية
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.1);
      
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = canvas.height * 0.1 + Math.sin(x * 0.01 + time) * 15;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // موجة سفلية
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.9);
      
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = canvas.height * 0.9 + Math.sin(x * 0.015 + time * 1.5) * 10;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // رسم الكواكب
    const drawPlanets = () => {
      const time = Date.now() * 0.0005;
      
      // كوكب أول
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(
        canvas.width * 0.2 + Math.sin(time) * 20,
        canvas.height * 0.3 + Math.cos(time) * 10,
        40,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();

      // كوكب ثاني
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(
        canvas.width * 0.8 + Math.cos(time * 1.5) * 15,
        canvas.height * 0.7 + Math.sin(time * 1.5) * 8,
        30,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    };

    // حلقة الرسم الرئيسية
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // رسم الخلفية المتدرجة
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e293b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // رسم الموجات
      drawWaves();

      // رسم الكواكب
      drawPlanets();

      // تحديث ورسم الجزيئات
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // تحديث ورسم النجوم
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // إنشاء شهب جديدة
      if (Math.random() < 0.02) {
        meteors.push(new Meteor());
      }

      // تحديث ورسم الشهب
      meteors.forEach((meteor, index) => {
        meteor.update();
        meteor.draw();
        
        if (meteor.isOffScreen()) {
          meteors.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    createElements();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
    />
  );
};

export default AnimatedBackground; 