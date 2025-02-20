import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import Slider from "@/components/ui/slider";
import {
  FaWhatsapp,
  FaFacebook,
  FaDiscord,
  FaInstagram,
  FaFacebookMessenger,
  FaTwitter,
} from "react-icons/fa";
import styles from "./styles.module.css";

export default function QuranRadioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const shareUrl = "https://stream.radiojar.com/8s5u5tpdtwzuv";

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  useEffect(() => {
    document.title = "إذاعة القرآن الكريم 📻";
  }, []);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = "/QuranIcon.png"; // ضع المسار الجديد هنا
      document.head.appendChild(newLink);
    } else {
      link.href = "/favicon.png";
    }
  }, []);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "إذاعة القرآن الكريم",
        artist: "Quran Radio",
        album: "Live Stream",
        artwork: [{ src: "/refat.png", sizes: "512x512", type: "image/png" }],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current.play();
        setIsPlaying(true);
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current.pause();
        setIsPlaying(false);
      });

      navigator.mediaSession.setActionHandler("stop", () => {
        audioRef.current.pause();
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-green-300 to-blue-400 text-gray-900 rounded-xl shadow-xl max-w-md mx-auto transition-all duration-300 hover:shadow-2xl font-reem">
      <h2 className="text-2xl font-bold mb-4 text-center">
        📻 إذاعة القرآن الكريم
      </h2>
      <p className="custom-arabic-text text-center text-gray-700 mb-4">
        استمع أو اجعلها صدقة لمن تحب سواء حيا أو ميتا
      </p>
      <audio ref={audioRef} src={shareUrl} autoPlay />
      <Button
        onClick={togglePlay}
        className={`mt-4 flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md transition-all ${
          isPlaying
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}{" "}
        {isPlaying ? "إيقاف" : "تشغيل"}
      </Button>
      <div className="mt-6 w-full flex flex-col items-center">
        <span className="text-sm mb-2 font-medium">
          🔊 التحكم في مستوى الصوت
        </span>
        <Slider
          value={[volume]}
          onValueChange={(val) => handleVolumeChange(val[0])}
          min={0}
          max={1}
          step={0.05}
          className="w-48"
        />
      </div>
      <div className="mt-6 flex gap-4">
        <a
          href={`https://api.whatsapp.com/send?text=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 text-2xl"
        >
          <FaWhatsapp />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-2xl"
        >
          <FaFacebook />
        </a>
        <a
          href={`https://discord.com/channels/@me`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 text-2xl"
        >
          <FaDiscord />
        </a>
        <a
          href={`https://www.instagram.com/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 text-2xl"
        >
          <FaInstagram />
        </a>
        <a
          href={`https://www.messenger.com/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-2xl"
        >
          <FaFacebookMessenger />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black text-2xl"
        >
          <FaTwitter />
        </a>
      </div>
    </div>
  );
}
