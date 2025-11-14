// const LandingPage = () => {
//   return (
//     <div className="flex items-center justify-center h-full">
//       <h1 className="text-3xl font-bold">Landing Page</h1>
//     </div>
//   );
// };
// export default LandingPage;

// <---------- Default Landing Page Style ------------> //

// import React from "react";
// import { Link } from "react-router-dom";
// import useTheme from "../hooks/useTheme";
// import {
//   RealtimeIcon,
//   UserDiscoveryIcon,
//   SecureIcon,
//   ResponsiveIcon,
// } from "../components/landing/FeatureIcons";

// // --- Sub-Components for the Landing Page ---

// // 1. Header Component
// const LandingHeader = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className="absolute top-0 left-0 right-0 z-10 py-6 px-4 md:px-8">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <FluxLogo small />
//           <span className="text-2xl font-bold text-gray-900 dark:text-white">
//             FLUX
//           </span>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center gap-4">
//           <Link
//             to="/login"
//             className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
//           >
//             Sign In
//           </Link>
//           <Link
//             to="/signup"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
//           >
//             Get Started
//           </Link>
//           <button
//             className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//             onClick={toggleTheme}
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// // 2. Hero Section
// const HeroSection = () => (
//   <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 flex items-center justify-center text-center">
//     {/* Background Gradient */}
//     <div className="absolute inset-0 -z-10 overflow-hidden">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
//         <div className="absolute w-full h-full bg-blue-500 rounded-full blur-[150px] opacity-20 dark:opacity-30 animate-pulse"></div>
//         <div className="absolute w-3/4 h-3/4 bg-purple-500 rounded-full blur-[120px] opacity-20 dark:opacity-30 animate-pulse animation-delay-2000"></div>
//       </div>
//     </div>

//     <div className="container mx-auto px-4">
//       <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
//         Connect Instantly with FLUX
//       </h1>
//       <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
//         Experience seamless real-time messaging with a modern, intuitive
//         interface. Chat with friends, share moments, and stay connected like
//         never before.
//       </p>
//       <div className="flex justify-center gap-4">
//         <Link
//           to="/signup"
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg"
//         >
//           Start Chatting Now
//         </Link>
//         <Link
//           to="/login"
//           className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 text-lg"
//         >
//           Sign In to Your Account
//         </Link>
//       </div>

//       {/* Mini-features */}
//       <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//         <div>
//           <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
//             Real-time
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             Instant messaging with Socket.IO
//           </p>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
//             Secure
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             JWT authentication & encryption
//           </p>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
//             Modern
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             Built with React & Node.js
//           </p>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // 3. Features Section
// const FeaturesSection = () => (
//   <section className="py-24 bg-gray-50 dark:bg-gray-800">
//     <div className="container mx-auto px-4">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//           Why Choose FLUX?
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//           Built with modern technologies and designed for the best user
//           experience.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         <FeatureCard
//           icon={<RealtimeIcon />}
//           title="Real-time Messaging"
//           description="Send and receive messages instantly with our chat system powered by Socket.IO."
//         />
//         <FeatureCard
//           icon={<UserDiscoveryIcon />}
//           title="User Discovery"
//           description="Find and connect with other users through our robust search and discovery features."
//         />
//         <FeatureCard
//           icon={<SecureIcon />}
//           title="Secure & Private"
//           description="Your conversations are protected with modern authentication and secure data transmission."
//         />
//         <FeatureCard
//           icon={<ResponsiveIcon />}
//           title="Fast & Responsive"
//           description="Built with modern React and Tailwind for a snappy UI on all devices."
//         />
//       </div>
//     </div>
//   </section>
// );

// // Helper for FeaturesSection
// const FeatureCard = ({ icon, title, description }) => (
//   <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
//     <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//       {title}
//     </h3>
//     <p className="text-gray-600 dark:text-gray-400">{description}</p>
//   </div>
// );

