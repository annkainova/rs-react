export default async function getAnime(request: string) {
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
