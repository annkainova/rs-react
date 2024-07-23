import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import Button from '../../ui/button/Button';

const DownloadButton = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.anime.selectedElements
  );

  const headers = [
    'id',
    'canonicalTitle',
    'description',
    'totalLength',
    'startDate',
    'averageRating',
    'posterImage.large',
    'coverImage.original',
  ];

  const rows = selectedItems.map((item) => [
    item.id,
    item.attributes.canonicalTitle,
    item.attributes.description,
    item.attributes.totalLength,
    item.attributes.startDate,
    item.attributes.averageRating,
    item.attributes.posterImage.large,
    item.attributes.coverImage.original,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((value) =>
          typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
        )
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const objUrl = URL.createObjectURL(blob);
  const fileName = `${selectedItems.length}_anime.csv`;

  return (
    <Button isMain={true}>
      <a href={objUrl} download={fileName}>
        Download
      </a>
    </Button>
  );
};

export default DownloadButton;
