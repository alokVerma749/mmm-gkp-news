import Link from 'next/link';

const Header = () => {
  const tags = [
    'Department',
    'Hostel',
    'Library',
    'Events',
    'Placements',
    'College Life',
    'Alumni',
    'Scholarship',
  ];

  return (
    <div>
      <ul className='flex gap-3 flex-row justify-center align-center text-white'>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/${tag.toLowerCase().replace(' ', '_')}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
