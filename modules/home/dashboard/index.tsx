import CanvasChart from "./chartCanvas";

// this is the dashboard === '/'
const HomeDashboard = () => {

  return (
    <>
      <section className="pt-10 pb-10 flex flex-col justify-center items-center">
        <p className="font-extrabold text-xl mb-10 w-full">
          <span>Welcome back, </span>
          <span className="text-app-yellow">Emmanuel</span>
        </p>
        <div className="flex flex-row justify-around items-start font-normal text-xl text-app-white mb-16 w-full">
          <p className="w-60 max-w-full p-4 bg-app-green rounded-md shadow-lg">
            <span className="inline-flex">Total Numbers of Votes</span>
            <span className="inline-flex font-extrabold text-3xl">0</span>
          </p>
          <p className="w-60 max-w-full p-4 bg-app-yellow rounded-md shadow-lg">
            <span className="inline-flex">Total Numbers of Registered Students</span>
            <span className="inline-flex font-extrabold text-3xl">0</span>                  
          </p>
        </div>
        {/* chart */}
        <CanvasChart />
      </section>
    </>
  );
}

export default HomeDashboard
