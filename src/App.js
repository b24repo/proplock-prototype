import React, { useState, useEffect } from 'react';
import {FileText, Shield, CheckCircle, AlertCircle, Camera, Upload, FileCheck, Send,
  Clock, Download, Share2, TrendingUp, Key, Users, Activity, ChevronRight,
  Check, User, MapPin, DollarSign, Building, ArrowRight, Loader, CreditCard,
  Wallet, Bell} from 'lucide-react';
const PropLockPrototype = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [setBiometricVerified] = useState(false);
  const [setDocumentsUploaded] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);


  // Simulate transfer progress
  useEffect(() => {
    if (currentScreen === 'processing') {
      const interval = setInterval(() => {
        setTransferProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentScreen('completion'), 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const screens = {
    dashboard: <DashboardScreen setCurrentScreen={setCurrentScreen} />,
    propertyDetails: <PropertyDetailsScreen setCurrentScreen={setCurrentScreen} />,
    transferInit: <TransferInitScreen setCurrentScreen={setCurrentScreen} />,
    biometric: <BiometricScreen setCurrentScreen={setCurrentScreen} setBiometricVerified={setBiometricVerified} />,
    recipient: <RecipientScreen setCurrentScreen={setCurrentScreen} />,
    documents: <DocumentsScreen setCurrentScreen={setCurrentScreen} setDocumentsUploaded={setDocumentsUploaded} />,
    summary: <TransferSummaryScreen setCurrentScreen={setCurrentScreen} />,
    governmentFees: <GovernmentFeesScreen setCurrentScreen={setCurrentScreen} />,
    signature: <SignatureScreen setCurrentScreen={setCurrentScreen} />,
    contract: <ContractScreen setCurrentScreen={setCurrentScreen} />,
    recipientView: <RecipientNotificationScreen setCurrentScreen={setCurrentScreen} />,
    processing: <ProcessingScreen progress={transferProgress} />,
    completion: <CompletionScreen setCurrentScreen={setCurrentScreen} />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 mb-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Key className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">PropLock</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Welcome back</p>
                <p className="text-white font-semibold">Sarah Mitchell</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 min-h-[600px]">
          {screens[currentScreen]}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {Object.keys(screens).map((screen, index) => (
            <div
              key={screen}
              className={`w-2 h-2 rounded-full transition-all ${
                currentScreen === screen ? 'bg-purple-500 w-8' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Screen Components
const DashboardScreen = ({ setCurrentScreen }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white mb-8">Your Digital Assets</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
        <Building className="w-8 h-8 text-purple-400 mb-3" />
        <p className="text-gray-400 text-sm">Total Properties</p>
        <p className="text-2xl font-bold text-white">3</p>
      </div>
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30">
        <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
        <p className="text-gray-400 text-sm">Portfolio Value</p>
        <p className="text-2xl font-bold text-white">$2.4M</p>
      </div>
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30">
        <Activity className="w-8 h-8 text-green-400 mb-3" />
        <p className="text-gray-400 text-sm">Recent Transfers</p>
        <p className="text-2xl font-bold text-white">12</p>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Your Properties</h3>
      
      <div 
        onClick={() => setCurrentScreen('propertyDetails')}
        className="bg-white/5 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Building className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Sunset Boulevard Apartment</h4>
              <p className="text-gray-400 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" /> 
                Los Angeles, CA 90028
              </p>
              <div className="flex gap-4 mt-2">
                <span className="text-sm text-gray-400">
                  <span className="text-purple-400 font-semibold">$850,000</span> Value
                </span>
                <span className="text-sm text-gray-400">
                  <span className="text-green-400 font-semibold">Verified</span> Ownership
                </span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between opacity-60">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
              <Building className="w-10 h-10 text-gray-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Miami Beach Condo</h4>
              <p className="text-gray-400 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" /> 
                Miami, FL 33139
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PropertyDetailsScreen = ({ setCurrentScreen }) => (
  <div className="space-y-6">
    <button 
      onClick={() => setCurrentScreen('dashboard')}
      className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
    >
      <ChevronRight className="w-4 h-4 rotate-180" /> Back to Dashboard
    </button>

    <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl p-6 border border-purple-500/30">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Sunset Boulevard Apartment</h2>
          <p className="text-gray-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> 
            1234 Sunset Blvd, Los Angeles, CA 90028
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Current Value</p>
          <p className="text-3xl font-bold text-purple-400">$850,000</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/30 rounded-lg p-3">
          <p className="text-xs text-gray-400">Type</p>
          <p className="text-white font-semibold">Apartment</p>
        </div>
        <div className="bg-black/30 rounded-lg p-3">
          <p className="text-xs text-gray-400">Size</p>
          <p className="text-white font-semibold">1,250 sq ft</p>
        </div>
        <div className="bg-black/30 rounded-lg p-3">
          <p className="text-xs text-gray-400">Purchased</p>
          <p className="text-white font-semibold">2019</p>
        </div>
        <div className="bg-black/30 rounded-lg p-3">
          <p className="text-xs text-gray-400">Blockchain ID</p>
          <p className="text-white font-semibold text-xs">0x7f9a...</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Ownership History</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div className="flex-1">
              <p className="text-white">Current Owner: Sarah Mitchell</p>
              <p className="text-xs text-gray-400">Since March 15, 2019</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3 opacity-60">
            <Clock className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-gray-300">Previous: John Davidson</p>
              <p className="text-xs text-gray-400">2015 - 2019</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setCurrentScreen('transferInit')}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 mt-6"
      >
        <Send className="w-5 h-5" />
        Transfer Property
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white/5 rounded-xl p-4 border border-gray-700">
        <FileText className="w-6 h-6 text-purple-400 mb-2" />
        <p className="text-white font-semibold">Property Deed</p>
        <p className="text-xs text-gray-400">Verified • PDF</p>
      </div>
      <div className="bg-white/5 rounded-xl p-4 border border-gray-700">
        <FileCheck className="w-6 h-6 text-green-400 mb-2" />
        <p className="text-white font-semibold">Tax Records</p>
        <p className="text-xs text-gray-400">2024 • Paid</p>
      </div>
      <div className="bg-white/5 rounded-xl p-4 border border-gray-700">
        <Shield className="w-6 h-6 text-blue-400 mb-2" />
        <p className="text-white font-semibold">Insurance</p>
        <p className="text-xs text-gray-400">Active • Expires 2025</p>
      </div>
    </div>
  </div>
);

const TransferInitScreen = ({ setCurrentScreen }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Transfer Property</h2>
      <p className="text-gray-400">Choose how you'd like to transfer your property</p>
    </div>

    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-2">Property Details</h3>
        <p className="text-gray-300">Sunset Boulevard Apartment</p>
        <p className="text-sm text-gray-400">Los Angeles, CA • $850,000</p>
      </div>

      <div>
        <label className="text-white font-semibold mb-3 block">Transfer Type</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 text-purple-400" />
              <div className="w-4 h-4 rounded-full border border-gray-600"></div>
            </div>
            <p className="text-white font-semibold">Sale</p>
            <p className="text-xs text-gray-400">Transfer with payment</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border-2 border-purple-500 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-6 h-6 text-pink-400" />
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            </div>
            <p className="text-white font-semibold">Gift</p>
            <p className="text-xs text-gray-400">Family transfer</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-blue-400" />
              <div className="w-4 h-4 rounded-full border border-gray-600"></div>
            </div>
            <p className="text-white font-semibold">Inheritance</p>
            <p className="text-xs text-gray-400">Estate planning</p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-white font-semibold mb-3 block">Transfer Reason</label>
        <textarea 
          className="w-full bg-white/5 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          placeholder="Transferring to my son as part of estate planning..."
          rows={4}
          defaultValue="Transferring to my son David as part of my estate planning. This property has been in our family and I want to ensure a smooth transition."
        />
      </div>

      <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
        <div className="flex-1">
          <p className="text-yellow-400 font-semibold text-sm">Legal Notice</p>
          <p className="text-xs text-gray-300 mt-1">
            This transfer will be recorded on the blockchain and is legally binding. 
            All parties must verify their identity and consent to the transfer.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="agree" className="w-4 h-4 accent-purple-600" defaultChecked />
        <label htmlFor="agree" className="text-gray-300 text-sm">
          I understand and agree to the terms of this property transfer
        </label>
      </div>

      <button 
        onClick={() => setCurrentScreen('biometric')}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
      >
        Continue to Verification
      </button>
    </div>
  </div>
);

const BiometricScreen = ({ setCurrentScreen, setBiometricVerified }) => {
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [faceComplete, setFaceComplete] = useState(false);
  const [setOtpSent] = useState(false);
  const [currentStep, setCurrentStep] = useState('face'); // face, otp, password

  const handleVerification = () => {
    setScanning(true);
    setTimeout(() => {
      setFaceComplete(true);
      setScanning(false);
      setCurrentStep('otp');
      setOtpSent(true);
    }, 3000);
  };

  const handleOTPVerification = () => {
    setCurrentStep('password');
  };

  const handlePasswordVerification = () => {
    setVerified(true);
    setBiometricVerified(true);
    setTimeout(() => setCurrentScreen('recipient'), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Multi-Factor Authentication</h2>
        <p className="text-gray-400">Complete all security steps to proceed with this high-value transfer</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${currentStep === 'face' ? 'text-purple-400' : faceComplete ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${faceComplete ? 'bg-green-500' : currentStep === 'face' ? 'bg-purple-500' : 'bg-gray-600'}`}>
              {faceComplete ? <Check className="w-4 h-4 text-white" /> : '1'}
            </div>
            <span className="ml-2 text-sm">Face Scan</span>
          </div>
          <div className="w-8 h-px bg-gray-600"></div>
          <div className={`flex items-center ${currentStep === 'otp' ? 'text-purple-400' : currentStep === 'password' ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'password' ? 'bg-green-500' : currentStep === 'otp' ? 'bg-purple-500' : 'bg-gray-600'}`}>
              {currentStep === 'password' ? <Check className="w-4 h-4 text-white" /> : '2'}
            </div>
            <span className="ml-2 text-sm">OTP</span>
          </div>
          <div className="w-8 h-px bg-gray-600"></div>
          <div className={`flex items-center ${currentStep === 'password' ? 'text-purple-400' : verified ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${verified ? 'bg-green-500' : currentStep === 'password' ? 'bg-purple-500' : 'bg-gray-600'}`}>
              {verified ? <Check className="w-4 h-4 text-white" /> : '3'}
            </div>
            <span className="ml-2 text-sm">Password</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Face Recognition Step */}
        {currentStep === 'face' && (
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full border-4 ${faceComplete ? 'border-green-500' : 'border-purple-500'} flex items-center justify-center transition-colors mb-6`}>
                {faceComplete ? (
                  <CheckCircle className="w-16 h-16 text-green-400" />
                ) : scanning ? (
                  <div className="relative">
                    <Camera className="w-16 h-16 text-purple-400" />
                    <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                  </div>
                ) : (
                  <Camera className="w-16 h-16 text-purple-400" />
                )}
              </div>
              
              <div>
                {faceComplete ? (
                  <div className="text-green-400">
                    <p className="font-semibold text-lg">Face Verified!</p>
                    <p className="text-sm text-gray-400 mt-1">Step 1 of 3 complete</p>
                  </div>
                ) : scanning ? (
                  <p className="text-purple-400">Scanning face...</p>
                ) : (
                  <button 
                    onClick={handleVerification}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Start Face Scan
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* OTP Step */}
        {currentStep === 'otp' && (
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Enter Verification Code</h3>
              <p className="text-sm text-gray-400">We've sent a 6-digit code to your phone</p>
              <p className="text-xs text-gray-500 mt-1">+1 (555) ***-**89</p>
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1,2,3,4,5,6].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 bg-white/10 border border-gray-600 rounded-lg text-center text-white text-xl focus:border-purple-500 focus:outline-none"
                  defaultValue={i <= 4 ? Math.floor(Math.random() * 10) : ''}
                />
              ))}
            </div>

            <button 
              onClick={handleOTPVerification}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Verify Code
            </button>
            
            <p className="text-center text-sm text-gray-400 mt-4">
  Didn't receive code? 
  <button
    type="button"
    className="ml-1 text-purple-400 underline hover:text-purple-500 cursor-pointer"
  >
    Resend
  </button>
</p>

          </div>
        )}

        {/* Password Step */}
        {currentStep === 'password' && (
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
            <div className="text-center mb-6">
              <Key className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Enter PropLock Master Password</h3>
              <p className="text-sm text-gray-400">Final security step for this $850,000 transfer</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Master Password</label>
                <input
                  type="password"
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Enter your master password"
                  defaultValue="••••••••••••"
                />
              </div>

              <div className="bg-yellow-500/10 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                <p className="text-xs text-yellow-400">
                  High-value transaction: All three authentication factors required
                </p>
              </div>

              <button 
                onClick={handlePasswordVerification}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Complete Authentication
              </button>
            </div>
          </div>
        )}

        {/* Success State */}
        {verified && (
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-8 border border-green-500/30 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-white">All Security Checks Passed!</p>
            <p className="text-sm text-gray-400 mt-2">Redirecting to recipient details...</p>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className="max-w-md mx-auto mt-6">
        <div className="bg-white/5 rounded-xl p-4 border border-gray-700">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">Why Multiple Steps?</p>
              <p className="text-xs text-gray-400 mt-1">
                For transfers above $100,000, PropLock requires three-factor authentication 
                to ensure maximum security and prevent fraud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipientScreen = ({ setCurrentScreen }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Recipient Details</h2>
      <p className="text-gray-400">Who are you transferring the property to?</p>
    </div>

    <div className="space-y-4">
      <div>
        <label className="text-white font-semibold mb-3 block">Search Recipient</label>
        <div className="flex gap-3">
          <input 
            type="text" 
            className="flex-1 bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            placeholder="Enter PropLock ID, email, or phone number"
            defaultValue="david.mitchell@email.com"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recipient Found</h3>
          <CheckCircle className="w-6 h-6 text-green-400" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-lg">David Mitchell</p>
            <p className="text-gray-400">david.mitchell@email.com</p>
            <p className="text-xs text-gray-400 mt-1">PropLock ID: PLK-2024-DM-7829</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Verification Status</p>
            <p className="text-green-400 font-semibold">Verified</p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-white font-semibold mb-3 block">Relationship to Recipient</label>
        <select className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
          <option>Son</option>
          <option>Daughter</option>
          <option>Spouse</option>
          <option>Parent</option>
          <option>Other Family</option>
          <option>Business Partner</option>
          <option>Other</option>
        </select>
      </div>

      <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
        <div className="flex-1">
          <p className="text-blue-400 font-semibold text-sm">Security Notice</p>
          <p className="text-xs text-gray-300 mt-1">
            The recipient will receive a notification and must accept the transfer. 
            They will also need to complete identity verification.
          </p>
        </div>
      </div>

      <button 
        onClick={() => setCurrentScreen('documents')}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
      >
        Continue to Documents
      </button>
    </div>
  </div>
);

const DocumentsScreen = ({ setCurrentScreen, setDocumentsUploaded }) => {
  const [uploadStatus, setUploadStatus] = useState({
    deed: true,
    tax: true,
    insurance: false,
    disclosure: false
  });

  const handleUpload = (doc) => {
    setUploadStatus(prev => ({ ...prev, [doc]: true }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Required Documents</h2>
        <p className="text-gray-400">Upload all necessary documents for the transfer</p>
      </div>

      <div className="space-y-4">
        {[
          { id: 'deed', name: 'Property Deed', required: true, status: uploadStatus.deed },
          { id: 'tax', name: 'Latest Tax Records', required: true, status: uploadStatus.tax },
          { id: 'insurance', name: 'Insurance Documents', required: false, status: uploadStatus.insurance },
          { id: 'disclosure', name: 'Property Disclosure', required: true, status: uploadStatus.disclosure }
        ].map(doc => (
          <div key={doc.id} className={`bg-white/5 rounded-xl p-4 border ${doc.status ? 'border-green-500/50' : 'border-gray-700'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {doc.status ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <Upload className="w-6 h-6 text-gray-400" />
                )}
                <div>
                  <p className="text-white font-semibold">
                    {doc.name} {doc.required && <span className="text-red-400">*</span>}
                  </p>
                  <p className="text-xs text-gray-400">
                    {doc.status ? 'Uploaded and verified' : 'Click to upload'}
                  </p>
                </div>
              </div>
              {!doc.status && (
                <button 
                  onClick={() => handleUpload(doc.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30">
        <div className="flex items-center gap-3">
          <FileCheck className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-green-400 font-semibold">AI Verification Complete</p>
            <p className="text-xs text-gray-300">All documents have been analyzed and verified</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => {
          setDocumentsUploaded(true);
          setCurrentScreen('summary');
        }}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
      >
        Review Transfer Summary
      </button>
    </div>
  );
};

const TransferSummaryScreen = ({ setCurrentScreen }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Transfer Summary</h2>
      <p className="text-gray-400">Review all details before proceeding</p>
    </div>

    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Property</p>
            <p className="text-white font-semibold">Sunset Boulevard Apartment</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Location</p>
            <p className="text-white font-semibold">Los Angeles, CA</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Value</p>
            <p className="text-white font-semibold">$850,000</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Transfer Type</p>
            <p className="text-white font-semibold">Gift</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Transfer Parties</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Sarah Mitchell</p>
                <p className="text-xs text-gray-400">Current Owner</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-3">
              <div>
                <p className="text-white font-semibold text-right">David Mitchell</p>
                <p className="text-xs text-gray-400">New Owner</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Transfer Conditions</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-gray-300 text-sm">All documents verified</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-gray-300 text-sm">Identity verification complete</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-gray-300 text-sm">Legal requirements met</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-yellow-400 font-semibold text-sm">Estimated Completion Time</p>
              <p className="text-xs text-gray-300">24-48 hours after all parties sign</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setCurrentScreen('governmentFees')}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
      >
        Proceed to Government Fees & Taxes
      </button>
    </div>
  </div>
);

const GovernmentFeesScreen = ({ setCurrentScreen }) => {
  const [paymentMethod, setPaymentMethod] = useState('integrated');
  const propertyValue = 850000;
  const giftTaxExemption = 16000; // Annual gift tax exemption
  const stampDuty = propertyValue * 0.01; // 1% stamp duty for gifts
  const registrationFee = 500;
  const processingFee = 150;
  const totalFees = stampDuty + registrationFee + processingFee;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Government Fees & Taxes</h2>
        <p className="text-gray-400">Review and pay all government charges for this transfer</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Building className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">California State Requirements</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white">Stamp Duty (1% for gifts)</p>
              <p className="text-xs text-gray-400">Based on property value of ${propertyValue.toLocaleString()}</p>
            </div>
            <p className="text-white font-semibold">${stampDuty.toLocaleString()}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white">Registration Fee</p>
              <p className="text-xs text-gray-400">County recorder office</p>
            </div>
            <p className="text-white font-semibold">${registrationFee}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white">Processing Fee</p>
              <p className="text-xs text-gray-400">Digital processing charges</p>
            </div>
            <p className="text-white font-semibold">${processingFee}</p>
          </div>
          
          <div className="border-t border-gray-600 pt-3">
            <div className="flex justify-between items-center">
              <p className="text-white font-semibold">Total Government Fees</p>
              <p className="text-2xl font-bold text-blue-400">${totalFees.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <p className="text-green-400 font-semibold text-sm">Gift Tax Note</p>
            <p className="text-xs text-gray-300 mt-1">
              This transfer qualifies as a gift between family members. The annual gift tax exclusion 
              is ${giftTaxExemption.toLocaleString()} per person. Consult a tax advisor for amounts exceeding this limit.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-white font-semibold mb-3 block">Payment Method</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setPaymentMethod('integrated')}
            className={`bg-white/5 rounded-xl p-4 border-2 cursor-pointer ${paymentMethod === 'integrated' ? 'border-purple-500' : 'border-gray-700'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-6 h-6 text-purple-400" />
              <div className={`w-4 h-4 rounded-full ${paymentMethod === 'integrated' ? 'bg-purple-500' : 'border border-gray-600'}`}></div>
            </div>
            <p className="text-white font-semibold">PropLock Integrated Payment</p>
            <p className="text-xs text-gray-400">Pay directly through PropLock</p>
            <p className="text-xs text-green-400 mt-2">Instant processing</p>
          </div>
          
          <div 
            onClick={() => setPaymentMethod('bank')}
            className={`bg-white/5 rounded-xl p-4 border-2 cursor-pointer ${paymentMethod === 'bank' ? 'border-purple-500' : 'border-gray-700'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-6 h-6 text-blue-400" />
              <div className={`w-4 h-4 rounded-full ${paymentMethod === 'bank' ? 'bg-purple-500' : 'border border-gray-600'}`}></div>
            </div>
            <p className="text-white font-semibold">Bank Transfer</p>
            <p className="text-xs text-gray-400">Pay to government account</p>
            <p className="text-xs text-yellow-400 mt-2">Takes 2-3 business days</p>
          </div>
        </div>
      </div>

      {paymentMethod === 'integrated' && (
        <div className="bg-white/5 rounded-xl p-6 border border-gray-700">
          <h4 className="text-white font-semibold mb-4">Payment Details</h4>
          <div className="space-y-3">
            <input 
              type="text" 
              className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500"
              placeholder="Card Number"
              defaultValue="4532 •••• •••• 7829"
            />
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                className="bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                placeholder="MM/YY"
                defaultValue="12/26"
              />
              <input 
                type="text" 
                className="bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                placeholder="CVV"
                defaultValue="•••"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <p className="text-yellow-400 font-semibold text-sm">Government Integration</p>
            <p className="text-xs text-gray-300 mt-1">
              PropLock is integrated with California State Revenue Department and County Recorder's Office. 
              Your payment will be instantly transmitted to the appropriate government accounts.
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setCurrentScreen('signature')}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        Pay ${totalFees.toLocaleString()} & Continue
      </button>
    </div>
  );
};

const SignatureScreen = ({ setCurrentScreen }) => {
  const [signed, setSigned] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Digital Signature</h2>
        <p className="text-gray-400">Sign the transfer agreement digitally</p>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Transfer Agreement</h3>
        <div className="bg-black/30 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
          <p className="text-gray-300 text-sm leading-relaxed">
            This Property Transfer Agreement ("Agreement") is entered into on {new Date().toLocaleDateString()} 
            between Sarah Mitchell ("Transferor") and David Mitchell ("Transferee").
            <br/><br/>
            The Transferor hereby agrees to transfer all rights, title, and interest in the property 
            located at 1234 Sunset Blvd, Los Angeles, CA 90028 to the Transferee.
            <br/><br/>
            This transfer is recorded on the PropLock blockchain and is legally binding...
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center mb-4">
          {signed ? (
            <div className="text-3xl font-bold text-purple-400 italic">Sarah Mitchell</div>
          ) : (
            <div>
              <p className="text-gray-400 mb-4">Click below to sign</p>
              <button 
                onClick={() => setSigned(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Sign Document
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Shield className="w-4 h-4" />
          <p>Cryptographically secured signature • {new Date().toLocaleString()}</p>
        </div>
      </div>

      <button 
        onClick={() => setCurrentScreen('contract')}
        className={`w-full ${signed ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'} text-white font-semibold py-4 rounded-xl transition-all ${signed ? 'hover:shadow-lg hover:shadow-purple-500/25' : ''}`}
        disabled={!signed}
      >
        Generate Smart Contract
      </button>
    </div>
  );
};

const ContractScreen = ({ setCurrentScreen }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Smart Contract</h2>
      <p className="text-gray-400">Review the auto-generated blockchain contract</p>
    </div>

    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Contract Details</h3>
        <div className="bg-green-500/20 px-3 py-1 rounded-full">
          <p className="text-xs text-green-400 font-semibold">Ready to Deploy</p>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-300 mb-4">
        <pre>{`contract PropertyTransfer {
  address transferor = 0x7f9a...3d2e
  address transferee = 0x8b2c...9f1a
  
  property = {
    id: "PLK-PROP-2024-8534",
    location: "Los Angeles, CA",
    value: 850000 USD
  }
  
  function executeTransfer() {
    require(msg.sender == transferor)
    require(recipientAccepted == true)
    property.owner = transferee
    emit TransferComplete()
  }
}`}</pre>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/30 rounded-lg p-3">
          <p className="text-xs text-gray-400">Gas Fee Estimate</p>
          <p className="text-white font-semibold">0.025 ETH</p>
        </div>
        <div className="bg-black/30 rounded-lg p-3">
          <p className="text-xs text-gray-400">Network</p>
          <p className="text-white font-semibold">PropLock Chain</p>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
        <div>
          <p className="text-blue-400 font-semibold text-sm">Next Steps</p>
          <p className="text-xs text-gray-300 mt-1">
            Once deployed, the contract will notify the recipient. They must accept within 7 days.
          </p>
        </div>
      </div>
    </div>

    <button 
      onClick={() => setCurrentScreen('recipientView')}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
    >
      Deploy Contract & Notify Recipient
    </button>
  </div>
);

const RecipientNotificationScreen = ({ setCurrentScreen }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAccept = () => {
    setShowConfirmation(true);
  };

  const handleFinalConfirm = () => {
    setCurrentScreen('processing');
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30 mb-6">
        <p className="text-green-400 font-semibold text-center">
          Viewing as: David Mitchell (Recipient)
        </p>
      </div>

      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <Bell className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Property Transfer Request</h2>
        <p className="text-gray-400">You have received a property transfer</p>
      </div>

      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">From</p>
            <p className="text-white font-semibold text-lg">Sarah Mitchell</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Property</p>
            <p className="text-white font-semibold">Sunset Boulevard Apartment</p>
            <p className="text-gray-400 text-sm">Los Angeles, CA 90028</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Value</p>
              <p className="text-white font-semibold">$850,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Transfer Type</p>
              <p className="text-white font-semibold">Gift</p>
            </div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-sm text-gray-400">Message from Sender</p>
            <p className="text-gray-300 text-sm mt-1">
              "David, I'm transferring the Sunset Boulevard apartment to you as discussed. 
              This is part of our family estate planning."
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-xl transition-colors">
          Decline
        </button>
        <button 
          onClick={handleAccept}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Verify & Accept
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/30">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Confirm Transaction</h3>
              <p className="text-gray-400">Please review and confirm this property transfer</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 space-y-4 mb-6 border border-gray-700">
              <div className="flex justify-between items-center">
                <p className="text-gray-400">Property</p>
                <p className="text-white font-semibold">Sunset Boulevard Apt</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">From</p>
                <p className="text-white font-semibold">Sarah Mitchell</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">To</p>
                <p className="text-white font-semibold">David Mitchell</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">Value</p>
                <p className="text-white font-semibold">$850,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400">Transfer Type</p>
                <p className="text-white font-semibold">Gift Transfer</p>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Total Fees Paid</p>
                  <p className="text-purple-400 font-semibold">$9,150</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-yellow-400 font-semibold text-sm">Final Confirmation Required</p>
                  <p className="text-xs text-gray-300 mt-1">
                    This action is irreversible. Once confirmed, the property ownership will be 
                    permanently transferred and recorded on the blockchain.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleFinalConfirm}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProcessingScreen = ({ progress }) => (
  <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
    <div className="relative">
      <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
        <Loader className="w-16 h-16 text-white animate-spin" />
      </div>
      <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping opacity-30"></div>
    </div>

    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Processing Transfer</h2>
      <p className="text-gray-400">Recording on blockchain...</p>
    </div>

    <div className="w-full max-w-md">
      <div className="bg-white/10 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center text-purple-400 mt-2">{progress}%</p>
    </div>

    <div className="space-y-2 text-sm">
      <div className={`flex items-center gap-2 ${progress >= 25 ? 'text-green-400' : 'text-gray-500'}`}>
        <CheckCircle className="w-4 h-4" />
        <p>Identity verified</p>
      </div>
      <div className={`flex items-center gap-2 ${progress >= 50 ? 'text-green-400' : 'text-gray-500'}`}>
        <CheckCircle className="w-4 h-4" />
        <p>Smart contract executed</p>
      </div>
      <div className={`flex items-center gap-2 ${progress >= 75 ? 'text-green-400' : 'text-gray-500'}`}>
        <CheckCircle className="w-4 h-4" />
        <p>Blockchain confirmation</p>
      </div>
      <div className={`flex items-center gap-2 ${progress >= 100 ? 'text-green-400' : 'text-gray-500'}`}>
        <CheckCircle className="w-4 h-4" />
        <p>Transfer complete</p>
      </div>
    </div>
  </div>
);

const CompletionScreen = ({ setCurrentScreen }) => (
  <div className="text-center space-y-6">
    <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
      <CheckCircle className="w-16 h-16 text-white" />
    </div>

    <div>
      <h2 className="text-3xl font-bold text-white mb-2">Transfer Complete!</h2>
      <p className="text-gray-400">Property ownership has been successfully transferred</p>
    </div>

    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-white mb-4">Digital Certificate</h3>
      <div className="bg-black/30 rounded-lg p-4 space-y-2 text-left">
        <div className="flex justify-between">
          <p className="text-gray-400 text-sm">Property</p>
          <p className="text-white text-sm font-semibold">Sunset Boulevard Apt</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-400 text-sm">New Owner</p>
          <p className="text-white text-sm font-semibold">David Mitchell</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-400 text-sm">Transfer Date</p>
          <p className="text-white text-sm font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-400 text-sm">Blockchain ID</p>
          <p className="text-white text-sm font-mono">0x8f3d...7a2e</p>
        </div>
      </div>
    </div>

    <div className="flex gap-4 max-w-md mx-auto">
      <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
        <Download className="w-5 h-5" />
        Download
      </button>
      <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
        <Share2 className="w-5 h-5" />
        Share
      </button>
    </div>

    <button 
      onClick={() => setCurrentScreen('dashboard')}
      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
    >
      Back to Dashboard
    </button>
  </div>
);

// Utility component for icons we don't have
const Heart = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CustomBell = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

// App wrapper component
function App() {
  return (
    <>
      <PropLockPrototype />
      <CustomBell className="w-6 h-6 text-gray-500" />
    </>
  );
}


export default App;
