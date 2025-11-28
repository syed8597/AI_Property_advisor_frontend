import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import {
  Home, Building2, Wallet, FileText, Settings, LogOut, Bell, Search,
  DollarSign, MapPin, Calendar, ArrowUpRight, ArrowDownRight,
  Plus, Filter, Download, User, Target, Shield, Map, Edit, AlertCircle, CheckCircle
} from "lucide-react";
import { useLogout } from '../hooks/useLogout';
import { useProfile } from '../hooks/useProfile';
const InvestorDashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");
  const { handleLogout } = useLogout();
  const { profile, loading, error, updateProfile, fetchProfile } = useProfile();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [profileForm, setProfileForm] = useState({
    min_budget: '', max_budget: '', preferred_locations: [], investment_goal: 'MIXED',
    risk_tolerance: 'MEDIUM', address: '', city: '', state: '', country: 'USA', zipcode: ''
  });
  const investmentGoals = [
    { value: 'RENTAL_INCOME', label: 'Rental Income' },
    { value: 'CAPITAL_APPRECIATION', label: 'Capital Appreciation' },
    { value: 'MIXED', label: 'Mixed Strategy' }
  ];

  const riskTolerances = [
    { value: 'LOW', label: 'Low Risk' },
    { value: 'MEDIUM', label: 'Medium Risk' },
    { value: 'HIGH', label: 'High Risk' }
  ];

  const calculateProfileCompletion = () => {
    if (!profile) return 0;
    const fields = [profile.min_budget, profile.max_budget, profile.preferred_locations?.length > 0,
      profile.investment_goal, profile.risk_tolerance];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  };


  const profileCompletion = calculateProfileCompletion();

  useEffect(() => {
    if (profile) {
      setProfileForm({
        min_budget: profile.min_budget || '', max_budget: profile.max_budget || '',
        preferred_locations: profile.preferred_locations || [], investment_goal: profile.investment_goal || 'MIXED',
        risk_tolerance: profile.risk_tolerance || 'MEDIUM', address: profile.address || '',
        city: profile.city || '', state: profile.state || '', country: profile.country || 'USA',
        zipcode: profile.zipcode || ''
      });
    }
  }, [profile]);

  const handleProfileUpdate = async () => {
    setUpdateMessage("");
    try {
      const response = await updateProfile(profileForm);
      setUpdateMessage({ type: 'success', text: response.message || 'Profile updated successfully!' });
      setTimeout(() => setShowProfileModal(false), 1500);
    } catch (err) {
      setUpdateMessage({ type: 'error', text: err.response?.data?.error || 'Failed to update profile.' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationsChange = (e) => {
    const locations = e.target.value.split(',').map(loc => loc.trim()).filter(loc => loc);
    setProfileForm(prev => ({ ...prev, preferred_locations: locations }));
  };

  const portfolioStats = [
    {
      title: "Investment Budget",
      value: profile?.min_budget && profile?.max_budget 
        ? `$${parseFloat(profile.min_budget).toLocaleString()} - $${parseFloat(profile.max_budget).toLocaleString()}`
        : "Not Set",
      change: profile?.min_budget ? "Custom" : "Set Budget",
      trend: profile?.min_budget ? "up" : "down",
      icon: DollarSign, color: "blue"
    },
    {
      title: "Risk Profile",
      value: profile?.risk_tolerance ? 
        riskTolerances.find(r => r.value === profile.risk_tolerance)?.label || profile.risk_tolerance : "Not Set",
      change: profile?.risk_tolerance ? "Adjusted" : "Set Risk",
      trend: profile?.risk_tolerance ? "up" : "down",
      icon: Shield, color: "green"
    },
    {
      title: "Investment Goal",
      value: profile?.investment_goal ? 
        investmentGoals.find(g => g.value === profile.investment_goal)?.label || profile.investment_goal : "Not Set",
      change: profile?.investment_goal ? "Defined" : "Set Goal",
      trend: profile?.investment_goal ? "up" : "down",
      icon: Target, color: "purple"
    },
    {
      title: "Preferred Locations",
      value: profile?.preferred_locations?.length > 0 ? `${profile.preferred_locations.length} locations` : "Not Set",
      change: profile?.preferred_locations?.length > 0 ? "Active" : "Set Locations",
      trend: profile?.preferred_locations?.length > 0 ? "up" : "down",
      icon: Map, color: "orange"
    }
  ];

  const navItems = [
    { id: "overview", icon: Home, label: "Overview" },
    { id: "properties", icon: Building2, label: "Properties" },
    { id: "portfolio", icon: Wallet, label: "Portfolio" },
    { id: "reports", icon: FileText, label: "Reports" },
    { id: "settings", icon: Settings, label: "Settings" }
  ];

  const recentProperties = [
    {
      id: 1, name: "Luxury Villa - Palm Jumeirah", location: "Dubai, UAE",
      type: "Villa", investment: "$50,000", returns: "12.5%", status: "Active", image: "🏰", progress: 85
    },
    {
      id: 2, name: "Commercial Plaza - Downtown", location: "Lahore, Pakistan",
      type: "Commercial", investment: "$75,000", returns: "18.2%", status: "Active", image: "🏢", progress: 92
    }
  ];

  const recentTransactions = [
    { id: 1, type: "Investment", property: "Palm Jumeirah Villa", 
      amount: "$50,000", date: "2024-11-10", status: "Completed", icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Investor Profile</h3>
                <button onClick={() => setShowProfileModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <p className="text-gray-600 mt-1">Update your investment preferences</p>
            </div>

            <div className="p-6 space-y-6">
              {updateMessage && (
                <div className={`p-4 rounded-xl ${updateMessage.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'}`}>
                  <div className="flex items-center space-x-2">
                    {updateMessage.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <span className="font-medium">{updateMessage.text}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Budget Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Budget ($)</label>
                    <input type="number" name="min_budget" value={profileForm.min_budget} onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="50000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Budget ($)</label>
                    <input type="number" name="max_budget" value={profileForm.max_budget} onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="250000" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Location & Strategy</h4>
                <input type="text" value={profileForm.preferred_locations?.join(', ') || ''} onChange={handleLocationsChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="New York, Los Angeles, Chicago" />
                <div className="grid grid-cols-2 gap-4">
                  <select name="investment_goal" value={profileForm.investment_goal} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                    {investmentGoals.map(goal => <option key={goal.value} value={goal.value}>{goal.label}</option>)}
                  </select>
                  <select name="risk_tolerance" value={profileForm.risk_tolerance} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                    {riskTolerances.map(risk => <option key={risk.value} value={risk.value}>{risk.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Contact Information</h4>
                <textarea name="address" value={profileForm.address} onChange={handleInputChange} rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Address" />
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" name="city" value={profileForm.city} onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="City" />
                  <input type="text" name="state" value={profileForm.state} onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="State" />
                  <input type="text" name="zipcode" value={profileForm.zipcode} onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="ZIP" />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button onClick={() => setShowProfileModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleProfileUpdate} disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400">
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 shadow-xl">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PropertyAI
              </h1>
              <p className="text-xs text-gray-500">Investor Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200" 
                  : "text-gray-600 hover:bg-gray-50"}`}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white/80">
          <button onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.first_name}! 👋</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {profileCompletion === 100 ? "Profile complete!" : "Complete your profile for recommendations."}
                </p>
              </div>
              <button onClick={() => setShowProfileModal(true)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-xl text-sm hover:bg-gray-50">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search..." 
                  className="pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-200" />
              </div>
              <button className="relative p-2.5 text-gray-400 hover:text-gray-600 rounded-xl">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l">
                <div className="text-right">
                  <p className="text-sm font-semibold">{user?.first_name} {user?.last_name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.user_type?.toLowerCase()}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {profileCompletion < 100 && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Complete Your Profile</h3>
                    <p className="text-sm text-gray-600">{profileCompletion}% complete</p>
                  </div>
                </div>
                <button onClick={() => setShowProfileModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">
                  Complete Profile
                </button>
              </div>
              {profileCompletion > 0 && (
                <div className="mt-4">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${profileCompletion}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {loading && <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800">Error Loading Profile</h3>
                  <p className="text-red-600">{error}</p>
                  <button onClick={fetchProfile} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg">Retry</button>
                </div>
              </div>
            </div>
          )}

          {profile && (
            <>
              <div className="grid grid-cols-4 gap-6 mb-8">
                {portfolioStats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                        <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                      <span className={`text-sm font-semibold flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white rounded-2xl shadow-sm border">
                  <div className="p-6 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Your Properties</h3>
                    <div className="flex space-x-3">
                      <button className="flex items-center space-x-2 px-3 py-2 border rounded-xl text-sm">
                        <Filter className="h-4 w-4" /><span>Filter</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-xl text-sm">
                        <Plus className="h-4 w-4" /><span>Add</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {recentProperties.map((prop) => (
                      <div key={prop.id} className="flex items-center p-4 border rounded-xl hover:border-blue-300 hover:shadow-lg transition-all">
                        <div className="text-3xl mr-4">{prop.image}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{prop.name}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" />{prop.location}</span>
                            <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs">{prop.type}</span>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${prop.progress}%` }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right mr-4">
                          <p className="text-sm font-semibold">{prop.investment}</p>
                          <p className="text-xs text-green-600 font-semibold">{prop.returns}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {prop.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border">
                  <div className="p-6 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                    <Download className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="p-6 space-y-4">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="pb-4 border-b last:border-0">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                            <tx.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-2">
                              <div>
                                <p className="text-sm font-semibold">{tx.type}</p>
                                <p className="text-xs text-gray-500">{tx.property}</p>
                              </div>
                              <span className="text-sm font-semibold text-blue-600">{tx.amount}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-400 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />{tx.date}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700">{tx.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default InvestorDashboard;