// // 4. CTA Section
// const CTASection = () => (
//   <section className="py-24 text-center">
//     <div className="container mx-auto px-4">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//         Ready to Start Chatting?
//       </h2>
//       <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
//         Join thousands of users already enjoying seamless conversations on FLUX.
//       </p>
//       <Link
//         to="/signup"
//         className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg"
//       >
//         Create Your Account
//       </Link>
//     </div>
//   </section>
// );

// // 5. Footer Section
// const LandingFooter = () => (
//   <footer className="py-8 bg-gray-100 dark:bg-gray-900">
//     <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
//       <div className="flex items-center gap-2 mb-4 md:mb-0">
//         <FluxLogo small />
//         <span className="text-xl font-bold text-gray-900 dark:text-white">
//           FLUX
//         </span>
//       </div>
//       <p className="text-gray-600 dark:text-gray-400 text-sm">
//         Real-time chat app built with React, Node.js, and Socket.IO.
//       </p>
//       <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 md:mt-0">
//         © 2025 FLUX. All rights reserved.
//       </p>
//     </div>
//   </footer>
// );

// // 6. Tiny Logo Component
// const FluxLogo = ({ small = false }) => (
//   <svg
//     className={small ? "w-8 h-8" : "w-12 h-12"}
//     viewBox="0 0 128 128"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M64 0C28.6533 0 0 28.6533 0 64C0 99.3467 28.6533 128 64 128C99.3467 128 128 99.3467 128 64C128 28.6533 99.3467 0 64 0ZM64 120C32.9133 120 8 95.0867 8 64C8 32.9133 32.9133 8 64 8C95.0867 8 120 32.9133 120 64C120 95.0867 95.0867 120 64 120Z"
//       fill="url(#paint0_linear)"
//     />
//     <path
//       d="M87.6167 47.16C86.13 45.4267 83.3333 46.1367 83.3333 48.3333V60.6667H44.6667V48.3333C44.6667 46.1367 41.87 45.4267 40.3833 47.16L29.3333 59.9867C27.99 61.56 27.99 63.9267 29.3333 65.5L40.3833 78.3267C41.87 80.06 44.6667 79.35 44.6667 77.1533V64.82H83.3333V77.1533C83.3333 79.35 86.13 80.06 87.6167 78.3267L98.6667 65.5C100.01 63.9267 100.01 61.56 98.6667 59.9867L87.6167 47.16Z"
//       fill="url(#paint1_linear)"
//     />
//     <defs>
//       <linearGradient
//         id="paint0_linear"
//         x1="64"
//         y1="0"
//         x2="64"
//         y2="128"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#4A90E2" />
//         <stop offset="1" stopColor="#50E3C2" />
//       </linearGradient>
//       <linearGradient
//         id="paint1_linear"
//         x1="64"
//         y1="46"
//         x2="64"
//         y2="79.5"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#4A90E2" />
//         <stop offset="1" stopColor="#50E3C2" />
//       </linearGradient>
//     </defs>
//   </svg>
// );

// // --- Main Landing Page ---
// const LandingPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
//       <LandingHeader />
//       <main className="flex-grow">
//         <HeroSection />
//         <FeaturesSection />
//         <CTASection />
//       </main>
//       <LandingFooter />
//     </div>
//   );
// };

// export default LandingPage;

// <---------- Glassmorphism Design Landing Page Style ------------> //

// import React from "react";
// import { Link } from "react-router-dom";
// import useTheme from "../hooks/useTheme";
// import {
//   RealtimeIcon,
//   UserDiscoveryIcon,
//   SecureIcon,
//   ResponsiveIcon,
// } from "../components/landing/FeatureIcons";

// // --- Sub-Components for the Landing Page ---

