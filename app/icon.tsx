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
          background: "linear-gradient(135deg, #FAFAFA 0%, #D4D4D4 75%, #A3A3A3 100%)",
          color: "#050505",
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
