function EventCard() {
  return (
    <>
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full min-h-96 rounded-lg shadow-lg mx-auto">

        <div className="w-full h-60 overflow-hidden rounded-t-lg">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/024/039/777/small_2x/team-portrait-of-confident-multicultural-business-people-discuss-and-sit-at-table-in-boardroom-generative-ai-illustration-photo.jpg"
            alt="event_image"
            className="w-full h-full object-fill"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-2xl font-semibold">Pitch Night</p>
              <p className="text-gray-600 pt-2 font-semibold">Ahmedabad</p>
            </div>
            <button
              type="button"
              className="border border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer"
            >
              Join
            </button>
          </div>

          <div className="flex justify-between text-center mt-7">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Date</p>
              <p className="font-medium text-gray-800">March 15, 2025</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Time From</p>
              <p className="font-medium text-gray-800">6 PM</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Till</p>
              <p className="font-medium text-gray-800">9 PM</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full min-h-96 rounded-lg shadow-lg mx-auto">

        <div className="w-full h-60 overflow-hidden rounded-t-lg">
          <img
            src="https://news.virginia.edu/sites/default/files/article_image/18077_photo_1_high_res.jpg"
            alt="event_image"
            className="w-full h-full object-fill"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-2xl font-semibold">Venture Summit</p>
              <p className="text-gray-600 pt-2 font-semibold">Mumbai</p>
            </div>
            <button
              type="button"
              className="border border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer"
            >
              Join
            </button>
          </div>

          <div className="flex justify-between text-center mt-7">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Date</p>
              <p className="font-medium text-gray-800">March 15, 2025</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Time From</p>
              <p className="font-medium text-gray-800">6 PM</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Till</p>
              <p className="font-medium text-gray-800">9 PM</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full min-h-96 rounded-lg shadow-lg mx-auto">

        <div className="w-full h-60 overflow-hidden rounded-t-lg">
          <img
            src="https://www.shutterstock.com/shutterstock/videos/3536067231/thumb/7.jpg?ip=x480"
            alt="event_image"
            className="w-full h-full object-fill"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-2xl font-semibold">Startup Showcase</p>
              <p className="text-gray-600 pt-2 font-semibold">Ahmedabad</p>
            </div>
            <button
              type="button"
              className="border border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer"
            >
              Join
            </button>
          </div>

          <div className="flex justify-between text-center mt-7">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Date</p>
              <p className="font-medium text-gray-800">March 15, 2025</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Time From</p>
              <p className="font-medium text-gray-800">6 PM</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Till</p>
              <p className="font-medium text-gray-800">9 PM</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default EventCard;