// // 1. Header Component
// const LandingHeader = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className="absolute top-0 left-0 right-0 z-20 py-6 px-4 md:px-8">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <FluxLogo small />
//           <span className="text-2xl font-bold text-gray-900 dark:text-white">
//             FLUX
//           </span>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center gap-2 md:gap-4">
//           <Link
//             to="/login"
//             className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg"
//           >
//             Sign In
//           </Link>
//           <Link
//             to="/signup"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
//           >
//             Get Started
//           </Link>
//           <button
//             className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//             onClick={toggleTheme}
//             title="Toggle theme"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// // 2. Hero Section
// const HeroSection = () => (
//   <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
//     {/* --- Background Elements --- */}
//     <div className="absolute inset-0 -z-10">
//       {/* Dark mode overlay */}
//       <div className="absolute inset-0 bg-black opacity-0 dark:opacity-30 transition-opacity duration-300"></div>

//       {/* Animated Gradient Blobs */}
//       <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full blur-[100px] md:blur-[150px] opacity-30 dark:opacity-40 animate-pulse"></div>
//       <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full blur-[100px] md:blur-[150px] opacity-30 dark:opacity-40 animate-pulse animation-delay-2000"></div>
//     </div>

//     {/* --- Glassmorphism Container --- */}
//     <div className="relative z-10 w-full max-w-4xl mx-auto p-8 md:p-12">
//       <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl p-8 md:p-12">
//         <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
//           Connect Instantly with FLUX
//         </h1>
//         <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
//           Seamless, real-time messaging with a modern, intuitive interface.
//           Chat, share, and stay connected.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <Link
//             to="/signup"
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg shadow-md transition-transform hover:scale-105"
//           >
//             Start Chatting Now
//           </Link>
//           <Link
//             to="/login"
//             className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 text-lg transition-transform hover:scale-105"
//           >
//             Sign In to Your Account
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // 3. Features Section
// const FeaturesSection = () => (
//   <section className="py-24 bg-gray-50 dark:bg-gray-900">
//     <div className="container mx-auto px-4">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//           Why Choose FLUX?
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//           Built with modern technologies and designed for the best user
//           experience.
//         </p>
//       </div>

//       {/* --- Glassmorphism Cards --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         <FeatureCard
//           icon={<RealtimeIcon />}
//           title="Real-time Messaging"
//           description="Send and receive messages instantly with our chat system powered by Socket.IO."
//         />
//         <FeatureCard
//           icon={<UserDiscoveryIcon />}
//           title="User Discovery"
//           description="Find and connect with other users through our robust search and discovery features."
//         />
//         <FeatureCard
//           icon={<SecureIcon />}
//           title="Secure & Private"
//           description="Your conversations are protected with modern authentication and secure data transmission."
//         />
//         <FeatureCard
//           icon={<ResponsiveIcon />}
//           title="Fast & Responsive"
//           description="Built with modern React and Tailwind for a snappy UI on all devices."
//         />
//       </div>
//     </div>
//   </section>
// );

// // Helper for FeaturesSection (Glassmorphism Card)
// const FeatureCard = ({ icon, title, description }) => (
//   <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
//     <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//       {title}
//     </h3>
//     <p className="text-gray-600 dark:text-gray-400">{description}</p>
//   </div>
// );

// // 4. CTA Section
// const CTASection = () => (
//   <section className="py-24 text-center relative overflow-hidden">
//     {/* Background Gradient */}
//     <div className="absolute inset-0 -z-10">
//       <div className="absolute -bottom-1/2 left-1/3 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-20 dark:opacity-30 animate-pulse"></div>
//       <div className="absolute -top-1/4 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-20 dark:opacity-30 animate-pulse animation-delay-2000"></div>
//     </div>

//     <div className="container mx-auto px-4 relative z-10">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//         Ready to Start Chatting?
//       </h2>
//       <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
//         Join thousands of users already enjoying seamless conversations on FLUX.
//       </p>
//       <Link
//         to="/signup"
//         className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg shadow-md transition-transform hover:scale-105"
//       >
//         Create Your Account
//       </Link>
//     </div>
//   </section>
// );

