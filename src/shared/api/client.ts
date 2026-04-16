export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions<TResponse> = Omit<RequestInit, "body"> & {
  body?: unknown;
  transform?: (payload: unknown) => TResponse;
};

const toRequestBody = (body: unknown): BodyInit | undefined => {
  if (body == null) {
    return undefined;
  }

  if (typeof body === "string" || body instanceof FormData || body instanceof URLSearchParams) {
    return body;
  }

  return JSON.stringify(body);
};

const shouldAttachJsonHeader = (body: unknown) =>
  body != null && !(typeof body === "string" || body instanceof FormData || body instanceof URLSearchParams);

export async function apiRequest<TResponse>(
  input: string,
  options: RequestOptions<TResponse> = {},
): Promise<TResponse> {
  const { transform, headers, body, ...init } = options;

  const response = await fetch(input, {
    ...init,
    headers: {
      ...(shouldAttachJsonHeader(body) ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: toRequestBody(body),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "message" in payload
        ? String(payload.message)
        : `Request failed with status ${response.status}`;

    throw new ApiError(response.status, message, payload);
  }

  return transform ? transform(payload) : (payload as TResponse);
}
