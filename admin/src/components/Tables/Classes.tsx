import { ClassStruct } from '../../types/ClassStruct';

const productData: ClassStruct[] = [
  {
    name: 'CSC 429 - Fall 2024',
    count: 32,
    vms: 28,
    temp: 0,
  },
  {
    name: 'CSC 430 - Fall 2024',
    count: 32,
    vms: 32,
    temp: 0,
  },
  {
    name: 'CSC 464 - Fall 2024',
    count: 28,
    vms: 32,
    temp: 0,
  },
  {
    name: 'CSC 424 - Fall 2024',
    count: 35,
    vms: 499,
    temp: 0,
  },
];

const Classes = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Classes
        </h4>
      </div>

      <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Class</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Student Count</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"># of VMs</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Temp</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.count}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.vms}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.temp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
