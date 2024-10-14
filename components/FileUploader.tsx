"use client";

import { useCallback, Dispatch, SetStateAction, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { X } from "lucide-react";

export interface FileWithPath extends File {
  readonly path?: string;
}

type FileUploaderProps = {
  onFieldChange: (urls: string[]) => void;
  images: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  images,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const [previewImages, setPreviewImages] = useState<string[]>(images);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      const newUrls = acceptedFiles.map(convertFileToUrl);
      setPreviewImages((prevImages) => [...prevImages, ...newUrls]);
      onFieldChange([...images, ...newUrls]);
    },
    [setFiles, onFieldChange, images],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
    multiple: true,
  });

  const removeImage = (index: number) => {
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    onFieldChange(previewImages.filter((_, i) => i !== index));
  };

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <input {...getInputProps()} className="hidden" />

      {previewImages.length > 0 ? (
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {previewImages.map((img, index) => (
            <div key={index} className="group relative">
              <img
                src={img}
                alt={`Uploaded preview ${index + 1}`}
                className="h-32 w-full rounded-lg object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
            />
          </svg>
          <p className="mt-1 text-sm text-gray-600">
            Drag and drop your images here, or click to select files
          </p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className={`mt-4 ${previewImages.length > 4 ? "hidden" : ""}`}
      >
        {previewImages.length > 0 ? "Add more images" : "Select images"}
      </Button>
    </div>
  );
}