// // 5. Footer Section
// const LandingFooter = () => (
//   <footer className="py-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
//     <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
//       <div className="flex items-center gap-2 mb-4 md:mb-0">
//         <FluxLogo small />
//         <span className="text-xl font-bold text-gray-900 dark:text-white">
//           FLUX
//         </span>
//       </div>
//       <p className="text-gray-600 dark:text-gray-400 text-sm">
//         Real-time chat app built with React, Node.js, and Socket.IO.
//       </p>
//       <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 md:mt-0">
//         © 2025 FLUX. All rights reserved.
//       </p>
//     </div>
//   </footer>
// );

// // 6. Tiny Logo Component (Corrected)
// const FluxLogo = ({ small = false }) => (
//   <svg
//     className={small ? "w-8 h-8" : "w-12 h-12"}
//     viewBox="0 0 128 128"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M64 0C28.6533 0 0 28.6533 0 64C0 99.3467 28.6533 128 64 128C99.3467 128 128 99.3467 128 64C128 28.6533 99.3467 0 64 0ZM64 120C32.9133 120 8 95.0867 8 64C8 32.9133 32.9133 8 64 8C95.0867 8 120 32.9133 120 64C120 95.0867 95.0867 120 64 120Z"
//       fill="url(#paint0_linear)"
//     />
//     <path
//       d="M87.6167 47.16C86.13 45.4267 83.3333 46.1367 83.3333 48.3333V60.6667H44.6667V48.3333C44.6667 46.1367 41.87 45.4267 40.3833 47.16L29.3333 59.9867C27.99 61.56 27.99 63.9267 29.3333 65.5L40.3833 78.3267C41.87 80.06 44.6667 79.35 44.6667 77.1533V64.82H83.3333V77.1533C83.3333 79.35 86.13 80.06 87.6167 78.3267L98.6667 65.5C100.01 63.9267 100.01 61.56 98.6667 59.9867L87.6167 47.16Z"
//       fill="url(#paint1_linear)"
//     />
//     <defs>
//       <linearGradient
//         id="paint0_linear"
//         x1="64"
//         y1="0"
//         x2="64"
//         y2="128"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#4A90E2" />
//         <stop offset="1" stopColor="#50E3C2" />
//       </linearGradient>
//       <linearGradient
//         id="paint1_linear"
//         x1="64"
//         y1="46"
//         x2="64"
//         y2="79.5"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#4A90E2" />
//         <stop offset="1" stopColor="#50E3C2" />
//       </linearGradient>
//     </defs>
//   </svg>
// );

// // --- Main Landing Page ---
// const LandingPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
//       <LandingHeader />
//       <main className="flex-grow">
//         <HeroSection />
//         <FeaturesSection />
//         <CTASection />
//       </main>
//       <LandingFooter />
//     </div>
//   );
// };

// export default LandingPage;

// <---------- Sleek & Minimal Design Landing Page Style ------------> //

// import React from "react";
// import { Link } from "react-router-dom";
// import useTheme from "../hooks/useTheme";
// import {
//   RealtimeIcon,
//   UserDiscoveryIcon,
//   SecureIcon,
//   ResponsiveIcon,
// } from "../components/landing/FeatureIcons";

// // --- Sub-Components for the Landing Page ---

// // 1. Header Component
// const LandingHeader = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className="absolute top-0 left-0 right-0 z-10 py-6 px-4 md:px-8">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <FluxLogo small />
//           <span className="text-2xl font-bold text-gray-900 dark:text-white">
//             FLUX
//           </span>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center gap-2 md:gap-4">
//           <Link
//             to="/login"
//             className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg"
//           >
//             Sign In
//           </Link>
//           <Link
//             to="/signup"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm"
//           >
//             Get Started
//           </Link>
//           <button
//             className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//             onClick={toggleTheme}
//             title="Toggle theme"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// // 2. Hero Section
// const HeroSection = () => (
//   <section className="pt-40 pb-24 md:pt-56 md:pb-32 flex items-center justify-center text-center">
//     <div className="container mx-auto px-4">
//       <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
//         Connect Instantly
//       </h1>
//       <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
//         Experience seamless real-time messaging with a modern, intuitive
//         interface. Built for speed, security, and simplicity.
//       </p>
//       <div className="flex justify-center gap-4">
//         <Link
//           to="/signup"
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg shadow-md transition-transform hover:scale-105"
//         >
//           Start Chatting Now
//         </Link>
//       </div>

