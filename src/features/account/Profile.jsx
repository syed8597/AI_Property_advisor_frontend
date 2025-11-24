import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { accountApi } from '../../api/account';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loader from '../../components/common/Loader';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
  const queryClient = useQueryClient();
  const updateUser = useAuthStore((state) => state.updateUser);
  const user = useAuthStore((state) => state.user);

  // Fetch profile data
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: accountApi.getProfile,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: accountApi.updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['profile']);
      updateUser(data);
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      const errorMessage = 
        error.response?.data?.detail || 
        error.response?.data?.message ||
        'Failed to update profile';
      toast.error(errorMessage);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    values: profile, // Populate form with fetched data
  });

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading) {
    return <Loader fullScreen text="Loading profile..." />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          Failed to load profile. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Profile Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 sticky top-6">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                {profile?.first_name?.[0]}{profile?.last_name?.[0]}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {profile?.first_name} {profile?.last_name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{profile?.email}</p>
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                {profile?.role === 'advisor' ? 'Advisor' : 'Investor'}
              </div>
            </div>

            <div className="mt-6 border-t pt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Member since {new Date(profile?.created_at || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-6">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    {...register('first_name', { 
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must be at least 2 characters'
                      }
                    })}
                    error={errors.first_name?.message}
                  />

                  <Input
                    label="Last Name"
                    {...register('last_name', { 
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters'
                      }
                    })}
                    error={errors.last_name?.message}
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  {...register('email')}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  {...register('phone_number')}
                  error={errors.phone_number?.message}
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-6">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Location
                </h2>
              </div>

              <div className="space-y-4">
                <Input
                  label="Address"
                  placeholder="123 Main Street"
                  {...register('address')}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="New York"
                    {...register('city')}
                  />

                  <Input
                    label="State/Province"
                    placeholder="NY"
                    {...register('state')}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="ZIP/Postal Code"
                    placeholder="10001"
                    {...register('zip_code')}
                  />

                  <Input
                    label="Country"
                    placeholder="United States"
                    {...register('country')}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => queryClient.invalidateQueries(['profile'])}
              >
                Reset Changes
              </Button>
              <Button 
                type="submit" 
                loading={updateProfileMutation.isPending}
                disabled={!isDirty}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;