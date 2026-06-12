import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  GraduationCap, 
  User, 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  BookOpen, 
  Layers, 
  Award,
  CheckCircle2,
  BarChart3
} from "lucide-react";
import { useApp } from "../state/AppState";



// 2. Pure CSS/SVG Skill Alignment Illustration Component
function SkillMapIllustration() {
  return (
    <div className="relative w-full h-[380px] md:h-[450px] overflow-hidden bg-transparent rounded-xl flex items-center justify-center">
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .animate-dash-flow {
          animation: dash 3s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.95;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.04);
            opacity: 1;
            box-shadow: 0 4px 20px rgba(10,124,102,0.35);
          }
        }
        .animate-pulse-bridge {
          animation: pulse-slow 3.4s ease-in-out infinite;
        }
      `}</style>
      
      {/* SVG Connecting Lines mapping coordinates to 500x400 viewBox */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0fae64" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#142e4d" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Connection Paths with flowing dashes from left (academia) to center */}
        <path d="M 75,100 C 150,100 180,200 250,200" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6, 6" className="animate-dash-flow" />
        <path d="M 75,300 C 150,300 180,200 250,200" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6, 6" className="animate-dash-flow" />
        <path d="M 110,200 L 250,200" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6, 6" className="animate-dash-flow" />
        
        {/* Connection Paths from center to right (industry) */}
        <path d="M 250,200 C 320,200 350,100 425,100" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6, 6" className="animate-dash-flow" />
        <path d="M 250,200 C 320,200 350,300 425,300" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6, 6" className="animate-dash-flow" />
        <path d="M 250,200 L 390,200" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6, 6" className="animate-dash-flow" />
      </svg>

      {/* Floating Nodes positioned relatively matching viewBox percentages */}
      
      {/* Academia Cluster (Left) */}
      <div className="absolute left-[15%] top-[25%] -translate-x-1/2 -translate-y-1/2 glass-card px-3.5 py-1.5 rounded-full border border-line shadow-sm animate-float-slow text-[11px] md:text-[12px] font-bold text-navy select-none">
        React JS
      </div>
      <div className="absolute left-[15%] top-[75%] -translate-x-1/2 -translate-y-1/2 glass-card px-3.5 py-1.5 rounded-full border border-line shadow-sm animate-float-medium text-[11px] md:text-[12px] font-bold text-navy select-none" style={{ animationDelay: "1s" }}>
        Python AI
      </div>
      <div className="absolute left-[22%] top-[50%] -translate-x-1/2 -translate-y-1/2 glass-card px-3.5 py-1.5 rounded-full border border-line shadow-sm animate-float-slow text-[11px] md:text-[12px] font-bold text-navy select-none" style={{ animationDelay: "0.5s" }}>
        Datastructures
      </div>

      {/* Bridge Node (Center) */}
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-navy text-mint border border-teal px-5 py-2.5 rounded-full z-10 animate-pulse-bridge text-[12px] md:text-[13.5px] font-extrabold select-none flex items-center gap-1.5 shadow-[0_4px_12px_rgba(10,124,102,0.25)]">
        <Sparkles size={14} className="text-mint animate-spin" style={{ animationDuration: "8s" }} />
        Curriculum Bridge
      </div>

      {/* Industry Demand (Right) */}
      <div className="absolute right-[15%] top-[25%] -translate-x-1/2 -translate-y-1/2 glass-card-dark text-white/95 px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm animate-float-medium text-[11px] md:text-[12px] font-bold select-none" style={{ animationDelay: "1.5s" }}>
        AWS Cloud
      </div>
      <div className="absolute right-[15%] top-[75%] -translate-x-1/2 -translate-y-1/2 glass-card-dark text-white/95 px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm animate-float-slow text-[11px] md:text-[12px] font-bold select-none" style={{ animationDelay: "2s" }}>
        SQL & Databases
      </div>
      <div className="absolute right-[22%] top-[50%] -translate-x-1/2 -translate-y-1/2 glass-card-dark text-white/95 px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm animate-float-medium text-[11px] md:text-[12px] font-bold select-none" style={{ animationDelay: "0.7s" }}>
        LLM Fine-Tuning
      </div>
    </div>
  );
}

// 3. Main Landing Page Component
export default function Landing() {
  const { dispatch, toast } = useApp();
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    dispatch({ type: "role/set", role });
    if (role === "professor") {
      toast("Welcome back Professor. Loading Accreditation Queue...", "teal");
      navigate("/queue");
    } else {
      toast("Welcome Student. Accessing Learning Workspace...", "navy");
      navigate("/dashboard");
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-body overflow-x-hidden font-sans bg-[#f8f9fc]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(102, 238, 207, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(20, 46, 77, 0.04) 0%, transparent 50%), linear-gradient(rgba(20, 46, 77, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 46, 77, 0.02) 1px, transparent 1px)', backgroundSize: '100% 100%, 100% 100%, 36px 36px, 36px 36px' }}>

      {/* Top Navbar */}
      <header className="fixed top-0 inset-x-0 h-16 z-50 glass-nav transition-all duration-300">
        <div className="mx-auto max-w-[1280px] px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
            <div className="shrink-0 rounded-[9px] bg-navy w-8 h-8 grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#66EECF" strokeWidth="2" strokeLinecap="round">
                <path d="M3 16c2.5-7 15.5-7 18 0" />
                <line x1="3" y1="19" x2="21" y2="19" />
                <line x1="8" y1="13.2" x2="8" y2="19" />
                <line x1="16" y1="13.2" x2="16" y2="19" />
              </svg>
            </div>
            <span className="font-display font-extrabold text-[19px] text-navy tracking-tight">
              Curriculum Bridge
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("product")} 
              className="text-[14px] font-semibold text-body hover:text-navy cursor-pointer transition-colors"
            >
              Product
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="text-[14px] font-semibold text-body hover:text-navy cursor-pointer transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("impact")} 
              className="text-[14px] font-semibold text-body hover:text-navy cursor-pointer transition-colors"
            >
              Impact
            </button>
          </nav>

          <div className="flex items-center gap-5">
            <button 
              onClick={() => handleRoleSelection("student")}
              className="text-[14.5px] font-bold text-navy hover:text-navy-deep cursor-pointer transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => handleRoleSelection("student")}
              className="btn btn-navy h-10 px-5 rounded-[10px] shadow-sm hover:shadow-md cursor-pointer transition-all duration-200"
            >
              Launch Platform
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:py-36 mx-auto max-w-[1280px] px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[90vh]">
        
        {/* Left Content Column */}
        <div className="space-y-6 max-w-[620px] fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3.5 py-1.5 text-[12.5px] font-semibold text-navy backdrop-blur-sm shadow-sm select-none">
            <Sparkles size={13} className="text-teal animate-pulse" />
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-teal">AI-Powered Academic Intelligence</span>
          </div>

          <h1 className="font-display font-extrabold text-[44px] md:text-[58px] leading-[1.08] text-navy tracking-tight">
            Bridge the Gap Between <span className="bg-gradient-to-r from-navy via-teal to-[#16a385] bg-clip-text text-transparent">Curriculum</span> and Industry
          </h1>

          <p className="text-[16px] md:text-[17.5px] leading-relaxed text-body/90 font-medium">
            Identify missing skills in academic programs instantly. Align syllabi with real-time job market demands using our advanced curriculum intelligence engine.
          </p>

          {/* Handoff Role Entries */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => handleRoleSelection("professor")}
              className="btn btn-navy h-12 px-6 rounded-[12px] bg-navy text-white hover:bg-navy-deep shadow-md shadow-navy/15 hover:shadow-lg cursor-pointer transition-all duration-200"
            >
              <GraduationCap size={18} className="mr-1" />
              Enter as Professor
            </button>
            
            <button
              onClick={() => handleRoleSelection("student")}
              className="btn btn-outline h-12 px-6 rounded-[12px] border border-line bg-white/60 text-navy hover:bg-white/90 shadow-sm cursor-pointer transition-all duration-200"
            >
              <User size={17} className="mr-1" />
              Enter as Student
            </button>
          </div>
        </div>

        {/* Right Dashboard Mockup Column */}
        <div className="relative animate-slide-in-right flex justify-center lg:justify-end">
          
          {/* Main Browser Mockup */}
          <div className="w-full max-w-[480px] bg-white/70 border border-white/40 rounded-2xl shadow-[0_20px_50px_rgba(20,46,77,0.1)] backdrop-blur-md overflow-hidden animate-float-slow select-none">
            {/* Browser Header Bar */}
            <div className="bg-white/50 border-b border-line/45 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
                <span className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
              </div>
              <div className="h-6 w-full max-w-[280px] mx-auto bg-line/30 rounded-full border border-line/10 flex items-center justify-center text-[10px] text-muted font-medium px-4">
                platform.curriculumbridge.edu/health
              </div>
            </div>

            {/* Browser Content */}
            <div className="p-5 space-y-4 bg-white/10">
              
              {/* Fake Data Visualization Widgets */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl border border-white/50">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider">Curriculum Health</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-extrabold text-navy tracking-tight">88%</span>
                    <span className="text-[11.5px] font-bold text-teal">+4.2%</span>
                  </div>
                  <div className="h-1.5 w-full bg-line/40 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal to-mint animate-progress-draw" style={{ width: "88%" }} />
                  </div>
                </div>

                <div className="glass-card p-4 rounded-xl border border-white/50">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider">Skill Alignment</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-extrabold text-navy tracking-tight">92%</span>
                    <span className="text-[11.5px] font-bold text-teal">Optimal</span>
                  </div>
                  <div className="h-1.5 w-full bg-line/40 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal to-mint animate-progress-draw" style={{ width: "92%" }} />
                  </div>
                </div>
              </div>

              {/* Dummy Graph Mockup */}
              <div className="glass-card p-4 rounded-xl border border-white/50 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-navy uppercase tracking-wider">Academia vs Market Supply</p>
                  <span className="text-[10px] font-bold bg-mint-soft text-teal px-2 py-0.5 rounded-full">Automated Mapping</span>
                </div>
                <div className="h-20 flex items-end gap-2.5 pt-2">
                  <div className="w-full bg-line/35 h-[35%] rounded-t-sm" />
                  <div className="w-full bg-line/35 h-[65%] rounded-t-sm" />
                  <div className="w-full bg-gradient-to-t from-teal to-mint h-[85%] rounded-t-sm" />
                  <div className="w-full bg-line/35 h-[45%] rounded-t-sm" />
                  <div className="w-full bg-gradient-to-t from-navy to-body h-[95%] rounded-t-sm" />
                  <div className="w-full bg-line/35 h-[55%] rounded-t-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Overlapping Card: Skill Gap Detected */}
          <div className="absolute -bottom-8 -left-6 md:-left-12 w-full max-w-[280px] glass-card border border-white/60 p-4 rounded-xl shadow-lg animate-float-medium select-none z-10">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-mint-soft text-teal grid place-items-center shrink-0">
                <BarChart3 size={17} />
              </span>
              <div>
                <p className="font-display font-extrabold text-[13.5px] text-navy">Skill Gap Detected</p>
                <p className="text-[10.5px] text-muted font-semibold mt-0.5">Prompt Engineering missing</p>
              </div>
            </div>
            {/* Skeleton lines representing loading content */}
            <div className="mt-3.5 space-y-2">
              <div className="h-2 w-11/12 bg-line/60 rounded-full" />
              <div className="h-2 w-8/12 bg-line/60 rounded-full" />
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal uppercase tracking-wide">Resolution Recommendation</span>
              <span className="text-[11.5px] font-extrabold text-navy">Auto-Inject</span>
            </div>
            <div className="h-1.5 w-full bg-line/45 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-teal animate-progress-draw" style={{ width: "95%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section with Three.js Animation */}
      <section id="how-it-works" className="relative py-24 border-t border-line/60 bg-white/20">
        <div className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          
          {/* Left Column: Descriptions */}
          <div className="space-y-6 max-w-[560px]">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-mint-soft text-teal px-3 py-1 caps text-[10.5px]">
              Platform Workflow
            </div>
            <h2 className="font-display font-extrabold text-[36px] md:text-[44px] leading-tight text-navy">
              Dynamic Alignment in Real-Time
            </h2>
            <p className="text-[15.5px] text-body leading-relaxed">
              Curriculum Bridge bridges the gap between academic institutions and active industries using automated AI-powered mapping. Watch as courses dynamically updates to match job markets.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-mint text-navy font-bold text-[12px] grid place-items-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-[15px] text-navy">Ingest & Parse Syllabi</h4>
                  <p className="text-[13.5px] text-muted mt-1">Syllabi, learning paths, and credit constraints are uploaded and broken down into core skill components.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-mint text-navy font-bold text-[12px] grid place-items-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-[15px] text-navy">Continuous Market Crawling</h4>
                  <p className="text-[13.5px] text-muted mt-1">Our system monitors job listings and hiring patterns to maintain up-to-date industry skill benchmarks.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-mint text-navy font-bold text-[12px] grid place-items-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-[15px] text-navy">Semantic Gap Analytics</h4>
                  <p className="text-[13.5px] text-muted mt-1">Automatic detection of missing skills, proposing instant fixes aligned with academic standards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pure HTML/CSS/SVG Interactive Skill Network */}
          <div className="relative glass-card border border-white/50 p-6 rounded-2xl shadow-sm overflow-hidden flex flex-col items-center">
            <div className="absolute top-4 left-4 z-10 bg-white/80 border border-line px-3.5 py-1 rounded-full text-[11px] font-bold text-navy shadow-sm">
              <span className="live-dot inline-block mr-1.5 -mt-0.5" /> Interactive Skill Network
            </div>
            
            <SkillMapIllustration />
            
            <p className="text-[12.5px] font-semibold text-muted text-center max-w-[380px] -mt-2">
              Observe the floating skill nodes representing industry competencies and realigning syllabus mappings in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Product Showcase / Features */}
      <section id="product" className="py-24 bg-gradient-to-b from-transparent to-white/60">
        <div className="mx-auto max-w-[1280px] px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-navy text-white px-3 py-1 caps text-[10.5px]">
            System Features
          </div>
          <h2 className="font-display font-extrabold text-[36px] md:text-[44px] text-navy leading-none">
            Engineered for Modern Institutions
          </h2>
          <p className="text-[15.5px] text-muted max-w-[620px] mx-auto leading-relaxed">
            From regional accreditations to granular skill pathways, manage the entire lifecycle of education alignment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
            <div className="glass-card p-7 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-200 group">
              <span className="w-11 h-11 rounded-xl bg-mint-soft text-teal grid place-items-center shrink-0">
                <Cpu size={20} />
              </span>
              <h3 className="font-display font-bold text-[19px] text-navy mt-4 group-hover:text-teal transition-colors">AI Skill Extraction</h3>
              <p className="text-[13.5px] text-muted leading-relaxed mt-2.5">
                Automatically extracts structured capabilities and mappings from unstructured course materials with 98% accuracy.
              </p>
            </div>

            <div className="glass-card p-7 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-200 group">
              <span className="w-11 h-11 rounded-xl bg-mint-soft text-teal grid place-items-center shrink-0">
                <TrendingUp size={20} />
              </span>
              <h3 className="font-display font-bold text-[19px] text-navy mt-4 group-hover:text-teal transition-colors">Market Demand Feed</h3>
              <p className="text-[13.5px] text-muted leading-relaxed mt-2.5">
                Integrates live listings directly. Filter by geo-regions (e.g., GCC, EU) to tailer courses to local jobs.
              </p>
            </div>

            <div className="glass-card p-7 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-200 group">
              <span className="w-11 h-11 rounded-xl bg-mint-soft text-teal grid place-items-center shrink-0">
                <Layers size={20} />
              </span>
              <h3 className="font-display font-bold text-[19px] text-navy mt-4 group-hover:text-teal transition-colors">Accreditation Safety</h3>
              <p className="text-[13.5px] text-muted leading-relaxed mt-2.5">
                Human-in-the-loop triggers ensure syllabus suggestions never conflict with standard graduation requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact CTA Section */}
      <section id="impact" className="py-20 mx-auto max-w-[1280px] px-6">
        <div className="glass-card-dark p-10 md:p-14 rounded-3xl text-center space-y-6 relative overflow-hidden select-none">
          {/* Subtle grid background mask */}
          <div className="absolute inset-0 opacity-[0.06] animate-pulse-glow" style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #66EECF 0%, transparent 50%), linear-gradient(rgba(102,238,207,0.15) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 100% 30px"
          }} />
          
          <div className="relative z-10 space-y-4 max-w-[650px] mx-auto">
            <div className="inline-flex items-center gap-1 bg-white/10 text-mint border border-white/15 px-3 py-1 rounded-full text-[10.5px] caps">
              UAE Youth Hackathon Project
            </div>
            <h2 className="font-display font-extrabold text-[36px] md:text-[46px] text-white leading-tight">
              Ready to Align Your Curriculum?
            </h2>
            <p className="text-[14.5px] text-white/80 leading-relaxed font-medium">
              Join leading universities and tech programs globally bridging the gap between student graduation and instant career placement.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <button
                onClick={() => handleRoleSelection("professor")}
                className="btn btn-teal h-12 px-7 rounded-[12px] bg-teal text-white hover:bg-[#0a6a58] border-none font-bold cursor-pointer transition-all duration-200"
              >
                Launch as Professor
              </button>
              <button
                onClick={() => handleRoleSelection("student")}
                className="btn h-12 px-7 rounded-[12px] border border-white/20 bg-white/10 text-white hover:bg-white/25 cursor-pointer transition-all duration-200"
              >
                Launch as Student
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#E9EBF1] border-t border-line py-8">
        <div className="mx-auto max-w-[1280px] px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-[15px] text-navy">Curriculum Bridge</p>
            <p className="text-[12.5px] text-muted mt-1">
              © 2026 Curriculum Bridge. UAE Youth Hackathon Partner.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {["Institutional Policy", "Privacy Support", "Academic Standards", "Contact Us"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toast(`${link} opens in the full production portal.`);
                }}
                className="text-[13px] text-body hover:text-navy font-semibold transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
