import CanvasChart from "./chartCanvas";

// this is the dashboard === '/'
const HomeDashboard = () => {

  return (
    <>
      <section className="xs:py-6 sm:py-10 px-2 flex flex-col justify-center items-center">
        <div className="flex xs:flex-col xp:flex-row justify-between font-extrabold xs:text-lg md:text-xl mb-10 w-full">
          <p className="flex flex-row flex-wrap">
            <span>Welcome back,&nbsp;</span>
            <span className="text-app-yellow">Emmanuel</span>
          </p>
          <span className="text-app-primary/90">8:30am - 5:00pm</span>
        </div>
        <div className="flex xs:flex-col lg:flex-row justify-around items-start font-normal xs:text-lg sm:text-xl text-app-white mb-16 w-full xs:gap-8 lg:gap-36">
          <p className="flex flex-col gap-4 xs:w-full lg:w-64 max-w-full p-6 bg-app-green rounded-2xl shadow-lg">
            <span className="inline-flex">Total Number of Votes</span>
            <span className="inline-flex font-extrabold xs:text-2xl md:text-3xl">0</span>
          </p>
          <p className="flex flex-col gap-4 xs:w-full lg:w-64 max-w-full p-6 bg-app-yellow rounded-2xl shadow-lg">
            <span className="inline-flex">Total Number of Registered Students</span>
            <span className="inline-flex font-extrabold xs:text-2xl md:text-3xl">0</span>                  
          </p>
        </div>
        {/* chart */}
        <CanvasChart />
      </section>
    </>
  );
}

export default HomeDashboard
