import { APIConstants } from "../assets/StaticText";

/**
 * Function to perform a GET request
 * @param data
 * @returns {Promise<unknown>}
 */
export const doGetApiCall = (data: any) => {
    return new Promise(async (resolve, reject) => {
      let didTimeOut = false;
  
      const timeout = setTimeout(() => {
        didTimeOut = true;
        reject(new Error("Request timed out"));
      }, APIConstants.FETCH_TIMEOUT);
  
      const Api = `${data.BASE_URL}${data.endpoint}`;
      console.log("Api:-", Api, data.authToken, data.body);
  
      fetch(Api, {
        method: "GET",
        headers: {
          Authorization: data.authToken || "",
          ...(data.access && { access: data.access }),
        },
      })
        .then(async (response) => {
          clearTimeout(timeout); 
  
          const statusCode = response.status;
          const responseData = await response.json();
  
          console.log("GetApiResponse -- ", Api, statusCode, responseData);
  
          resolve(responseData);
        })
        .catch((error) => {
          if (didTimeOut) return;
          reject(error);
        });
    });
  };
  
  
  /**
   * Function to perform a POST request
   * @param data
   * @returns {Promise<unknown>}
   */
  export const doPostApiCall = (data: any) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort(); 
    }, APIConstants.FETCH_TIMEOUT);
  
    const Api = `${data.BASE_URL}${data.endpoint}`;
    console.log("Api:-", Api, data.authToken, data.body);
  
    return fetch(Api, {
      method: "POST",
      headers: {
        Authorization: data.authToken || "",
        "Content-Type": "application/json", 
        ...(data.access && { access: data.access }),
      },
      body: JSON.stringify(data.body),
      signal: controller.signal,
    })
      .then(async (response) => {
        clearTimeout(timeout); 
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Request failed");
        } 
        console.log("PostApiResponse -- ", Api, response.status, responseData);
        return responseData;
      })
      .catch((error) => {
        clearTimeout(timeout);  
        if (error.name === "AbortError") {
          throw new Error("Request timed out");
        }
        throw error;
      });
  };
  