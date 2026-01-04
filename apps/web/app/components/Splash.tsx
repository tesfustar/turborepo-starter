import { Loader2 } from "lucide-react";

const Splash = () => {
  return (
    <div className="w-full flex items-center justify-center bg-transparent">
      <div className="w-full md:w-1/2 lg:w-1/3 min-h-screen relative flex flex-col items-center justify-center">
        <Loader2 className="animate-spin m-auto" />
      </div>
    </div>
  );
};

export default Splash;
