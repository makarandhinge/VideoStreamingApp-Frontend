import { Toaster } from "react-hot-toast";
import VideoUpload from "./components/VideoUpload";

function App() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center space-y-5 justify-center py-9">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">
          Welcome to Video Streaming Application
        </h1>
        <div className="flex justify-around w-full mt-14">
          <div>
            <h1 className="text-white">Playing Video</h1>
            <video
              style={{ width: 500 }}
              src={`http://localhost:8085/api/v1/videos/stream/range/f3b173f4-3684-4d14-8730-a5095241214f`}
              controls
            ></video>
          </div>
          <VideoUpload />
        </div>
      </div>
    </>
  );
}

export default App;
