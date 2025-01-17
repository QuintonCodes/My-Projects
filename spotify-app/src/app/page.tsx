import Image from "next/image";

export default function Home() {
  return (
    <div className="m-10 flex flex-col items-center">
      <h1>
        Welcome to Vibe Voyage where you can discover new artists everyday
      </h1>
      <div className="flex items-center pt-5">
        <h5 className="pr-[15px]">Content provided by: </h5>
        <Image
          src="/logo.png"
          alt="Spotify App"
          width={180}
          height={100}
          priority
        />
      </div>
      {/* Display UI for logged in users */}
    </div>
  );
}
