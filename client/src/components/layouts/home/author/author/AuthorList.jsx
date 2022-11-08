import Button from '../../../../buttons/Button';
import AuthorCard from './AuthorCard';

const characters = [
  {
    id: 1,
    name: 'ALL',
  },
  {
    id: 2,
    name: 'A',
  },
  {
    id: 3,
    name: 'B',
  },
  {
    id: 4,
    name: 'C',
  },
  {
    id: 5,
    name: 'D',
  },
  {
    id: 6,
    name: 'E',
  },
  {
    id: 7,
    name: 'F',
  },
  {
    id: 8,
    name: 'G',
  },
  {
    id: 9,
    name: 'H',
  },
  {
    id: 10,
    name: 'I',
  },
  {
    id: 11,
    name: 'J',
  },
  {
    id: 12,
    name: 'K',
  },
  {
    id: 13,
    name: 'L',
  },
  {
    id: 14,
    name: 'M',
  },
  {
    id: 15,
    name: 'N',
  },
  {
    id: 16,
    name: 'O',
  },
  {
    id: 17,
    name: 'P',
  },
  {
    id: 18,
    name: 'Q',
  },
  {
    id: 19,
    name: 'R',
  },
  {
    id: 20,
    name: 'S',
  },
  {
    id: 21,
    name: 'T',
  },
  {
    id: 22,
    name: 'U',
  },
  {
    id: 23,
    name: 'V',
  },
  {
    id: 24,
    name: 'W',
  },
  {
    id: 25,
    name: 'X',
  },
  {
    id: 26,
    name: 'Y',
  },
  {
    id: 27,
    name: 'Z',
  },
];

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const AuthorList = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row flex-wrap justify-between text-lg">
        {characters &&
          characters.map((item, index) => (
            <span key={item.id} className="mx-5 cursor-pointer">
              {item.name}
            </span>
          ))}
      </div>
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4">
        {array &&
          array.map((item, index) => (
            <div className="col-span-2" key={index}>
              <AuthorCard></AuthorCard>
            </div>
          ))}
      </div>
      <Button className="w-48 mx-auto text-lg bg-white border border-gray-300">
        Load more
      </Button>
    </div>
  );
};

export default AuthorList;
