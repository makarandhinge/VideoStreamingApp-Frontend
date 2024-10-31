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
        <VideoUpload />
      </div>
    </>
  );
}

export default App;
