export default function BackgroundOrbs() {
  return (
    <>
      <div className="pointer-events-none fixed left-[-8rem] top-[-6rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-[#e8d5b0]/20 blur-[120px] animate-driftA"></div>
      <div className="pointer-events-none fixed right-[-10rem] top-[12rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[#e8d5b0]/10 blur-[140px] animate-driftB"></div>
      <div className="pointer-events-none fixed bottom-[-10rem] left-[35%] -z-10 h-[24rem] w-[24rem] rounded-full bg-[#d2c1a2]/12 blur-[130px] animate-driftA"></div>
    </>
  );
}
