// import { describe, it, expect, vi } from 'vitest';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { QueryClientProvider } from 'react-query';
// import { Provider } from 'react-redux';
// import { mockAnimeList, queryClientTest, storeTest } from './mockAnimeList';

// import FlyoutElement from '../../../../components/FlyoutElement/FlyoutElement';
// import { setSelectedElements } from '../../../../state/counter/AnimeListSlice';
// import ErrorPage from '../../../errorPage/ErorrPage';

// describe('ErrorPage', () => {
//   it('Displays an error message when an error occurs', async () => {
//     render(
//       <Provider store={storeTest}>
//         <QueryClientProvider client={queryClientTest}>
//           <MemoryRouter initialEntries={['/search/1']}>
//             <Route>
//               <ErrorPage />
//             </Route>{' '}
//             <Routes>
//               <Route path="/error" element={<ErrorPage />} />
//             </Routes>
//           </MemoryRouter>
//         </QueryClientProvider>
//       </Provider>
//     );

//     expect(screen.queryByText('Oops!')).toBeInTheDocument();
//     expect(
//       screen.queryByText('Sorry, an unexpected error has occurred.')
//     ).toBeInTheDocument();
//   });

//   it('', async () => {});
// });
