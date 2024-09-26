'use client';
import { concatFileName } from '@/utils/functions/utilFunctions';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io';

type Props = {
  label: string;
  placeholder: string;
  setSelectedPic: (file: File | null) => void;
  defaultImage?: string | null | undefined;
  maxSize: number; // "nbOfMo"
  objectFit: 'cover' | 'contain';
};

const PicSelector = (props: Props) => {
  const [imageToDisplay, setImageToDisplay] = useState(
    props.defaultImage || ''
  );
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = props.maxSize * 1024 * 1024;

  // UseEffect to watch for changes in defaultImage prop
  useEffect(() => {
    if (props.defaultImage) {
      setImageToDisplay(props.defaultImage);
    }
  }, [props.defaultImage]);

  // Function to open dialog box
  const handleUploadClick = () => {
    if (selectedFileName !== null) {
      setSelectedFileName(null);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Le fichier dépasse la taille maximale ');
        setSelectedFileName(null);
        setImageToDisplay('');
        return;
      } else {
        setSelectedFileName(concatFileName(file.name));
        setImageToDisplay(URL.createObjectURL(file));
        props.setSelectedPic(file);
      }
    } else {
      setSelectedFileName(null);
    }
  };

  const handleCancelSelection = () => {
    setSelectedFileName(null);
    setImageToDisplay('');
    props.setSelectedPic(null);
    // reinit input to allow reselection after cancel selection
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="textStyle-subheadline !text-textColor-main !font-normal">
        {props.label}
      </p>
      {/* if no image */}
      {imageToDisplay === '' && (
        <button
          className="flex flex-col justify-center items-center border border-gray-300 rounded-md w-full p-4"
          onClick={handleUploadClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/png, image/jpeg, image/webp"
          />
          <IoMdCloudUpload size={50} className="text-accent" />
          <p className="textStyle-body">{props.placeholder}</p>
        </button>
      )}
      {/* if image selected */}
      {imageToDisplay && (
        <div className="relative flex flex-col justify-center items-center border border-gray-300 rounded-md w-full p-4 aspect-square">
          <button
            className="absolute top-0 right-0 z-50 text-2xl text-main"
            onClick={() => handleCancelSelection()}
          >
            <IoMdClose size={40} />
          </button>
          <Image
            src={imageToDisplay}
            className={`absolute z-40aspect-square rounded-md ${
              props.objectFit === 'cover'
                ? 'object-cover'
                : props.objectFit === 'contain'
                ? 'object-contain'
                : ''
            }`}
            alt="image"
            fill
          />
        </div>
      )}
    </div>
  );
};

export default PicSelector;
