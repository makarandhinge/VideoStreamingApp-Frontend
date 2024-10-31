import { useState } from "react";
import uploadIcon from "../assets/play-button.png";
import {
  Alert,
  Button,
  Card,
  Label,
  Progress,
  Textarea,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });

  function handleFileChange(event) {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  function formFieldChange(event) {
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  }
  function handleForm(formEvent) {
    formEvent.preventDefault();
    if (!selectedFile) {
      alert("Select file !!");
      return;
    }
    saveVideoToServer(selectedFile, meta);
  }

  function resetForm() {
    setMeta({ title: "", description: "" });
    setSelectedFile(null);
    setUploading(false);
  }

  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);

    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", selectedFile);

      let response = await axios.post(
        `http://localhost:8085/api/v1/videos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(progress);
            setProgress(progress);
          },
        }
      );
      setProgress(0);
      console.log(response);
      setMessage("File uploaded");
      setUploading(false);
      toast.success("File uploaded successfully !!");
      resetForm();
    } catch (error) {
      console.log(error);
      setMessage("Error in uploading file");
      setUploading(false);
      toast.error("File not uploaded !!");
    }
  }

  return (
    <div className="text-white">
      <Card className="flex flex-col items-center justify-center">
        <h1>Upload Video</h1>

        <div>
          <form
            noValidate
            onSubmit={handleForm}
            className="flex flex-col space-y-5"
          >
            <div>
              <div>
                <Label htmlFor="file-upload-helper-text" value="Video Title" />
              </div>
              <TextInput
                name="title"
                value={meta.title}
                onChange={formFieldChange}
                placeholder="Enter your title"
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea
                name="description"
                value={meta.description}
                onChange={formFieldChange}
                id="comment"
                placeholder="Enter the description"
                required
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-5 justify-center">
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover"
                  src={uploadIcon}
                  alt="Current profile photo"
                />
              </div>
              <label className="block">
                <span className="sr-only">Choose Video File</span>
                <input
                  onChange={handleFileChange}
                  type="file"
                  className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "
                />
              </label>
            </div>
            <div className="">
              {uploading && (
                <Progress
                  progress={progress}
                  textLabel="Uploading"
                  size="xl"
                  labelProgress
                  labelText
                />
              )}
            </div>
            <div>
              {message && (
                <Alert
                  color={"success"}
                  rounded
                  withBorderAccent
                  onDismiss={() => {
                    setMessage("");
                  }}
                >
                  <span className="font-medium">Success alert! </span>
                  {message}
                </Alert>
              )}
            </div>
            <div className="flex justify-center">
              <Button disabled={uploading} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default VideoUpload;
