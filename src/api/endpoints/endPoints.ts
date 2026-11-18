export const endpoints = {
  auth: {
    register: "/textsense/auth/register/",
    login: "/textsense/auth/login/",
    logout: "/textsense/auth/logout",
    refresh: "/textsense/auth/refresh",
    testAuth: "/textsense/auth/test-auth",
    forgotPassword: "/textsense/auth/forgot-password",
    verifyResetOtp: "/textsense/auth/verify-reset-otp",
    resetPassword: "/textsense/auth/reset-password",
  },
  admin: {
    analytics: "/textsense/admin/analytics",
    feedback: "/textsense/feedback/create",
    feedbackDetails: "/textsense/feedback/details",
    categories: "/textsense/category/create",
  },
  content: {
    articles: "/textsense/content/articles/",
  },
};



