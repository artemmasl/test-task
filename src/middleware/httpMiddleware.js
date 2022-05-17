export async function useHttp({
  url,
  method = "GET",
  body = null,
  params = {},
  json = false,
}) {
  if (body) {
    if (json) {
      body = JSON.stringify(body);
    } else {
      const formData = new FormData();
      Object.keys(body).forEach((key) => formData.append(key, body[key]));
      body = formData;
    }
  }

  const headers = {};
  if (json) {
    headers["Content-Type"] = "application/json";
  }
  const token = localStorage.getItem("token");
  if (token) {
    headers["authorization"] = token;
  }
  if (params) {
    params = Object.keys(params).length ? new URLSearchParams(params) : "";
  } else {
    params = "";
  }
  url = `${process.env.VUE_APP_BASE_URL}/${url}?${params.toString()}`;

  const response = await fetch(url, {
    method,
    body,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Что-то пошло не так");
  }
  return data;
}
