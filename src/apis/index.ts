export const fetchPhotos = async (url: string, id: number) => {
  const cliendId = import.meta.env.VITE_clientID;

  try {
    const response = await fetch(`https://api.unsplash.com/${url}`, {
      headers: {
        Authorization: `Client-ID ${cliendId}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch photos!");
    }

    const data = await response.json();

    return id === 1 ? data.results : data;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};
