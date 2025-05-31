import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { HiOutlineHeart } from "react-icons/hi";

import { Video } from "../types";
import Comments from "./Comments";
import LikeButton from "./LikeButton ";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes, comments },
  isShowingOnHome,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className=" flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  layout="responsive"
                  src={postedBy.image}
                  alt="profile photo"
                />
              </>
            </Link>
          </div>

          <div>
            <Link href={`/profile/${postedBy._id}`}>
              <div className="flex flex-col items-center">
                <p
                  className="flex gap-2 items-center
                            md:text-md font-bold text-primary"
                >
                  {postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>

                <p
                  className="caoitalize font-medium text-xs
                                text-gray-500 hidden md:block justify-start"
                >
                  {postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl relative"
        >
          <Link href={`/detail/${_id}`}>
            <video
              src={video.asset.url}
              loop
              ref={videoRef}
              className="lg:w-[600px] h-[550px] lg:h-[530px] w-[300px] 
              runded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div
              className="absolute cursor-pointer bottom-[50%] 
              left-[40%] flex gap-10 lg:justify-between opacity-70
              w-[100px] h-[55px] md:w-[50px] p-3 bg-white rounded-full"
            >
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl pr-3" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl pr-3" />
                </button>
              )}

              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}

          <div
            className="absolute bottom-10 lg:ml-[28%] ml-[5px] flex flex-col
          items-start"
          >
            <div className="opacity-80">
              <p className="text-white text-md">
                <HiOutlineHeart />
                {likes?.length}
              </p>
            </div>

            <Link href={`/detail/${_id}`}>
              <div className="opacity-80">
                <p className="text-white text-md">
                  <MdOutlineComment />
                  {comments?.length}
                </p>
              </div>
              <p className="mt-2 font-normal text-white">{caption}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
