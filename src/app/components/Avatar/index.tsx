// components/UserAvatar.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UserAvatarProps {
  photo?: string;
  name: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ photo, name }) => {
  const [imageSrc, setImageSrc] = useState<string>(
    photo || "https://cdn.quasar.dev/img/avatar.png"
  );

  useEffect(() => {
    setImageSrc(photo || "https://cdn.quasar.dev/img/avatar.png");
  }, [photo]);

  return (
    <Image
      src={imageSrc}
      alt={name || "Avatar"}
      className="w-12 h-12 rounded-full object-cover"
      width={50}
      height={50}
    />
  );
};

export default UserAvatar;
