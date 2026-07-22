import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563EB 0%, #6366F1 45%, #8B5CF6 75%, #A855F7 100%)",
          color: "white",
          fontFamily: "sans-serif",
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        L
      </div>
    ),
    size,
  );
}