//       {/* Tech stack logos (minimal) */}
//       <div className="mt-20">
//         <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
//           Built With Modern Technology
//         </p>
//         <div className="flex justify-center gap-8 opacity-60 dark:opacity-40">
//           <span className="font-medium">React</span>
//           <span className="font-medium">Node.js</span>
//           <span className="font-medium">Socket.IO</span>
//           <span className="font-medium">MongoDB</span>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // 3. Features Section
// const FeaturesSection = () => (
//   <section className="py-24 bg-gray-50 dark:bg-gray-800">
//     <div className="container mx-auto px-4">
//       <div className="text-left max-w-xl mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//           Everything you need.
//           <br />
//           Nothing you don't.
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-gray-400">
//           FLUX is designed to be lightweight, fast, and secure.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         <FeatureCard
//           icon={<RealtimeIcon />}
//           title="Real-time Messaging"
//           description="Instantly send and receive messages with Socket.IO."
//         />
//         <FeatureCard
//           icon={<SecureIcon />}
//           title="Secure & Private"
//           description="Protected by JWT authentication and secure routes."
//         />
//         <FeatureCard
//           icon={<ResponsiveIcon />}
//           title="Fast & Responsive"
//           description="A snappy, modern UI built with React and Tailwind."
//         />
//         <FeatureCard
//           icon={<UserDiscoveryIcon />}
//           title="User Discovery"
//           description="Find and connect with other users in the system."
//         />
//       </div>
//     </div>
//   </section>
// );

// // Helper for FeaturesSection (Minimal Card)
// const FeatureCard = ({ icon, title, description }) => (
//   <div className="bg-transparent p-2">
//     <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//       {title}
//     </h3>
//     <p className="text-gray-600 dark:text-gray-400">{description}</p>
//   </div>
// );

// // 4. CTA Section
// const CTASection = () => (
//   <section className="py-32 text-center">
//     <div className="container mx-auto px-4">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//         Ready to Start Chatting?
//       </h2>
//       <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
//         Create your free account in seconds and start connecting.
//       </p>
//       <Link
//         to="/signup"
//         className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg shadow-md transition-transform hover:scale-105"
//       >
//         Create Your Account
//       </Link>
//     </div>
//   </section>
// );

// // 5. Footer Section
// const LandingFooter = () => (
//   <footer className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
//     <div className="container mx-auto px-4 flex justify-between items-center">
//       <div className="flex items-center gap-2">
//         <FluxLogo small />
//         <span className="text-lg font-bold text-gray-900 dark:text-white">
//           FLUX
//         </span>
//       </div>
//       <p className="text-gray-500 dark:text-gray-500 text-sm">
//         © 2025 FLUX. All rights reserved.
//       </p>
//     </div>
//   </footer>
// );

