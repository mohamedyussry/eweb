
import { NavLink, Service, Project, Testimonial, FaqItem, StoreProduct, Partner } from './types';

export const ZIINA_API_KEY = 'yvmFsB7p0fXDjc9EA1M077y2XsNDR8tdSkCBjZF+5kHQ0CjApUzWwNIRLhH9Nlbc';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: { ar: 'الرئيسية', en: 'Home' }, path: '/' },
  { id: 'services', label: { ar: 'خدماتنا', en: 'Services' }, path: '/services' },
  { id: 'calculator', label: { ar: 'حاسبة التكلفة', en: 'Cost Estimator' }, path: '/calculator' },
  { id: 'store', label: { ar: 'المتجر', en: 'Store' }, path: '/store' },
  { id: 'portfolio', label: { ar: 'أعمالنا', en: 'Portfolio' }, path: '/portfolio' },
  { id: 'about', label: { ar: 'من نحن', en: 'About Us' }, path: '/about' },
  { id: 'contact', label: { ar: 'اتصل بنا', en: 'Contact' }, path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: { ar: 'تصميم وتطوير المواقع', en: 'Web Design & Dev' },
    description: { ar: 'مواقع تعريفية ومؤسسية بأحدث التقنيات وسرعة تصفح عالية.', en: 'Corporate and personal websites with modern tech and high speed.' },
    icon: 'Monitor'
  },
  {
    id: 'ecommerce',
    title: { ar: 'المتاجر الإلكترونية', en: 'E-Commerce' },
    description: { ar: 'حلول بيع متكاملة، بوابات دفع، وتجربة تسوق سلسة.', en: 'Complete sales solutions, payment gateways, and smooth UX.' },
    icon: 'ShoppingCart'
  },
  {
    id: 'apps',
    title: { ar: 'تطبيقات الهواتف', en: 'Mobile Apps' },
    description: { ar: 'تطبيقات iOS و Android احترافية تخدم أهدافك التجارية.', en: 'Professional iOS & Android apps serving your business goals.' },
    icon: 'Smartphone'
  },
  {
    id: 'marketing',
    title: { ar: 'التسويق الإلكتروني', en: 'Digital Marketing' },
    description: { ar: 'إدارة حملات إعلانية وتحسين محركات البحث (SEO).', en: 'Ad campaigns management and Search Engine Optimization (SEO).' },
    icon: 'BarChart'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: { ar: 'بوابة البريمي الإخبارية', en: 'Al Buraimi News Portal' },
    category: 'corporate',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop', // Placeholder: News/Tablet
    description: { ar: 'المنصة الإعلامية الأولى في محافظة البريمي، تغطية شاملة للأخبار والفعاليات مع لوحة تحكم متطورة للمحررين.', en: 'The leading media platform in Al Buraimi Governorate, comprehensive news coverage with advanced editor dashboard.' },
    technologies: ['WordPress', 'PHP', 'MySQL']
  },
  {
    id: 'p2',
    title: { ar: 'تطبيق ذبيحتي', en: 'Zabehati App' },
    category: 'apps',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop', // Placeholder: Fresh Food/App vibe
    description: { ar: 'تطبيق متكامل لطلب الذبائح واللحوم الطازجة مع التوصيل في الإمارات وعمان، يتضمن تتبع الطلب والدفع الإلكتروني.', en: 'Integrated app for ordering fresh carcasses and meat with delivery in UAE and Oman, includes order tracking and online payment.' },
    technologies: ['Flutter', 'Firebase', 'Google Maps']
  },
  {
    id: 'p3',
    title: { ar: 'متجر أطياب للعطور', en: 'Atyab Perfumes' },
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1595867865354-f9f9a5d31a39?q=80&w=800&auto=format&fit=crop', // Placeholder: Perfume Bottle
    description: { ar: 'تجربة تسوق فاخرة لأرقى أنواع العطور والبخور، تصميم يعكس الهوية التراثية مع بوابات دفع آمنة.', en: 'Luxury shopping experience for the finest perfumes and incense, design reflecting heritage identity with secure payment gateways.' },
    technologies: ['Magento', 'React', 'Payment Gateway']
  },
  {
    id: 'p4',
    title: { ar: 'مجموعة الرائد للمقاولات', en: 'Al Raed Contracting Group' },
    category: 'corporate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', // Placeholder: Modern Building
    description: { ar: 'موقع مؤسسي يعرض مشاريع الشركة وخدماتها الهندسية في المنطقة، مع معرض مشاريع تفاعلي.', en: 'Corporate website showcasing the company projects and engineering services in the region, with interactive project gallery.' },
    technologies: ['Next.js', 'Tailwind CSS']
  },
  {
    id: 'p5',
    title: { ar: 'تطبيق عقارك', en: 'Aqaruk Real Estate' },
    category: 'apps',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop', // Placeholder: Real Estate/Keys
    description: { ar: 'منصة عقارية ذكية تربط البائعين والمشترين مع خرائط تفاعلية وجولات افتراضية للعقارات.', en: 'Smart real estate platform connecting sellers and buyers with interactive maps and virtual property tours.' },
    technologies: ['React Native', 'Node.js']
  },
  {
    id: 'p6',
    title: { ar: 'أكاديمية المستقبل', en: 'Future Academy' },
    category: 'corporate',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', // Placeholder: Education/Classroom
    description: { ar: 'بوابة تعليمية للمدارس الخاصة لإدارة الطلاب والتعليم عن بعد، ونظام متابعة لأولياء الأمور.', en: 'Educational portal for private schools to manage students and e-learning, with a tracking system for parents.' },
    technologies: ['Laravel', 'Vue.js']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: { ar: 'أحمد المنصوري', en: 'Ahmed Al Mansoori' },
    role: { ar: 'رئيس تنفيذي - دبي', en: 'CEO - Dubai' },
    content: { ar: 'تجربة رائعة مع فريق Echo Web، التزام بالمواعيد وجودة عالية.', en: 'Great experience with Echo Web team, punctuality and high quality.' },
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Al+Mansoori&background=0D8ABC&color=fff'
  },
  {
    id: 2,
    name: { ar: 'سارة الظاهري', en: 'Sarah Al Dhaheri' },
    role: { ar: 'صاحبة متجر', en: 'Store Owner' },
    content: { ar: 'المتجر الذي صمموه لي زاد مبيعاتي بنسبة 200% خلال أشهر.', en: 'The store they designed increased my sales by 200% in months.' },
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Al+Dhaheri&background=d4af37&color=fff'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: '1',
    question: { ar: 'كم يستغرق تصميم موقع إلكتروني؟', en: 'How long does it take to design a website?' },
    answer: { ar: 'تعتمد المدة على حجم المشروع، تتراوح عادة بين 2-4 أسابيع للمواقع التعريفية.', en: 'Duration depends on project size, usually 2-4 weeks for corporate sites.' }
  },
  {
    id: '2',
    question: { ar: 'هل تقدمون خدمات الاستضافة؟', en: 'Do you provide hosting services?' },
    answer: { ar: 'نعم، نقدم باقات استضافة سريعة وآمنة مع خدمة البريد الرسمي.', en: 'Yes, we provide fast and secure hosting packages with official emails.' }
  },
  {
    id: '3',
    question: { ar: 'ما هي آلية الدفع؟', en: 'What are the payment terms?' },
    answer: { ar: 'عادةً 50% دفعة مقدمة و 50% عند التسليم النهائي.', en: 'Usually 50% down payment and 50% upon final delivery.' }
  }
];

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'h1',
    title: { ar: 'استضافة تأسيسية', en: 'Starter Hosting' },
    description: { ar: 'مثالية للمواقع الشخصية والشركات الصغيرة.', en: 'Perfect for personal sites and small businesses.' },
    price: 499,
    features: { 
      ar: ['مساحة تخزين 10GB', '5 حسابات بريد إلكتروني', 'شهادة SSL مجانية', 'نسخ احتياطي أسبوعي', 'دعم فني عبر البريد'],
      en: ['10GB Storage', '5 Email Accounts', 'Free SSL Certificate', 'Weekly Backup', 'Email Support']
    },
    category: 'hosting'
  },
  {
    id: 'h2',
    title: { ar: 'استضافة متقدمة', en: 'Pro Hosting' },
    description: { ar: 'أداء عالي للمتاجر والشركات الكبرى.', en: 'High performance for stores and large corporates.' },
    price: 999,
    popular: true,
    features: { 
      ar: ['مساحة تخزين 50GB', 'بريد إلكتروني غير محدود', 'نطاق (Domain) مجاني', 'نسخ احتياطي يومي', 'دعم فني 24/7'],
      en: ['50GB Storage', 'Unlimited Emails', 'Free Domain Name', 'Daily Backup', '24/7 Priority Support']
    },
    category: 'hosting'
  },
  {
    id: 't1',
    title: { ar: 'قالب شركة احترافي', en: 'Corporate Template' },
    description: { ar: 'تصميم عصري جاهز للتركيب خلال 48 ساعة.', en: 'Modern design ready for setup in 48 hours.' },
    price: 1500,
    features: { 
      ar: ['تصميم متجاوب للجوال', 'لوحة تحكم سهلة', 'متعدد اللغات', 'نموذج تواصل وخرائط', 'تدريب على الاستخدام'],
      en: ['Mobile Responsive', 'Easy CMS Dashboard', 'Multi-language', 'Contact Form & Maps', 'Usage Training']
    },
    category: 'templates'
  },
  {
    id: 's1',
    title: { ar: 'باقة صيانة شهرية', en: 'Monthly Maintenance' },
    description: { ar: 'حافظ على أمان وسرعة موقعك بشكل مستمر.', en: 'Keep your site secure and fast continuously.' },
    price: 299,
    features: { 
      ar: ['تحديثات أمنية', 'تحسين السرعة', 'إصلاح الأخطاء البرمجية', 'تعديلات بسيطة في المحتوى', 'تقارير شهرية'],
      en: ['Security Updates', 'Speed Optimization', 'Bug Fixes', 'Minor Content Edits', 'Monthly Reports']
    },
    category: 'support'
  }
];

