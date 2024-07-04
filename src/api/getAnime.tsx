export default async function getAnime(request: string) {
  try {
    const response = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${request}&page[limit]=5&page[offset]=0`,
      {
        headers: {
          Accept: 'application/vnd.api+json',
        },
      }
    );

    const data = await response.json();
    return data.data;
    console.log('data', data);
  } catch (error) {
    console.error('Error when get anime', error);
  }
}