// // 6. Tiny Logo Component (No Change)
// const FluxLogo = ({ small = false }) => (
//   <svg
//     className={small ? "w-8 h-8" : "w-12 h-12"}
//     viewBox="0 0 128 128"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M64 0C28.6533 0 0 28.6533 0 64C0 99.3467 28.6533 128 64 128C99.3467 128 128 99.3467 128 64C128 28.6533 99.3467 0 64 0ZM64 120C32.9133 120 8 95.0867 8 64C8 32.9133 32.9133 8 64 8C95.0867 8 120 32.9133 120 64C120 95.0867 95.0867 120 64 120Z"
//       fill="url(#paint0_linear)"
//     />
//     <path
//       d="M87.6167 47.16C86.13 45.4267 83.3333 46.1367 83.3333 48.3333V60.6667H44.6667V48.3333C44.6667 46.1367 41.87 45.4267 40.3833 47.16L29.3333 59.9867C27.99 61.56 27.99 63.9267 29.3333 65.5L40.3833 78.3267C41.87 80.06 44.6667 79.35 44.6667 77.1533V64.82H83.3333V77.1533C83.3333 79.35 86.13 80.06 87.6167 78.3267L98.6667 65.5C100.01 63.9267 100.01 61.56 98.6667 59.9867L87.6167 47.16Z"
//       fill="url(#paint1_linear)"
//     />
//     <defs>
//       <linearGradient
//         id="paint0_linear"
//         x1="64"
//         y1="0"
//         x2="64"
//         y2="128"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#4A90E2" />
//         <stop offset="1" stopColor="#50E3C2" />
//       </linearGradient>
//       <linearGradient
//         id="paint1_linear"
//         x1="64"
//         y1="46"
//         x2="64"
//         y2="79.5"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#4A90E2" />
//         <stop offset="1" stopColor="#50E3C2" />
//       </linearGradient>
//     </defs>
//   </svg>
// );

// // --- Main Landing Page ---
// const LandingPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
//       <LandingHeader />
//       <main className="flex-grow">
//         <HeroSection />
//         <FeaturesSection />
//         <CTASection />
//       </main>
//       <LandingFooter />
//     </div>
//   );
// };

// export default LandingPage;

// <---------- Glassmorphism Design Landing Page Style ------------> //

// import React from "react";
// import { Link } from "react-router-dom";
// import useTheme from "../hooks/useTheme";
// import {
//   RealtimeIcon,
//   UserDiscoveryIcon,
//   SecureIcon,
//   ResponsiveIcon,
// } from "../components/landing/FeatureIcons";

// // --- Sub-Components for the Landing Page ---

// // 1. Header Component
// const LandingHeader = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className="absolute top-0 left-0 right-0 z-20 py-6 px-4 md:px-8">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <FluxLogo small />
//           <span className="text-2xl font-bold text-gray-900 dark:text-white">
//             FLUX
//           </span>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center gap-2 md:gap-4">
//           <Link
//             to="/login"
//             className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg"
//           >
//             Sign In
//           </Link>
//           <Link
//             to="/signup"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
//           >
//             Get Started
//           </Link>
//           <button
//             className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//             onClick={toggleTheme}
//             title="Toggle theme"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// // 2. Hero Section
// const HeroSection = () => (
//   <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
//     {/* --- Background Elements --- */}
//     <div className="absolute inset-0 -z-10">
//       {/* Dark mode overlay */}
//       <div className="absolute inset-0 bg-black opacity-0 dark:opacity-30 transition-opacity duration-300"></div>

//       {/* Animated Gradient Blobs */}
//       <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full blur-[100px] md:blur-[150px] opacity-30 dark:opacity-40 animate-pulse"></div>
//       <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full blur-[100px] md:blur-[150px] opacity-30 dark:opacity-40 animate-pulse animation-delay-2000"></div>
//     </div>

//     {/* --- Glassmorphism Container --- */}
//     <div className="relative z-10 w-full max-w-4xl mx-auto p-8 md:p-12">
//       <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl p-8 md:p-12">
//         <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
//           Connect Instantly with FLUX
//         </h1>
//         <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
//           Seamless, real-time messaging with a modern, intuitive interface.
//           Chat, share, and stay connected.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <Link
//             to="/signup"
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg shadow-md transition-transform hover:scale-105"
//           >
//             Start Chatting Now
//           </Link>
//           <Link
//             to="/login"
//             className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 text-lg transition-transform hover:scale-105"
//           >
//             Sign In to Your Account
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // 3. Features Section
// const FeaturesSection = () => (
//   <section className="py-24 bg-gray-50 dark:bg-gray-900">
//     <div className="container mx-auto px-4">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//           Why Choose FLUX?
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//           Built with modern technologies and designed for the best user
//           experience.
//         </p>
//       </div>

