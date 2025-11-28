import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useAdvisorProfile } from "../hooks/useAdvisorProfile";
import {
  Home, Users, Building2, FileText, Settings, LogOut, Bell, Search,
  DollarSign, Calendar, ArrowUpRight, Filter, Download, User, Edit, 
  AlertCircle, CheckCircle, TrendingUp, Phone, Mail, BarChart3, Eye, 
  UserPlus, RefreshCw, UserCheck, Loader2, MapPin,
  Settings2Icon,
  FileSliders
} from "lucide-react";
import { useLogout } from '../hooks/useLogout';
const AdvisorDashboard = () => {
  const { user } = useAuthStore();
  const { profile, loading, error, profileExists, fetchProfile, updateProfile } = useAdvisorProfile();
  const [activeTab, setActiveTab] = useState("overview");
  const { handleLogout } = useLogout();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    license_number: '', 
    years_of_experience: '', 
    specialization: '',
    company_name: '', 
    company_website: '', 
    bio: '', 
    is_accepting_clients: true
  });

  const specializations = [
    { value: 'RESIDENTIAL', label: 'Residential Properties' },
    { value: 'COMMERCIAL', label: 'Commercial Properties' },
    { value: 'INVESTMENT', label: 'Investment Properties' },
    { value: 'LUXURY', label: 'Luxury Properties' },
    { value: 'MIXED', label: 'Mixed Portfolio' }
  ];

  useEffect(() => {
    // Only show modal after initial load is complete and profile doesn't exist
    if (!loading && profileExists === false && !profile) {
      setIsCreatingProfile(true);
      setShowProfileModal(true);
    }
  }, [loading, profileExists, profile]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        license_number: profile.license_number || '',
        years_of_experience: profile.years_of_experience || '',
        specialization: profile.specialization || '',
        company_name: profile.company_name || '',
        company_website: profile.company_website || '',
        bio: profile.bio || '',
        is_accepting_clients: profile.is_accepting_clients !== false
      });
    }
  }, [profile]);

  const handleProfileUpdate = async () => {
    setUpdateMessage("");
    try {
      const response = await updateProfile(profileForm);
      setUpdateMessage({ type: 'success', text: response.message || 'Profile saved successfully!' });
      setIsCreatingProfile(false);
      setTimeout(() => {
        setShowProfileModal(false);
        fetchProfile();
      }, 1500);
    } catch (err) {
      setUpdateMessage({ type: 'error', text: err.response?.data?.error || 'Failed to save profile.' });
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const calculateProfileCompletion = () => {
    if (!profile) return 0;
    const fields = [profile.license_number, profile.years_of_experience, profile.specialization, profile.company_name, profile.bio];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  };
  
  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };
  const advisorStats = profileExists ? [
    { title: "Total Clients", value: profile?.total_clients?.toString() || "0", change: "+0 this month", icon: Users, bgColor: "bg-blue-50", textColor: "text-blue-600" },
    { title: "Active Properties", value: profile?.active_properties?.toString() || "0", change: "+0 new", icon: Building2, bgColor: "bg-green-50", textColor: "text-green-600" },
    { title: "Total Investments", value: formatCurrency(profile?.total_investments), change: "+0% growth", icon: DollarSign, bgColor: "bg-purple-50", textColor: "text-purple-600" },
    { title: "Commission Earned", value: formatCurrency(profile?.commission_earned), change: "+0% this month", icon: TrendingUp, bgColor: "bg-orange-50", textColor: "text-orange-600" }
  ] : [];

  const navItems = [
    { id: "overview", icon: Home, label: "Overview" },
    { id: "clients", icon: Users, label: "Clients" },
    { id: "properties", icon: Building2, label: "Properties" },
    { id: "reports", icon: FileText, label: "Reports" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "settings", icon: Settings, label: "Settings" }
  ];

  const recentClients = profileExists ? [
    { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", phone: "+92 300 1234567", properties: 3, investment: "$125,000", status: "Active", joinDate: "2024-10-15", avatar: "AK" },
    { id: 2, name: "Sarah Ali", email: "sarah@example.com", phone: "+92 321 7654321", properties: 5, investment: "$280,000", status: "Active", joinDate: "2024-09-20", avatar: "SA" }
  ] : [];

  const recentActivities = profileExists ? [
    { id: 1, client: "Ahmed Khan", action: "New Investment", property: "DHA Phase 5 Villa", amount: "$50,000", time: "2 hours ago", type: "investment" },
    { id: 2, client: "Sarah Ali", action: "Property Listed", property: "Bahria Town Apartment", amount: "$120,000", time: "5 hours ago", type: "listing" }
  ] : [];

  const upcomingMeetings = profileExists ? [
    { id: 1, client: "Ahmed Khan", type: "Property Viewing", date: "Nov 14, 2024", time: "10:00 AM", location: "DHA Phase 5", status: "confirmed" },
    { id: 2, client: "Sarah Ali", type: "Investment Discussion", date: "Nov 15, 2024", time: "2:30 PM", location: "Office", status: "confirmed" }
  ] : [];

  const getUserInitials = () => {
    if (profile?.user?.first_name && profile?.user?.last_name) return `${profile.user.first_name[0]}${profile.user.last_name[0]}`;
    if (user?.first_name && user?.last_name) return `${user.first_name[0]}${user.last_name[0]}`;
    return "A";
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-xl">
                    <UserCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{isCreatingProfile ? 'Complete Your Profile' : 'Update Profile'}</h3>
                    <p className="text-gray-600 text-sm mt-1">{isCreatingProfile ? 'Set up your advisor profile to get started' : 'Update your professional information'}</p>
                  </div>
                </div>
                {!isCreatingProfile && <button onClick={() => setShowProfileModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {updateMessage && (
                <div className={`p-4 rounded-xl ${updateMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                  <div className="flex items-center space-x-2">
                    {updateMessage.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <span className="font-medium">{updateMessage.text}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-semibold">Professional Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">License Number {isCreatingProfile && '*'}</label>
                    <input type="text" name="license_number" value={profileForm.license_number} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="LIC123456" required={isCreatingProfile} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Years of Experience {isCreatingProfile && '*'}</label>
                    <input type="number" name="years_of_experience" value={profileForm.years_of_experience} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="5" min="0" required={isCreatingProfile} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Specialization {isCreatingProfile && '*'}</label>
                  <select name="specialization" value={profileForm.specialization} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500" required={isCreatingProfile}>
                    <option value="">Select Specialization</option>
                    {specializations.map(spec => <option key={spec.value} value={spec.value}>{spec.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Company Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input type="text" name="company_name" value={profileForm.company_name} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Your Company" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Website</label>
                    <input type="url" name="company_website" value={profileForm.company_website} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="https://company.com" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Professional Bio</label>
                <textarea name="bio" value={profileForm.bio} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Tell clients about your experience..." />
              </div>

              <div className="flex items-center space-x-3">
                <input type="checkbox" name="is_accepting_clients" checked={profileForm.is_accepting_clients} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                <label className="text-sm font-medium">Accepting new clients</label>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                {!isCreatingProfile && <button onClick={() => setShowProfileModal(false)} className="px-6 py-3 border rounded-xl font-semibold hover:bg-gray-50">Cancel</button>}
                <button onClick={handleProfileUpdate} disabled={loading} className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:bg-purple-400">
                  {loading ? 'Saving...' : (isCreatingProfile ? 'Create Profile' : 'Update Profile')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-sm border-r shadow-xl">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">PropertyAI</h1>
              <p className="text-xs text-gray-500 mt-1">Advisor Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600 border border-purple-200 shadow-sm" : "text-gray-600 hover:bg-gray-50/80"}`}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white/80">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50/80">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10 shadow-sm">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-2xl font-bold">Welcome, {user?.first_name || "Advisor"}! 👋</h2>
                <p className="text-sm text-gray-500 mt-1">{profileExists ? `${profile?.specialization || "Advisor"} • ${profile?.company_name || "PropertyAI"}` : "Complete your profile to get started"}</p>
              </div>
              <button onClick={() => { setIsCreatingProfile(!profileExists); setShowProfileModal(true); }} className="flex items-center space-x-2 px-4 py-2 border rounded-xl text-sm font-medium hover:bg-gray-50">
                <Edit className="h-4 w-4" />
                <span>{profileExists ? 'Edit Profile' : 'Create Profile'}</span>
              </button>
              <button onClick={fetchProfile} disabled={loading} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl" title="Refresh">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search clients, properties..." className="pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-200 w-64" disabled={!profileExists} />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 shadow-lg" disabled={!profileExists}>
                <UserPlus className="h-4 w-4" />
                <span className="font-medium">Add Client</span>
              </button>
              <button className="relative p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l">
                <div className="text-right">
                  <p className="text-sm font-semibold">{user?.first_name} {user?.last_name}</p>
                  <p className="text-xs text-gray-500 capitalize">Advisor</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg">{getUserInitials()}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {!profileExists && !loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-purple-100 p-6 rounded-2xl mb-6">
                <UserCheck className="h-16 w-16 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Welcome to PropertyAI Advisor Portal</h3>
              <p className="text-gray-600 text-center mb-8 max-w-md">To get started, please create your professional profile.</p>
              <button onClick={() => { setIsCreatingProfile(true); setShowProfileModal(true); }} className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 text-lg">Create Your Advisor Profile</button>
            </div>
          )}

          {profileExists && profile && (
            <>
              {profileCompletion < 100 && (
                <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-3 rounded-xl">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Complete Your Profile</h3>
                        <p className="text-sm text-gray-600">{profileCompletion}% complete</p>
                      </div>
                    </div>
                    <button onClick={() => { setIsCreatingProfile(false); setShowProfileModal(true); }} className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700">Complete Profile</button>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${profileCompletion}%` }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {advisorStats.map((stat, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                      </div>
                      <span className="flex items-center text-sm font-semibold text-green-600">
                        <ArrowUpRight className="h-4 w-4 mr-1" />{stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm font-medium">{stat.title}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Recent Clients</h3>
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-3 py-2 border rounded-xl text-sm font-medium hover:bg-gray-50">
                          <Filter className="h-4 w-4" /><span>Filter</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-purple-600">
                          <Eye className="h-4 w-4" /><span>View All</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {recentClients.map((client) => (
                      <div key={client.id} className="flex items-center p-4 border rounded-xl hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer bg-white/50">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg mr-4 shadow-lg">{client.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold truncate">{client.name}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${client.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{client.status}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center"><Mail className="h-3 w-3 mr-1" />{client.email}</span>
                            <span className="flex items-center"><Phone className="h-3 w-3 mr-1" />{client.phone}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">Joined: {client.joinDate}</span>
                            <span className="text-xs font-medium">{client.properties} properties</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm font-semibold">{client.investment}</p>
                          <p className="text-xs text-gray-500">Total Investment</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
                      <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                        <Calendar className="h-4 w-4" /><span>Calendar</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold">{meeting.client}</p>
                          <span className={`text-xs px-2 py-1 rounded-lg font-medium ${meeting.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{meeting.status}</span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center font-medium"><Calendar className="h-4 w-4 mr-2 text-purple-500" />{meeting.date} at {meeting.time}</p>
                          <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-blue-500" />{meeting.location}</p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-purple-100">
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded font-medium">{meeting.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Activities</h3>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-3 py-2 border rounded-xl text-sm font-medium hover:bg-gray-50">
                        <Filter className="h-4 w-4" /><span>Filter</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 border rounded-xl text-sm font-medium hover:bg-gray-50">
                        <Download className="h-4 w-4" /><span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-white/50 hover:shadow-md transition-all">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${activity.type === "investment" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold"><span className="text-purple-600">{activity.client}</span> - {activity.action}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.property}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{activity.amount}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdvisorDashboard;