import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #2563EB 0%, #6366F1 45%, #8B5CF6 75%, #A855F7 100%)",
          color: "white",
          fontFamily: "sans-serif",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        L
      </div>
    ),
    size,
  );
}
