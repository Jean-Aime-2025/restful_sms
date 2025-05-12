import { useMutation } from '@tanstack/react-query';
import { login as loginRequest } from '@/services/auth.service';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext'; 

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginRequest(data),

    onSuccess: (response) => {
      const token = response.token || response.data?.token;
      const user = response.user || response.data?.user;

      if (!token || !user) {
        console.error('Token or user not found in response:', response);
        toast.error('Login failed', {
          description: 'Something went wrong. Try again.',
        });
        return;
      }

      toast.success('Login successful!', {
        description: `Redirecting to ${user.role.toLowerCase()} dashboard...`,
      });

      login(token, user); 
    },

    onError: (error) => {
      console.error('Login failed', error);
      toast.error('Login failed', {
        description: 'Please check your credentials and try again.',
      });
    },
  });
};

