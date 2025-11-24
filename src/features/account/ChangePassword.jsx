import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { accountApi } from '../../api/account';
import Button from '../../components/common/Input';
import Input from '../../components/common/Input';

const passwordSchema = z.object({
  old_password: z.string().min(1, 'Current password is required'),
  new_password: z.string().min(6, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await accountApi.changePassword({
        old_password: data.old_password,
        new_password: data.new_password,
      });
      toast.success('Password changed successfully!');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Change Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <Input
            label="Current Password"
            type="password"
            {...register('old_password')}
            error={errors.old_password?.message}
            placeholder="••••••••"
          />
          <Input
            label="New Password"
            type="password"
            {...register('new_password')}
            error={errors.new_password?.message}
            placeholder="••••••••"
          />

          <Input
            label="Confirm New Password"
            type="password"
            {...register('confirm_password')}
            error={errors.confirm_password?.message}
            placeholder="••••••••"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;