//       {/* --- Glassmorphism Cards --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         <FeatureCard
//           icon={<RealtimeIcon />}
//           title="Real-time Messaging"
//           description="Send and receive messages instantly with our chat system powered by Socket.IO."
//         />
//         <FeatureCard
//           icon={<UserDiscoveryIcon />}
//           title="User Discovery"
//           description="Find and connect with other users through our robust search and discovery features."
//         />
//         <FeatureCard
//           icon={<SecureIcon />}
//           title="Secure & Private"
//           description="Your conversations are protected with modern authentication and secure data transmission."
//         />
//         <FeatureCard
//           icon={<ResponsiveIcon />}
//           title="Fast & Responsive"
//           description="Built with modern React and Tailwind for a snappy UI on all devices."
//         />
//       </div>
//     </div>
//   </section>
// );

// // Helper for FeaturesSection (Glassmorphism Card)
// const FeatureCard = ({ icon, title, description }) => (
//   <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
//     <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//       {title}
//     </h3>
//     <p className="text-gray-600 dark:text-gray-400">{description}</p>
//   </div>
// );

// // 4. CTA Section
// const CTASection = () => (
//   <section className="py-24 text-center relative overflow-hidden">
//     {/* Background Gradient */}
//     <div className="absolute inset-0 -z-10">
//       <div className="absolute -bottom-1/2 left-1/3 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-20 dark:opacity-30 animate-pulse"></div>
//       <div className="absolute -top-1/4 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-20 dark:opacity-30 animate-pulse animation-delay-2000"></div>
//     </div>

//     <div className="container mx-auto px-4 relative z-10">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//         Ready to Start Chatting?
//       </h2>
//       <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
//         Join thousands of users already enjoying seamless conversations on FLUX.
//       </p>
//       <Link
//         to="/signup"
//         className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg shadow-md transition-transform hover:scale-105"
//       >
//         Create Your Account
//       </Link>
//     </div>
//   </section>
// );

// // 5. Footer Section
// const LandingFooter = () => (
//   <footer className="py-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
//     <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
//       <div className="flex items-center gap-2 mb-4 md:mb-0">
//         <FluxLogo small />
//         <span className="text-xl font-bold text-gray-900 dark:text-white">
//           FLUX
//         </span>
//       </div>
//       <p className="text-gray-600 dark:text-gray-400 text-sm">
//         Real-time chat app built with React, Node.js, and Socket.IO.
//       </p>
//       <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 md:mt-0">
//         © 2025 FLUX. All rights reserved.
//       </p>
//     </div>
//   </footer>
// );

// // 6. Tiny Logo Component (Corrected)
// const FluxLogo = ({ small = false }) => (
//   <svg
//     className={small ? "w-8 h-8" : "w-12 h-12"}
//     viewBox="0 0 128 128"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M64 0C28.6533 0 0 28.6533 0 64C0 99.3467 28.6533 128 64 128C99.3467 128 128 99.3467 128 64C128 28.6533 99.3467 0 64 0ZM64 120C32.9133 120 8 95.0867 8 64C8 32.9133 32.9133 8 64 8C95.0867 8 120 32.9133 120 64C120 95.0867 95.0867 120 64 120Z"
//       fill="url(#paint0_linear)"
//     />
//     <path
//       d="M87.6167 47.16C86.13 45.4267 83.3333 46.1367 83.3333 48.3333V60.6667H44.6667V48.3333C44.6667 46.1367 41.87 45.4267 40.3833 47.16L29.3333 59.9867C27.99 61.56 27.99 63.9267 29.3333 65.5L40.3833 78.3267C41.87 80.06 44.6667 79.35 44.6667 77.1533V64.82H83.3333V77.1533C83.3333 79.35 86.13 80.06 87.6167 78.3267L98.6667 65.5C100.01 63.9267 100.01 61.56 98.6667 59.9867L87.6167 47.16Z"
//       fill="url(#paint1_linear)"
//     />
//     <defs>
//       <linearGradient
//         id="paint0_linear"
//         x1="64"
//         y1="0"
//         x2="64"
//         y2="128"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#4A90E2" />
//         <stop offset="1" stopColor="#50E3C2" />
//       </linearGradient>
//       <linearGradient
//         id="paint1_linear"
//         x1="64"
//         y1="46"
//         x2="64"
//         y2="79.5"
//         gradientUnits="userSpaceOnUse"
//       >
//         <stop stopColor="#4A90E2" />
//         <stop offset="1" stopColor="#50E3C2" />
//       </linearGradient>
//     </defs>
//   </svg>
// );

