import React from "react";
import { Leaf, Scan, Brain, Sparkles } from "lucide-react";
import  { useContext } from "react";
import { AppContext } from "../context/Appcontext";

export const Footer = () => {
         const { setshowlogin } = useContext(AppContext);
  return (
    <div className="relative bg-gradient-to-b from-green-50 to-white py-20 px-4 overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-green-100/30 blur-3xl rounded-full"></div>
      <div className="absolute top-20 right-10 w-60 h-60 bg-emerald-200/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-green-100/50 rounded-3xl blur-lg group-hover:bg-green-200/60 transition-all duration-300"></div>
            <div className="relative bg-white rounded-2xl p-6 border-2 border-green-100 shadow-lg hover:shadow-xl hover:border-green-300 transition-all duration-300 group-hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Scan className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">1. Capture</h3>
              <p className="text-green-700/80 text-sm">Upload a clear photo of your plant's leaves or affected areas</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-emerald-100/50 rounded-3xl blur-lg group-hover:bg-emerald-200/60 transition-all duration-300"></div>
            <div className="relative bg-white rounded-2xl p-6 border-2 border-emerald-100 shadow-lg hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group-hover:scale-105">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <Brain className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">2. Analyze</h3>
              <p className="text-emerald-700/80 text-sm">Our AI model processes the image to identify diseases with 95% accuracy</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-amber-100/50 rounded-3xl blur-lg group-hover:bg-amber-200/60 transition-all duration-300"></div>
            <div className="relative bg-white rounded-2xl p-6 border-2 border-amber-100 shadow-lg hover:shadow-xl hover:border-amber-300 transition-all duration-300 group-hover:scale-105">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                <Sparkles className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">3. Generate</h3>
              <p className="text-amber-700/80 text-sm">Gemini AI creates personalized treatment plans and prevention strategies</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-teal-100/50 rounded-3xl blur-lg group-hover:bg-teal-200/60 transition-all duration-300"></div>
            <div className="relative bg-white rounded-2xl p-6 border-2 border-teal-100 shadow-lg hover:shadow-xl hover:border-teal-300 transition-all duration-300 group-hover:scale-105">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                <Leaf className="w-6 h-6 text-teal-700" />
              </div>
              <h3 className="text-lg font-semibold text-teal-900 mb-2">4. Grow</h3>
              <p className="text-teal-700/80 text-sm">Implement the advice and watch your plants thrive with expert guidance</p>
            </div>
          </div>

        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <p className="text-green-700/80 text-lg mb-6">
            Ready to transform your gardening experience?
          </p>
          <button onClick={() => setshowlogin(true)} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Start Analyzing Now
          </button>
        </div>

        {/* Footer bottom */}
        <div className="text-center mt-16 pt-8 border-t border-green-100">
          <p className="text-green-600/70 text-sm">
            © 2025 PlantAI • Made with 🌱 for gardeners everywhere
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;