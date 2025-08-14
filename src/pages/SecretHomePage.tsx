import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  FileText, 
  Building2, 
  CreditCard, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Users,
  Clock
} from "lucide-react";

const SecretHomePage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: FileText,
      title: "Smart Invoice Processing",
      description: "AI-powered invoice management with automatic data extraction",
      color: "from-blue-500 to-cyan-500",
      stats: "95% accuracy",
      delay: 0.1
    },
    {
      icon: Building2,
      title: "Portal Integration Hub",
      description: "Seamlessly connect with 100+ supplier portals",
      color: "from-purple-500 to-pink-500",
      stats: "100+ portals",
      delay: 0.2
    },
    {
      icon: CreditCard,
      title: "Payment Intelligence",
      description: "Optimize payment timing and cash flow management",
      color: "from-green-500 to-emerald-500",
      stats: "30% savings",
      delay: 0.3
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive insights and predictive analytics",
      color: "from-orange-500 to-red-500",
      stats: "Real-time",
      delay: 0.4
    }
  ];

  const metrics = [
    { label: "Active Invoices", value: "2,847", change: "+12%" },
    { label: "Processing Rate", value: "99.7%", change: "+2.3%" },
    { label: "Time Saved", value: "148 hrs", change: "+25%" },
    { label: "Cost Reduction", value: "$47K", change: "+18%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-lighter/20 via-transparent to-primary-light/10" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-primary-main/10 to-transparent blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-primary-main/10 text-primary-main border-primary-main/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Next-Gen AP Automation
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-primary-main to-primary-dark bg-clip-text text-transparent mb-6">
                Intelligent Finance
                <br />
                <span className="text-4xl lg:text-6xl">Automation Platform</span>
              </h1>
              
              <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-8">
                Transform your accounts payable with AI-driven automation, 
                seamless portal integration, and intelligent payment optimization.
              </p>

              <div className="flex gap-4 justify-center mb-12">
                <Button size="lg" className="bg-primary-main hover:bg-primary-dark">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>

              {/* Live Metrics Bar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
              >
                {metrics.map((metric, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                    <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}
                    </Badge>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features, Simple Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to modernize your AP operations in one unified platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={`p-6 h-full transition-all duration-300 cursor-pointer ${
                  hoveredCard === idx ? 'shadow-2xl scale-105' : 'shadow-md'
                }`}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} 
                    flex items-center justify-center mb-4 ${
                    hoveredCard === idx ? 'animate-pulse' : ''
                  }`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {feature.stats}
                    </Badge>
                    <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${
                      hoveredCard === idx ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-white"
            >
              <Shield className="w-8 h-8 mx-auto mb-3 text-primary-light" />
              <div className="text-2xl font-bold">SOC 2</div>
              <div className="text-sm text-gray-400">Type II Certified</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white"
            >
              <Globe className="w-8 h-8 mx-auto mb-3 text-primary-light" />
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-gray-400">Countries Supported</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              <Users className="w-8 h-8 mx-auto mb-3 text-primary-light" />
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white"
            >
              <Clock className="w-8 h-8 mx-auto mb-3 text-primary-light" />
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm text-gray-400">Uptime SLA</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="bg-gradient-to-r from-primary-main to-primary-dark rounded-3xl p-12 text-white">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your AP Process?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of finance teams automating their operations with Monto
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-main hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecretHomePage;