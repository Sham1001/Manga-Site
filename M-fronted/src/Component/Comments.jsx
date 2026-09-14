const Comments = ({ avatar, username, text }) => {

  return (
    <div className="p-3 sm:p-4 bg-[#1a0f26] border border-[#3d2456] rounded-xl transition-colors sm:hover:border-[#7a3fd6]">
      <div className="flex items-start gap-3">
        <img
          src={avatar}
          alt=""
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#3d2456] flex-shrink-0"
        />

        <div className="min-w-0">
          <p className="font-semibold text-white text-sm">{username}</p>
          <p className="text-[#c9bcdb] text-sm mt-0.5 break-words">{text}</p>
        </div>
      </div>

      <button className="mt-2.5 text-xs font-semibold text-[#b98bff] active:text-white sm:hover:text-white transition-colors">
        Reply
      </button>
    </div>
  )
}

export default Comments