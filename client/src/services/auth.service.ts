import api from "@/lib/api";

export const login = async (payload: LoginPayload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};
