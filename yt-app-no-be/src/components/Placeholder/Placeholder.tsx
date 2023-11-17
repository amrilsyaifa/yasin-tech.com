const Placeholder = () => {
  const number = 18;
  var arr = Array.from(new Array(number), (x, i) => i + 1);
  return (
    <div className='grid-rows-8 over mt-6 grid grid-cols-3 gap-4 overflow-hidden pr-8'>
      {arr?.map((v) => (
        <div
          key={v}
          role='status'
          className='w-full animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0'
        >
          <div className='flex h-64 w-full items-center justify-center rounded bg-gray-200 dark:bg-gray-300' />

          <span className='sr-only'>Loading...</span>
        </div>
      ))}
    </div>
  );
};

export default Placeholder;
