const API_ROOT = "http://localhost:8080";
const BASE_URL = `${API_ROOT}/api`;

const getHeaders = ({ includeAuth = true, includeJson = true } = {}) => {
  const token = localStorage.getItem("token");
  return {
    ...(includeJson && { "Content-Type": "application/json" }),
    ...(includeAuth && token && { Authorization: `Bearer ${token}` }),
  };
};

const parseResponseBody = async (res) => {
  if (res.status === 204) {
    return null;
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const clearAuthAndRedirect = (redirectOn401) => {
  localStorage.removeItem("token");
  if (redirectOn401 && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const handleResponse = async (res, { redirectOn401 = true } = {}) => {
  if (res.status === 401) {
    clearAuthAndRedirect(redirectOn401);
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Something went wrong");
  }

  return parseResponseBody(res);
};

const handleTextResponse = async (res, { redirectOn401 = true } = {}) => {
  if (res.status === 401) {
    clearAuthAndRedirect(redirectOn401);
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Something went wrong");
  }

  return res.text();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders({ includeAuth: false }),
    body: JSON.stringify(data),
  });
  return handleResponse(res, { redirectOn401: false });
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders({ includeAuth: false }),
    body: JSON.stringify(data),
  });
  return handleResponse(res, { redirectOn401: false });
};

export const addExpense = async (data) => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getExpenses = async (userId) => {
  const query = userId !== undefined && userId !== null ? `?userId=${encodeURIComponent(userId)}` : "";
  const res = await fetch(`${BASE_URL}/expenses${query}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const deleteExpense = async (id) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getReflectionsByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/reflections/user/${encodeURIComponent(userId)}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const upsertReflection = async (data) => {
  const res = await fetch(`${BASE_URL}/reflections`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getTotalSpent = async () => {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`${BASE_URL}/expenses/total-spent/${encodeURIComponent(userId)}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getTotalRegret = async () => {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`${BASE_URL}/expenses/total-regret/${encodeURIComponent(userId)}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getTotalWorth = async () => {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`${BASE_URL}/expenses/total-worth/${encodeURIComponent(userId)}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getCategoryRegret = async () => {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`${BASE_URL}/expenses/category-regret/${encodeURIComponent(userId)}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getTotalSpentByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/total-spent/${userId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getTotalExpensesByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/total-expenses/${userId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getTotalRegretByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/total-regret/${userId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getTotalWorthByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/total-worth/${userId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getMoneyWastedByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/money-wasted/${userId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getRegretPercentageByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/regret-percentage/${userId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getCategoryRegretByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/category-regret/${userId}`, {
    headers: getHeaders(),
  });
  return handleResponse(res);
};

export const getWorstCategoryByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/worst-category/${userId}`, {
    headers: getHeaders(),
  });
  return handleTextResponse(res);
};

export const getBestCategoryByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/expenses/best-category/${userId}`, {
    headers: getHeaders(),
  });
  return handleTextResponse(res);
};

export default API_ROOT;
