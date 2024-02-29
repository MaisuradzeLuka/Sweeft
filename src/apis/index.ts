export const fetchPhotos = async (url: string) => {
  const cliendId = import.meta.env.VITE_clientID;

  try {
    const response = await fetch(
      `https://api.unsplash.com/${url}per_page=20&order_by=popular`,
      {
        headers: {
          Authorization: `Client-ID ${cliendId}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch photos!");
    }

    const data = await response.json();

    return url === "photos?" ? data : data.results;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};
