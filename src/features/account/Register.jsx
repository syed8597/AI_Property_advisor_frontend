import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { accountApi } from "../../api/account";
import { useAuthStore } from "../../store/authStore";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { 
  Eye, 
  EyeOff, 
  UserCircle, 
  Briefcase, 
  CheckCircle, 
  Building2
} from "lucide-react";

// Validation schema
const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/^(?=.*[A-Z]).*$/, "Password must contain at least one uppercase letter"),
    password2: z.string(),
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    role: z.enum(["investor", "advisor"], {
      errorMap: () => ({ message: "Please select a role" }),
    }),
    phone_number: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9+\-() ]+$/, "Invalid phone number format"),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

const Register = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [userName, setUserName] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "investor",
      email: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        password_confirm: formData.password2,
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_type: formData.role.toUpperCase(),
        phone_number: formData.phone_number,
      };

      console.log("📤 Sending registration payload:", payload);

      const response = await accountApi.register(payload);
      
      console.log("✅ Registration response:", response);

      // Set user name for success message
      setUserName(formData.first_name);
      
      // Show success screen
      setRegistrationComplete(true);

      // Show toast notification
      toast.success("Registration completed successfully! 🎉");

      // Wait 2 seconds before redirecting
      setTimeout(() => {
        if (response.tokens?.access && response.tokens?.refresh) {
          login(response.user, response.tokens.access, response.tokens.refresh);
          
          const dashboardPath = response.user.user_type === "ADVISOR" 
            ? "/advisor/dashboard" 
            : "/investor/dashboard";
          
          navigate(dashboardPath);
        } else {
          navigate("/auth/login");
        }
      }, 2000);
      
    } catch (error) {
      console.error("❌ Registration error:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status code:", error.response?.status);

      const errorData = error.response?.data;

      if (errorData) {
        if (typeof errorData === 'string') {
          toast.error(errorData);
        }
        else if (errorData.detail) {
          toast.error(errorData.detail);
        }
        else if (errorData.non_field_errors) {
          const errorMsg = Array.isArray(errorData.non_field_errors)
            ? errorData.non_field_errors[0]
            : errorData.non_field_errors;
          toast.error(errorMsg);
        }
        else if (typeof errorData === 'object') {
          let hasFieldErrors = false;

          Object.keys(errorData).forEach((field) => {
            const errorMessage = Array.isArray(errorData[field])
              ? errorData[field][0]
              : errorData[field];

            const fieldMapping = {
              'password_confirm': 'password2',
              'user_type': 'role',
            };

            const frontendField = fieldMapping[field] || field;

            setError(frontendField, {
              type: "server",
              message: errorMessage,
            });

            hasFieldErrors = true;
          });

          if (hasFieldErrors) {
            toast.error("Please fix the errors in the form.");
          }
        }
        else {
          toast.error("Registration failed. Please check your information.");
        }
      } 
      else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } 
      else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Success Screen Component
  if (registrationComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white py-12 px-8 shadow rounded-lg text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Account Created!
            </h2>
            
            <p className="text-gray-600 mb-2">
              Welcome, <span className="font-semibold text-blue-600">{userName}</span>
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to your dashboard...
            </p>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              <span>Please wait</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration Form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">
              PropertyAI
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">
            Join our platform to get started
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedRole === "investor" 
                      ? "border-blue-500 bg-blue-50 text-blue-700" 
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <input 
                    type="radio" 
                    value="investor" 
                    {...register("role")} 
                    className="sr-only" 
                  />
                  <UserCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Investor</span>
                </label>

                <label
                  className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedRole === "advisor" 
                      ? "border-blue-500 bg-blue-50 text-blue-700" 
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <input 
                    type="radio" 
                    value="advisor" 
                    {...register("role")} 
                    className="sr-only" 
                  />
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Advisor</span>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                {...register("first_name")}
                error={errors.first_name?.message}
                placeholder="John"
              />
              <Input
                label="Last Name"
                type="text"
                {...register("last_name")}
                error={errors.last_name?.message}
                placeholder="Doe"
              />
            </div>

            {/* Email Input */}
            <Input
              label="Email address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="you@example.com"
            />

            {/* Phone Number Input */}
            <Input
              label="Phone Number"
              type="text"
              {...register("phone_number")}
              error={errors.phone_number?.message}
              placeholder="+1234567890"
            />

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword2 ? "text" : "password"}
                  {...register("password2")}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password2 ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password2 && (
                <p className="mt-1 text-sm text-red-600">{errors.password2.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;