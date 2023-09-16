'use client';
import { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResult {
    public_id: string;
}

const UploadPage = () => {
    const [publicId, setPublicId] = useState('');
    return (
        <>
            {publicId && (
                <CldImage
                    src={publicId}
                    width={270}
                    height={180}
                    alt="Flood it again!"
                />
            )}
            <CldUploadWidget
                uploadPreset="lf6cflnf"
                options={{
                    sources: ['local'],
                    multiple: false,
                    maxFiles: 3,
                }}
                onUpload={(result, widgit) => {
                    if (result.event !== 'success') return;
                    const info = result.info as CloudinaryResult;
                    setPublicId(info.public_id);
                    widgit.close();
                }}
            >
                {({ open }) => (
                    <button onClick={() => open()} className="btn btn-primary">
                        Upload
                    </button>
                )}
            </CldUploadWidget>
        </>
    );
};

export default UploadPage;