// // --- Main Landing Page ---
// const LandingPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
//       <LandingHeader />
//       <main className="flex-grow">
//         <HeroSection />
//         <FeaturesSection />
//         <CTASection />
//       </main>
//       <LandingFooter />
//     </div>
//   );
// };

// export default LandingPage;

// Compact Version

import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import {
  RealtimeIcon,
  UserDiscoveryIcon,
  SecureIcon,
  ResponsiveIcon,
} from "../components/landing/FeatureIcons";
import Logo from "../components/common/Logo";

// --- Sub-Components ---

// 1. Header Component
const LandingHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="absolute top-0 left-0 right-0 z-10 py-6 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* <FluxLogo /> */}
          <Logo />
          <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-wider">
            FLUX
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 md:gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm"
          >
            Get Started
          </Link>
          <button
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
      </div>
    </header>
  );
};

// 2. Combined Hero & Features Section
const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center text-center bg-gray-50 dark:bg-gray-900 pt-20">
    <div className="container mx-auto px-4 py-16">
      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
        Connect Instantly
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
        Experience seamless real-time messaging with a modern, intuitive
        interface. Built for speed, security, and simplicity.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex justify-center gap-4 mb-20">
        <Link
          to="/signup"
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-lg shadow-md transition-transform hover:scale-105"
        >
          Start Chatting Now
        </Link>
      </div>

      {/* Integrated Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
        <FeatureCard
          icon={<RealtimeIcon />}
          title="Real-time Messaging"
          description="Instantly send and receive messages with Socket.IO."
        />
        <FeatureCard
          icon={<SecureIcon />}
          title="Secure & Private"
          description="Protected by JWT authentication and secure routes."
        />
        <FeatureCard
          icon={<ResponsiveIcon />}
          title="Fast & Responsive"
          description="A snappy, modern UI built with React and Tailwind."
        />
        <FeatureCard
          icon={<UserDiscoveryIcon />}
          title="User Discovery"
          description="Find and connect with other users in the system."
        />
      </div>
    </div>
  </section>
);

// Helper for FeaturesSection
const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="flex justify-center items-center mb-4 w-16 h-16 mx-auto bg-blue-100 dark:bg-gray-800 rounded-full text-blue-600 dark:text-blue-400">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

// 3. Footer Section
const LandingFooter = () => (
  <footer className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        {/* <FluxLogo /> */}
        <Logo />
        <span className="text-lg font-bold text-gray-900 dark:text-white tracking-wider">
          FLUX
        </span>
      </div>
      <p className="text-gray-500 dark:text-gray-500 text-sm">
        © 2025 FLUX. All rights reserved.
      </p>
    </div>
  </footer>
);

// 4. NEW FLUX LOGO SVG
// const FluxLogo = () => (
//   <svg
//     className="w-8 h-8"
//     viewBox="0 0 32 32"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <defs>
//       <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" stopColor="#4A90E2" />
//         <stop offset="100%" stopColor="#50E3C2" />
//       </linearGradient>
//     </defs>
//     <path
//       d="M16 3C8.82 3 3 8.82 3 16C3 23.18 8.82 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3ZM20.5 17.5L15 23L9.5 17.5H14V9H16V17.5H20.5Z"
//       transform="rotate(45 16 16)"
//       fill="url(#logoGradient)"
//     />
//   </svg>
// );

// --- Main Landing Page ---
const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <LandingHeader />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
