const errorHandler = (error: any) => {
  let errorMessage = "An unknown error occurred";

  // Handle Fetch API specific errors
  if (error instanceof TypeError) {
    errorMessage = "Network error or request was blocked (CORS).";
  } else if (error.status) {
    // Handle HTTP error responses
    switch (error.status) {
      case 400:
        errorMessage = "Bad Request: The server could not understand the request.";
        break;
      case 401:
        errorMessage = "Unauthorized: Access is denied due to invalid credentials.";
        break;
      case 403:
        errorMessage = "Forbidden: You don't have permission to access this resource.";
        break;
      case 404:
        errorMessage = "Not Found: The requested resource could not be found.";
        break;
      case 500:
        errorMessage = "Internal Server Error: Something went wrong on the server.";
        break;
      case 503:
        errorMessage = "Service Unavailable: The server is currently unable to handle the request.";
        break;
      default:
        errorMessage = `HTTP error! Status: ${error.status}`;
    }
  } else if (error.message) {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const getData = async (url: string) => {
  try {
    const response = await fetch(`/api/${url}`);
    console.log(response, "....");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw response;
  } catch (error: any) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const response = await fetch(`/api/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response, ".........", data);

    if (response.ok) {
      const data = await response.json();

      return data;
    }
    throw response;
  } catch (error) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
};
