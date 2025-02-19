import { IUser } from "@/models/user.model";

type fetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

type UserFormData = {
  email: string;
  password: string;
};

class ApiClient {
  private async customFetch<T>(
    endpoint: string,
    options: fetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeader = {
      "Content-Type": "application/json",
      ...headers,
    };
    const customResponse = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeader,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!customResponse.ok) {
      throw new Error(await customResponse.text());
    }
    return customResponse.json();
  }

  async register(user: UserFormData) {
    return this.customFetch("/auth/register", {
      method: "POST",
      body: user,
    });
  }
}

export const apiClient = new ApiClient();
