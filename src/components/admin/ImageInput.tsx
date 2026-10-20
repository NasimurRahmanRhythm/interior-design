"use client";

import { useState } from "react";
import ImageField from "./ImageField";

// ImageField for a plain form: the chosen path goes in a hidden field as JSON.
export default function ImageInput({ name, value, folder, contain }: { name: string; value: string | null; folder?: string; contain?: boolean }) {
  const [path, setPath] = useState(value);
  return (
    <>
      <ImageField value={path} onChange={setPath} folder={folder} contain={contain} />
      <input type="hidden" name={name} value={JSON.stringify(path)} />
    </>
  );
}
