interface Props {
  setShowModal: (value: boolean) => void;
}
function GroupChatModal({ setShowModal }: Props) {
  return (
    <>
      <div className="relative w-full py-5 px-3 text-black">
        <h3>CREATE GROUP CHAT</h3>
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-[10px] right-[20px]"
        >
          X
        </button>
      </div>
      <div className="flex">
        <ul className="flex flex-wrap items-center justify-center text-black">
          <li>USER1</li>
          <li>USER2</li>
          <li>USER3</li>
          <li>USER4</li>
        </ul>
      </div>
    </>
  );
}

export default GroupChatModal;
