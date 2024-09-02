export async function fetchData(url: string, authToken?: string) {
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}