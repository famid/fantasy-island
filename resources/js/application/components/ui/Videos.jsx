import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Card, Text } from "@mantine/core";
import YouTube from "react-youtube";
import { useState } from "react";

const videoList = [
    {
        id: "1",
        video_id: "BIlU0ebXihY",
        thumbnail: "/assets/images/thumbnail.png",
    },

];

export default function Videos() {
    const [opened, { open, close }] = useDisclosure(false);
    const [activeVideoId, setActiveVideoId] = useState("tszI9GrH1u0");

    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    const opts = {
        height: "100%",
        width: "100%",

        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const playVideo = (video_id) => {
        setActiveVideoId(video_id);
        open();
    };

    return (
        <section id="pricing" className="isolate pb-20 md:pb-32">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <section className="text-gray-600 body-font  flex justify-center items-center">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 text-center justify-center">
                            {videoList.map((video, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="p-4 w-full hover:scale-105 duration-500"
                                    >
                                        <Card
                                            shadow="sm"
                                            padding="xl"
                                            component="a"
                                            onClick={() =>
                                                playVideo(video.video_id)
                                            }
                                            target="_blank"
                                        >
                                            <Card.Section>
                                                <img
                                                    src={video.thumbnail}
                                                    height={160}
                                                    className="cursor-pointer w-full"
                                                    alt="No way!"
                                                />
                                            </Card.Section>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
            <Modal
                opened={opened}
                onClose={close}
                // title="This is a fullscreen modal"
                fullScreen
                transitionProps={{ transition: "fade", duration: 200 }}
            >
                <div className="w-full h-[90vh] flex justify-center items-center ">
                    <YouTube
                        videoId={activeVideoId}
                        opts={opts}
                        onReady={onPlayerReady}
                    />
                </div>
            </Modal>
        </section>
    );
}
