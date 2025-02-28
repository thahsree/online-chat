const Chatpage = () => {
  return (
    <div className="w-full bg-[#2c2a2a] flex flex-col justify-end py-2 px-5">
      <div className=" bg-[#484343b5] relative">
        <input
          className="w-full h-[20px] border border-transparent rounded px-2 py-6 flex items-center"
          placeholder="type your message"
        />
        <button className="absolute top-[25%] right-3 border-none outline-none">
          <img src="/arrow.svg" alt="arrow" width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default Chatpage;