export const PARTNERS: Partner[] = [
    { id: '1', name: 'Ministry of Commerce', logo: 'https://ui-avatars.com/api/?name=M+O+C&background=f3f4f6&color=4a148c&size=128&font-size=0.33&length=3' },
    { id: '2', name: 'Al Buraimi Gov', logo: 'https://ui-avatars.com/api/?name=Buraimi+Gov&background=f3f4f6&color=d4af37&size=128&font-size=0.33&length=2' },
    { id: '3', name: 'Oman Oil', logo: 'https://ui-avatars.com/api/?name=Oman+Oil&background=f3f4f6&color=1a1a1a&size=128&font-size=0.33&length=2' },
    { id: '4', name: 'Dubai SME', logo: 'https://ui-avatars.com/api/?name=Dubai+SME&background=f3f4f6&color=4a148c&size=128&font-size=0.33&length=2' },
    { id: '5', name: 'University of Sharjah', logo: 'https://ui-avatars.com/api/?name=U+O+S&background=f3f4f6&color=d4af37&size=128&font-size=0.33&length=3' },
    { id: '6', name: 'Etisalat', logo: 'https://ui-avatars.com/api/?name=Etisalat&background=f3f4f6&color=718c00&size=128&font-size=0.33' },
    { id: '7', name: 'Bank Muscat', logo: 'https://ui-avatars.com/api/?name=Bank+Muscat&background=f3f4f6&color=c00&size=128&font-size=0.33&length=2' },
];
