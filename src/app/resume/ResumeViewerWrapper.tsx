"use client";

import dynamic from "next/dynamic";

const CVViewer = dynamic(() => import("./CVViewer"), {
  ssr: false,
});

export default function CVViewerWrapper({ file }: { file: string }) {
  return <CVViewer file={file} />;
}
