import { createApiClient } from "@/axios/createApiClient";
import { saveToken } from "@/store/authentification";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const isValidInputs = () => {
    if (!email || !password) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!isValidInputs()) {
        setError(t("errors.invalidInputs"));
        setIsLoading(false);
        return;
      }
      const api = await createApiClient();

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const data = await response.data;

      if (response.status === 200) {
        setSuccess(t("success.loginSuccess"));
        await saveToken(data.token);
        setTimeout(() => {
          router.replace("/(tabs)/about");
        }, 1000);
      } else {
        setError(data.message || t("errors.loginFailed"));
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError(t("errors.invalidEmailOrPassword"));
      } else {
        setError(t("errors.errorOccurred"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
    success,
  };
};
