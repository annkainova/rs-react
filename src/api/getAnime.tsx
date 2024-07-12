export async function getAnime(request: string) {
  try {
    const response = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${request}&page[limit]=8&page[offset]=0`,
      {
        headers: {
          Accept: 'application/vnd.api+json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error fetching anime data:', error);
    }
    return [];
  }
}

export const getAnimeById = async (animeId: string) => {
  try {
    const response = await fetch(`https://kitsu.io/api/edge/anime/${animeId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching anime by ID:', error);
    return null;
  }
};
