import React, { useState, useEffect } from 'react';
import { FileText, Shield, CheckCircle, AlertCircle, Camera, Upload, FileCheck, Send, Clock, Download, Share2, TrendingUp, Key, Users, Activity, ChevronRight, Check, User, MapPin, DollarSign, Building, ArrowRight, Loader, CreditCard, Wallet, Bell, Hospital, Fingerprint, Eye, Wifi, Globe, Database, Link } from 'lucide-react';

const PropLockPrototype = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('US');

  // Reset progress when returning to dashboard
  useEffect(() => {
    if (currentScreen === 'dashboard') {
      setTransferProgress(0);
      setBiometricVerified(false);
    }
  }, [currentScreen]);

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

  // Utility component for Heart icon
  const Heart = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );

  // 3D Property Card Component
  const Property3DCard = ({ property, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative preserve-3d transition-all duration-500 cursor-pointer"
        style={{
          transform: isHovered ? 'rotateY(5deg) rotateX(-5deg)' : 'rotateY(0deg) rotateX(0deg)',
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* 3D Shadow Effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-xl"
          style={{
            transform: 'translateZ(-20px) translateY(10px)',
            opacity: isHovered ? 0.6 : 0.3
          }}
        />
        
        {/* Main Card */}
        <div className={`bg-gradient-to-br ${property.gradient} rounded-xl p-6 border ${property.borderColor} relative overflow-hidden backdrop-blur-sm`}
          style={{
            transform: 'translateZ(0px)',
            boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.2)'
          }}
        >
          {/* 3D Property Visual */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 bg-gradient-to-r ${property.iconGradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <Building className="w-10 h-10 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{property.name}</h4>
                <p className="text-sm text-purple-300 font-mono">{property.proplockId}</p>
                {property.nextOfKin && (
                  <p className="text-xs text-gray-400 mt-1">Next of Kin: {property.nextOfKin}</p>
                )}
              </div>
            </div>
            <ChevronRight className={`w-6 h-6 text-gray-400 transition-transform ${isHovered ? 'translate-x-2 text-purple-400' : ''}`} />
          </div>
          
          {/* Property Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-black/20 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Location</p>
              <p className="text-white font-semibold">{property.location}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Size</p>
              <p className="text-white font-semibold">{property.size}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Value</p>
              <p className="text-green-400 font-semibold">${property.value}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Acquired</p>
              <p className="text-white font-semibold">{property.acquired}</p>
            </div>
          </div>
          
          {/* API Connection Status */}
          <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs">
                <Wifi className="w-3 h-3 text-green-400" />
                <span className="text-gray-400">Previous: {property.previousOwner}</span>
              </div>
              <div className="flex gap-2">
                {property.tags.map((tag, index) => (
                  <span key={index} className={`${tag.color} px-2 py-1 rounded text-xs flex items-center gap-1`}>
                    {tag.apiConnected && <Link className="w-3 h-3" />}
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Screen Components
  const DashboardScreen = ({ setCurrentScreen }) => {
    const properties = [
      {
        name: "Sunset Boulevard Apartment",
        proplockId: "PLK-PROP-2024-8534",
        location: "Los Angeles, CA",
        size: "1,250 sq ft",
        value: "850,000",
        acquired: "Mar 15, 2019",
        previousOwner: "John Davidson (2015-2019)",
        nextOfKin: "David Mitchell (Son)",
        gradient: "from-purple-900/80 to-pink-900/80",
        iconGradient: "from-purple-600 to-pink-600",
        borderColor: "border-purple-500/30",
        tags: [
          { label: "API Verified", color: "bg-green-500/20 text-green-400", apiConnected: true },
          { label: "Transferable", color: "bg-blue-500/20 text-blue-400", apiConnected: false }
        ]
      },
      {
        name: "Miami Beach Condo",
        proplockId: "PLK-PROP-2021-9847",
        location: "Miami, FL",
        size: "950 sq ft",
        value: "720,000",
        acquired: "Aug 12, 2021",
        previousOwner: "Miami Real Estate LLC",
        nextOfKin: "Sarah Mitchell (Spouse)",
        gradient: "from-blue-900/80 to-cyan-900/80",
        iconGradient: "from-blue-600 to-cyan-600",
        borderColor: "border-blue-500/30",
        tags: [
          { label: "API Verified", color: "bg-green-500/20 text-green-400", apiConnected: true },
          { label: "Loan Active", color: "bg-yellow-500/20 text-yellow-400", apiConnected: true }
        ]
      },
      {
        name: "Texas Ranch Property",
        proplockId: "PLK-PROP-2020-6721",
        location: "Austin, TX",
        size: "2.5 acres",
        value: "890,000",
        acquired: "Nov 3, 2020",
        previousOwner: "Texas Land Holdings Inc",
        nextOfKin: "Multiple (33.3% each child)",
        gradient: "from-green-900/80 to-emerald-900/80",
        iconGradient: "from-green-600 to-emerald-600",
        borderColor: "border-green-500/30",
        tags: [
          { label: "API Verified", color: "bg-green-500/20 text-green-400", apiConnected: true },
          { label: "Heritage", color: "bg-purple-500/20 text-purple-400", apiConnected: false }
        ]
      }
    ];

    return (
      <div className="space-y-6">
        {/* Country Selector */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Your Digital Assets Portfolio</h2>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-purple-400" />
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-white/10 border border-purple-500/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-400"
            >
              <option value="US">United States</option>
              <option value="CN">China</option>
              <option value="IN">India</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
        </div>
        
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
            <Database className="w-8 h-8 text-green-400 mb-3" />
            <p className="text-gray-400 text-sm">API Connections</p>
            <p className="text-2xl font-bold text-white">7 Active</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Digital 3D Property ID Cards</h3>
          
          {/* 3D Property Cards */}
          {properties.map((property, index) => (
            <Property3DCard 
              key={index}
              property={property}
              onClick={() => setCurrentScreen('propertyDetails')}
            />
          ))}
        </div>

        {/* Transfer Scenarios */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Transfer Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl p-4 border border-purple-500/30">
              <Heart className="w-6 h-6 text-purple-400 mb-2" />
              <p className="text-white font-semibold text-sm">Voluntary Transfer</p>
              <p className="text-xs text-gray-400">Gift or sale to family</p>
            </div>
            <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-xl p-4 border border-red-500/30">
              <Hospital className="w-6 h-6 text-red-400 mb-2" />
              <p className="text-white font-semibold text-sm">Hospital Death Certificate</p>
              <p className="text-xs text-gray-400">Auto-triggered transfer to next of kin</p>
            </div>
            <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-xl p-4 border border-green-500/30">
              <CreditCard className="w-6 h-6 text-green-400 mb-2" />
              <p className="text-white font-semibold text-sm">Bank Verification</p>
              <p className="text-xs text-gray-400">Property check for loan application</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-xl p-4 border border-yellow-500/30">
              <AlertCircle className="w-6 h-6 text-yellow-400 mb-2" />
              <p className="text-white font-semibold text-sm">Emergency Transfer</p>
              <p className="text-xs text-gray-400">Police-assisted scenarios</p>
            </div>
          </div>
        </div>

        {/* Government Partnership Notice */}
        <div className="mt-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-blue-400" />
            Live API Connections
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Government Registry</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Tax Department</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Insurance APIs</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Banking Network</span>
            </div>
          </div>
        </div>

        {/* Government Enforcement & Free Usage Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-400 font-semibold text-sm">FREE for All Citizens</p>
                <p className="text-xs text-gray-300 mt-1">
                  Government-mandated free usage for all property transfers. 
                  PropLock earns only from government fee sharing.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-red-400 font-semibold text-sm">Government Enforcement</p>
                <p className="text-xs text-gray-300 mt-1">
                  Properties not registered or transferred outside PropLock are 
                  subject to confiscation as stolen goods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
            <p className="text-xs text-gray-400">PropLock ID</p>
            <p className="text-purple-400 font-semibold text-xs">PLK-PROP-2024-8534</p>
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

        {/* Next of Kin Information */}
        <div className="mt-4 bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Registered Next of Kin
          </h4>
          <p className="text-sm text-gray-300">David Mitchell (Son) - PLK-2024-DM-7829</p>
          <p className="text-xs text-gray-400 mt-1">Auto-transfer enabled upon death certificate</p>
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
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-6 h-6 text-purple-400" />
            <Link className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-white font-semibold">Property Deed</p>
          <p className="text-xs text-gray-400">Government API Connected</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <FileCheck className="w-6 h-6 text-green-400" />
            <Link className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-white font-semibold">Tax Records</p>
          <p className="text-xs text-gray-400">Tax API Verified</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-6 h-6 text-blue-400" />
            <Link className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-white font-semibold">Insurance</p>
          <p className="text-xs text-gray-400">Insurance API Active</p>
        </div>
      </div>
    </div>
  );

  const TransferInitScreen = ({ setCurrentScreen }) => {
    const [transferType, setTransferType] = useState('gift');
    const [transferMode, setTransferMode] = useState('full');
    const [splitRecipients, setSplitRecipients] = useState([
      { name: '', percentage: 0, size: 0, proplockId: '', newPropertyId: '' }
    ]);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const propertySize = 1250;
    
    // Generate new property IDs for splits
    const generateNewPropertyId = (index) => {
      return `PLK-PROP-2025-${Math.floor(Math.random() * 9000) + 1000}`;
    };

    const addRecipient = () => {
      setSplitRecipients([...splitRecipients, { name: '', percentage: 0, size: 0, proplockId: '', newPropertyId: '' }]);
    };

    const updateRecipient = (index, field, value) => {
      const updated = [...splitRecipients];
      updated[index][field] = value;
      if (field === 'percentage') {
        updated[index].size = Math.round((value / 100) * propertySize);
      }
      // Generate new property ID when recipient is added
      if (field === 'proplockId' && value && !updated[index].newPropertyId) {
        updated[index].newPropertyId = generateNewPropertyId(index);
      }
      setSplitRecipients(updated);
    };

    const totalPercentage = splitRecipients.reduce((sum, recipient) => sum + (recipient.percentage || 0), 0);

    return (
      <div className="space-y-6">
        {/* Cancel Confirmation Dialog */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl p-6 border border-purple-500/30 max-w-md">
              <h3 className="text-xl font-bold text-white mb-3">Cancel Transfer?</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to cancel this transfer? All entered data will be lost.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setCurrentScreen('propertyDetails');
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  Yes, Cancel
                </button>
                <button 
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
                >
                  Continue Transfer
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentScreen('propertyDetails')}
            className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Property Details
          </button>
          <button 
            onClick={() => setShowCancelConfirm(true)}
            className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" /> Cancel Transfer
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Transfer Property</h2>
          <p className="text-gray-400">Choose how you'd like to transfer your property</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">Property Details</h3>
            <p className="text-gray-300">Sunset Boulevard Apartment</p>
            <p className="text-sm text-gray-400">Los Angeles, CA • {propertySize} sq ft • $850,000</p>
            <p className="text-xs text-purple-400 font-mono mt-1">PropLock ID: PLK-PROP-2024-8534</p>
          </div>

          <div>
            <label className="text-white font-semibold mb-3 block">Transfer Mode</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div 
                onClick={() => setTransferMode('full')}
                className={`bg-white/5 rounded-xl p-4 border-2 cursor-pointer ${transferMode === 'full' ? 'border-purple-500' : 'border-gray-700'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Building className="w-6 h-6 text-purple-400" />
                  <div className={`w-4 h-4 rounded-full ${transferMode === 'full' ? 'bg-purple-500' : 'border border-gray-600'}`}></div>
                </div>
                <p className="text-white font-semibold">Full Property Transfer</p>
                <p className="text-xs text-gray-400">Transfer entire property to one recipient</p>
              </div>
              <div 
                onClick={() => setTransferMode('split')}
                className={`bg-white/5 rounded-xl p-4 border-2 cursor-pointer ${transferMode === 'split' ? 'border-purple-500' : 'border-gray-700'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  <div className={`w-4 h-4 rounded-full ${transferMode === 'split' ? 'bg-purple-500' : 'border border-gray-600'}`}></div>
                </div>
                <p className="text-white font-semibold">Split Property Transfer</p>
                <p className="text-xs text-gray-400">Divide property among multiple recipients</p>
              </div>
            </div>
          </div>

          {transferMode === 'split' && (
            <div className="bg-white/5 rounded-xl p-6 border border-gray-700">
              <h4 className="text-white font-semibold mb-4">Property Split Configuration</h4>
              <p className="text-xs text-gray-400 mb-4">Each recipient will receive a new unique PropLock ID for their portion</p>
              <div className="space-y-4">
                {splitRecipients.map((recipient, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="text-xs text-gray-400">Recipient Name</label>
                        <input
                          type="text"
                          className="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                          placeholder="Enter name"
                          value={recipient.name}
                          onChange={(e) => updateRecipient(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">PropLock ID</label>
                        <input
                          type="text"
                          className="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm font-mono"
                          placeholder="PLK-XXXX-XX-XXXX"
                          value={recipient.proplockId}
                          onChange={(e) => updateRecipient(index, 'proplockId', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">Percentage (%)</label>
                        <input
                          type="number"
                          max="100"
                          min="0"
                          className="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                          placeholder="0"
                          value={recipient.percentage}
                          onChange={(e) => updateRecipient(index, 'percentage', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">Area (sq ft)</label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-300 text-sm"
                          value={recipient.size}
                          readOnly
                        />
                      </div>
                    </div>
                    {recipient.newPropertyId && (
                      <div className="mt-3 bg-green-500/10 rounded-lg p-2 border border-green-500/30">
                        <p className="text-xs text-green-400">
                          New Property ID will be generated: <span className="font-mono">{recipient.newPropertyId}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={addRecipient}
                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                  >
                    <Users className="w-4 h-4" /> Add Recipient
                  </button>
                  <div className={`text-sm ${totalPercentage === 100 ? 'text-green-400' : totalPercentage > 100 ? 'text-red-400' : 'text-yellow-400'}`}>
                    Total: {totalPercentage}% of {propertySize} sq ft
                  </div>
                </div>
                
                {totalPercentage !== 100 && (
                  <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                    <p className="text-yellow-400 text-sm">
                      ⚠️ Total percentage must equal 100% to proceed
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="text-white font-semibold mb-3 block">Transfer Type</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div 
                onClick={() => setTransferType('sale')}
                className={`bg-white/5 rounded-xl p-4 border-2 cursor-pointer ${transferType === 'sale' ? 'border-purple-500' : 'border-gray-700'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                  <div className={`w-4 h-4 rounded-full ${transferType === 'sale' ? 'bg-purple-500' : 'border border-gray-600'}`}></div>
                </div>
                <p className="text-white font-semibold">Sale</p>
                <p className="text-xs text-gray-400">Transfer with payment</p>
              </div>
              <div 
                onClick={() => setTransferType('gift')}
                className={`bg-white/5 rounded-xl p-4 border-2 cursor-pointer ${transferType === 'gift' ? 'border-purple-500' : 'border-gray-700'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Heart className="w-6 h-6 text-pink-400" />
                  <div className={`w-4 h-4 rounded-full ${transferType === 'gift' ? 'bg-purple-500' : 'border border-gray-600'}`}></div>
                </div>
                <p className="text-white font-semibold">Gift</p>
                <p className="text-xs text-gray-400">Family transfer</p>
              </div>
              <div 
                onClick={() => setTransferType('inheritance')}
                className={`bg-white/5 rounded-xl p-4 border-2 cursor-pointer ${transferType === 'inheritance' ? 'border-purple-500' : 'border-gray-700'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  <div className={`w-4 h-4 rounded-full ${transferType === 'inheritance' ? 'bg-purple-500' : 'border border-gray-600'}`}></div>
                </div>
                <p className="text-white font-semibold">Inheritance</p>
                <p className="text-xs text-gray-400">Estate planning</p>
              </div>
              <div 
                onClick={() => setTransferType('death')}
                className={`bg-white/5 rounded-xl p-4 border-2 cursor-pointer ${transferType === 'death' ? 'border-purple-500' : 'border-gray-700'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Hospital className="w-6 h-6 text-red-400" />
                  <div className={`w-4 h-4 rounded-full ${transferType === 'death' ? 'bg-purple-500' : 'border border-gray-600'}`}></div>
                </div>
                <p className="text-white font-semibold">Death Certificate</p>
                <p className="text-xs text-gray-400">Hospital triggered</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setCurrentScreen('biometric')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            disabled={transferMode === 'split' && totalPercentage !== 100}
          >
            Continue to Enhanced Security Verification
          </button>
        </div>
      </div>
    );
  };

  const BiometricScreen = ({ setCurrentScreen, setBiometricVerified }) => {
    const [scanning, setScanning] = useState(false);
    const [currentStep, setCurrentStep] = useState('selection');
    const [selectedBiometric, setSelectedBiometric] = useState('');
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [verificationSteps, setVerificationSteps] = useState({
      face: false,
      fingerprint: false,
      eye: false
    });

    const handleBiometricSelection = (type) => {
      setSelectedBiometric(type);
      setCurrentStep('scanning');
      setScanning(true);
      
      setTimeout(() => {
        setVerificationSteps(prev => ({ ...prev, [type]: true }));
        setScanning(false);
        
        // Check if all required biometrics are verified (at least 2 out of 3)
        const verifiedCount = Object.values({ ...verificationSteps, [type]: true }).filter(v => v).length;
        if (verifiedCount >= 2) {
          setBiometricVerified(true);
          setTimeout(() => setCurrentScreen('recipient'), 1500);
        } else {
          setCurrentStep('selection');
        }
      }, 2000);
    };

    const handleEmergencyReport = () => {
      setEmergencyMode(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentScreen('transferInit')}
            className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Transfer Setup
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Cancel this transfer and return to dashboard?')) {
                setCurrentScreen('dashboard');
              }
            }}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Cancel Transfer
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Enhanced Security Authentication</h2>
          <p className="text-gray-400">Complete at least 2 biometric verifications</p>
        </div>

        {!emergencyMode && (
          <div className="flex justify-center">
            <button 
              onClick={handleEmergencyReport}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Emergency: Report Forced Transfer
            </button>
          </div>
        )}

        {emergencyMode ? (
          <div className="bg-red-500/20 rounded-xl p-6 border border-red-500/30 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-400 font-semibold text-lg">Emergency Report Sent</p>
            <p className="text-sm text-gray-300 mt-2">
              Police have been notified of potential forced transfer. Transaction halted.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Report ID: EMRG-2025-8534 • Response Time: 2-5 minutes
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {currentStep === 'selection' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Face Recognition */}
                  <div 
                    onClick={() => !verificationSteps.face && handleBiometricSelection('face')}
                    className={`bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30 cursor-pointer transition-all ${verificationSteps.face ? 'opacity-50' : 'hover:scale-105'}`}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full border-4 border-purple-500 flex items-center justify-center mb-3">
                        {verificationSteps.face ? (
                          <CheckCircle className="w-10 h-10 text-green-400" />
                        ) : (
                          <Camera className="w-10 h-10 text-purple-400" />
                        )}
                      </div>
                      <p className="text-white font-semibold">Face Recognition</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {verificationSteps.face ? 'Verified' : '3D Face Scan'}
                      </p>
                    </div>
                  </div>

                  {/* Fingerprint */}
                  <div 
                    onClick={() => !verificationSteps.fingerprint && handleBiometricSelection('fingerprint')}
                    className={`bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30 cursor-pointer transition-all ${verificationSteps.fingerprint ? 'opacity-50' : 'hover:scale-105'}`}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full border-4 border-blue-500 flex items-center justify-center mb-3">
                        {verificationSteps.fingerprint ? (
                          <CheckCircle className="w-10 h-10 text-green-400" />
                        ) : (
                          <Fingerprint className="w-10 h-10 text-blue-400" />
                        )}
                      </div>
                      <p className="text-white font-semibold">Fingerprint</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {verificationSteps.fingerprint ? 'Verified' : 'Touch Scanner'}
                      </p>
                    </div>
                  </div>

                  {/* Eye Scan */}
                  <div 
                    onClick={() => !verificationSteps.eye && handleBiometricSelection('eye')}
                    className={`bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30 cursor-pointer transition-all ${verificationSteps.eye ? 'opacity-50' : 'hover:scale-105'}`}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center mb-3">
                        {verificationSteps.eye ? (
                          <CheckCircle className="w-10 h-10 text-green-400" />
                        ) : (
                          <Eye className="w-10 h-10 text-green-400" />
                        )}
                      </div>
                      <p className="text-white font-semibold">Eye Scan</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {verificationSteps.eye ? 'Verified' : 'Iris Recognition'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Verified: {Object.values(verificationSteps).filter(v => v).length} of 3
                  </p>
                  <p className="text-xs text-purple-400 mt-1">
                    Minimum 2 required for high-value transfers
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'scanning' && (
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full border-4 border-purple-500 flex items-center justify-center mb-6">
                    <Loader className="w-16 h-16 text-purple-400 animate-spin" />
                  </div>
                  <p className="text-purple-400 text-lg">
                    {selectedBiometric === 'face' && 'Scanning face...'}
                    {selectedBiometric === 'fingerprint' && 'Reading fingerprint...'}
                    {selectedBiometric === 'eye' && 'Scanning iris pattern...'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Please remain still</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const RecipientScreen = ({ setCurrentScreen }) => (
    <div className="space-y-6">
      <button 
        onClick={() => setCurrentScreen('biometric')}
        className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
      >
        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Security
      </button>

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Recipient Details</h2>
        <p className="text-gray-400">Enter recipient's PropLock ID for secure transfer</p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-blue-400 font-semibold text-sm">PropLock ID Required</p>
            <p className="text-xs text-gray-300 mt-1">
              Both parties must have verified PropLock IDs for secure property transfers. 
              This ensures government compliance and fraud prevention.
            </p>
          </div>
        </div>

        <div>
          <label className="text-white font-semibold mb-3 block">Search by PropLock ID</label>
          <div className="flex gap-3">
            <input 
              type="text" 
              className="flex-1 bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none font-mono"
              placeholder="PLK-2024-XX-XXXX"
              defaultValue="PLK-2024-DM-7829"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors">
              Search
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">PropLock IDs only • No email or phone numbers</p>
        </div>

        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">PropLock ID Verified</h3>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-lg">David Mitchell</p>
              <p className="text-blue-400 font-mono text-sm">PLK-2024-DM-7829</p>
              <p className="text-xs text-gray-400 mt-1">Verified Member • KYC Complete</p>
            </div>
            <div className="text-right">
              <div className="flex flex-col gap-1">
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded flex items-center gap-1">
                  <Link className="w-3 h-3" /> Government API
                </span>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded flex items-center gap-1">
                  <Fingerprint className="w-3 h-3" /> Biometrics OK
                </span>
              </div>
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
            <option>Bank (Loan Verification)</option>
            <option>Other</option>
          </select>
        </div>

        <button 
          onClick={() => setCurrentScreen('governmentFees')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          Continue to Government Fees
        </button>
      </div>
    </div>
  );

  const GovernmentFeesScreen = ({ setCurrentScreen }) => {
    const [paymentMethod, setPaymentMethod] = useState('integrated');
    const propertyValue = 850000;
    const stampDuty = propertyValue * 0.01;
    const registrationFee = 500;
    const processingFee = 150;
    const propLockFee = 250;
    const totalFees = stampDuty + registrationFee + processingFee + propLockFee;
    const govRevenue = Math.round(totalFees * 0.85);
    const propLockRevenue = Math.round(totalFees * 0.15);

    return (
      <div className="space-y-6">
        <button 
          onClick={() => setCurrentScreen('recipient')}
          className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Recipient
        </button>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Government Fees & PropLock Revenue</h2>
          <p className="text-gray-400">Government partnership model - PropLock earns from fee sharing</p>
          <p className="text-green-400 text-sm mt-1">✓ FREE for all citizens - Government pays infrastructure costs</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">California State Requirements</h3>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded ml-auto">
              {selectedCountry} Tax System
            </span>
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
                <p className="text-white">Digital Processing Fee</p>
                <p className="text-xs text-gray-400">Government digital infrastructure</p>
              </div>
              <p className="text-white font-semibold">${processingFee}</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-white">PropLock Service Fee</p>
                <p className="text-xs text-gray-400">Platform & blockchain services</p>
              </div>
              <p className="text-purple-400 font-semibold">${propLockFee}</p>
            </div>
            
            <div className="border-t border-gray-600 pt-3">
              <div className="flex justify-between items-center">
                <p className="text-white font-semibold">Total Fees</p>
                <p className="text-2xl font-bold text-blue-400">${totalFees.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Sharing Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-400 font-semibold text-sm">Government Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">${govRevenue}</p>
                <p className="text-xs text-gray-300 mt-1">
                  85% of total fees • Real-time collection
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <p className="text-purple-400 font-semibold text-sm">PropLock Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">${propLockRevenue}</p>
                <p className="text-xs text-gray-300 mt-1">
                  15% partnership share • Per transaction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Government Infrastructure Note */}
        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-semibold text-sm">Government Data Center</p>
              <p className="text-xs text-gray-300 mt-1">
                {selectedCountry} government maintains their own backend infrastructure. 
                PropLock provides annual maintenance worth billions for continuous support.
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
              <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                <Link className="w-3 h-3" /> Instant API processing
              </p>
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

        <button 
          onClick={() => setCurrentScreen('processing')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Pay ${totalFees.toLocaleString()} & Complete Transfer
        </button>
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
        <p className="text-gray-400">Recording on blockchain and notifying government APIs...</p>
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
          <p>Biometric verification complete</p>
        </div>
        <div className={`flex items-center gap-2 ${progress >= 50 ? 'text-green-400' : 'text-gray-500'}`}>
          <CheckCircle className="w-4 h-4" />
          <p>Government APIs notified</p>
        </div>
        <div className={`flex items-center gap-2 ${progress >= 75 ? 'text-green-400' : 'text-gray-500'}`}>
          <CheckCircle className="w-4 h-4" />
          <p>PropLock fee sharing complete</p>
        </div>
        <div className={`flex items-center gap-2 ${progress >= 100 ? 'text-green-400' : 'text-gray-500'}`}>
          <CheckCircle className="w-4 h-4" />
          <p>New property ID generated</p>
        </div>
      </div>

      {/* Real-time Government Portal Update */}
      {progress >= 50 && (
        <div className="mt-6 bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 max-w-md">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-blue-400 font-semibold text-sm">Government Portal Updated</p>
              <p className="text-xs text-gray-300">Transaction visible in real-time to authorities</p>
            </div>
          </div>
        </div>
      )}
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
        <h3 className="text-lg font-semibold text-white mb-4">Transfer Confirmation</h3>
        <div className="bg-black/30 rounded-lg p-4 space-y-2 text-left">
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">Property</p>
            <p className="text-white text-sm font-semibold">Sunset Boulevard Apt</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">Previous Owner</p>
            <p className="text-white text-sm font-semibold">Sarah Mitchell</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">New Owner</p>
            <p className="text-white text-sm font-semibold">David Mitchell</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">New Property ID</p>
            <p className="text-purple-400 text-sm font-mono">PLK-PROP-2025-9247</p>
          </div>
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="flex justify-between">
              <p className="text-gray-400 text-sm">Government Revenue</p>
              <p className="text-blue-400 text-sm font-semibold">$7,735 (85%)</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400 text-sm">PropLock Revenue</p>
              <p className="text-green-400 text-sm font-semibold">$1,365 (15%)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
          <div className="text-left">
            <p className="text-blue-400 font-semibold text-sm">Security Notice</p>
            <p className="text-xs text-gray-300 mt-1">
              Property instantly transferred to recipient's PropLock account. 
              No downloads or documents needed - fully digital and secure.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <Wifi className="w-5 h-5 text-green-400 mt-0.5" />
          <div className="text-left">
            <p className="text-green-400 font-semibold text-sm">Real-Time Government Updates</p>
            <p className="text-xs text-gray-300 mt-1">
              All relevant government agencies notified via API. 
              Tax records, land registry, and insurance updated automatically.
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setCurrentScreen('dashboard')}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
      >
        Return to Dashboard
      </button>
    </div>
  );

  const screens = {
    dashboard: <DashboardScreen setCurrentScreen={setCurrentScreen} />,
    propertyDetails: <PropertyDetailsScreen setCurrentScreen={setCurrentScreen} />,
    transferInit: <TransferInitScreen setCurrentScreen={setCurrentScreen} />,
    biometric: <BiometricScreen setCurrentScreen={setCurrentScreen} setBiometricVerified={setBiometricVerified} />,
    recipient: <RecipientScreen setCurrentScreen={setCurrentScreen} />,
    governmentFees: <GovernmentFeesScreen setCurrentScreen={setCurrentScreen} />,
    processing: <ProcessingScreen progress={transferProgress} />,
    completion: <CompletionScreen setCurrentScreen={setCurrentScreen} />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
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

        {/* Current Screen Indicator */}
        <div className="mt-6 text-center">
          <span className="text-purple-400 text-sm">
            Current: {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropLockPrototype;
