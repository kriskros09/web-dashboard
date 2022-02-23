import React, { useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { toast } from 'react-toastify'

import { Camera } from '../../Icons'
import { Button } from '../../Button'

type ImageUploadType = {
  label?: string
  src?: string

  //string for name
  Inputname?: string

  //string for id
  id?: string

  //string for classNames
  className?: string

  setFieldValue?: any
}

export const ImageUpload: React.FC<ImageUploadType> = ({
  className = '',
  id = '',
  src = '',
  Inputname = 'image',
  label = 'upload your image',
  setFieldValue,
}) => {
  const [preview, setPreview] = useState<string>('')
  const [image, setImage] = useState('')
  const [, setCropData] = useState('#')
  const [cropper, setCropper] = useState<any>()

  const [cropperContainer, setcropperContainer] = useState<boolean>(false)

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
      fileReader.readAsDataURL(file)
    })
  }

  const fileHandler = async (e: any) => {
    e.preventDefault()
    let files

    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }

    if (files.length > 0) {
      if (files[0].size < 1000000) {
        const base64: any = await convertBase64(files[0])

        setImage(base64)
        setcropperContainer(true)
      } else {
        toast.error('File is too big')
      }
    }
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL())

      const imgSrc = cropper.getCroppedCanvas().toDataURL()

      setPreview(imgSrc)
      setcropperContainer(false)
      setFieldValue(Inputname, imgSrc)
    }
  }

  console.log('IMG SRC', src)

  return (
    <>
      {cropperContainer ? (
        <>
          <Cropper
            aspectRatio={4 / 3}
            autoCropArea={1}
            background={false}
            checkOrientation={false}
            minCropBoxHeight={100}
            minCropBoxWidth={100}
            preview=".img-preview"
            src={image}
            style={{ height: 'auto', width: '100%' }}
            viewMode={1}
            guides
            responsive
            onInitialized={(instance) => {
              setCropper(instance)
            }}
          />
          <div className="flex">
            <Button
              className="btn-xs bg-primary text-white mr-4"
              label="Crop"
              onClick={getCropData}
            />
            <Button
              className="btn-xs bg-gray-400 text-white"
              label="Cancel"
              onClick={() => setcropperContainer(false)}
            />
            å
          </div>
        </>
      ) : src != null && src !== '' ? (
        <img alt="" className="t" src={src} />
      ) : preview !== '' ? (
        <img alt="" className="e" src={preview} />
      ) : (
        <div className="block text-center flex flex-col items-center bg-gray-150 border border-dashed border-gray-300 overflow-hidden p-10">
          <span className="inline-block text-gray-400 font-bold">
            {label} <br />
            <small>Max file size 250kb</small>
          </span>
          <Camera fillColour="gray-400" size={72} />
        </div>
      )}

      <input className="hidden" id={id} name={Inputname} value={preview} readOnly />
      {!cropperContainer ? (
        <input
          accept="image/*"
          className={`btn-sm w-full ${className}`}
          type="file"
          onChange={(e) => fileHandler(e)}
        />
      ) : null}
    </>
  )
}
