import { lazy, Suspense, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, LangProvider } from "./context/index";
import { ToastProvider } from "./components/Toast";
import { BookingProvider } from "./components/BookingModal";
import { trackPageView } from "./utils/analytics";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageSkeleton from "./components/PageSkeleton";
import InstallPrompt from "./components/InstallPrompt";
import Home from "./pages/Home";

const Destinations      = lazy(() => import("./pages/Destinations"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));
const Blog              = lazy(() => import("./pages/Blog"));
const BlogDetail        = lazy(() => import("./pages/BlogDetail"));
const About             = lazy(() => import("./pages/About"));
const Contact           = lazy(() => import("./pages/Contact"));
const NotFound          = lazy(() => import("./pages/NotFound"));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -14 },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
    </motion.main>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(window.location.href);
  }, [location.pathname]);

  return (
    <MotionConfig transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                  element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/destinations"      element={<PageWrapper><Destinations /></PageWrapper>} />
          <Route path="/destinations/:id"  element={<PageWrapper><DestinationDetail /></PageWrapper>} />
          <Route path="/blog"              element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/blog/:id"          element={<PageWrapper><BlogDetail /></PageWrapper>} />
          <Route path="/about"             element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/contact"           element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="*"                  element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <Footer />
      <InstallPrompt />
    </MotionConfig>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <ToastProvider>
          <BookingProvider>
            <AppContent />
          </BookingProvider>
        </ToastProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
