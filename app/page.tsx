import HomeClient from "@/components/home-client";

export default function Page() {
  // Image assets from /public/assets
  const photos = [
    "/assets/images/profile/me.jpg",
    "/assets/images/profile/iflytek.png",
    "/assets/images/profile/GDUT.png",
    "/assets/images/profile/hhstu.png",
    "/assets/images/badge_front.png",
  ];
  const avatarUrl = "/assets/images/profile/me.jpg";
  const dogUrl = "/assets/images/profile/me.webp";
  const actionImageUrl = "/assets/images/badge_front.png";
  const webagentUrl = "/assets/images/profile/iflytek.png";
  const chatbotUrl = "/assets/images/profile/GDUT.png";
  const paperUrl = "/assets/images/profile/hhstu.png";

  return (
    <HomeClient
      photos={photos}
      avatarUrl={avatarUrl}
      dogUrl={dogUrl}
      actionImageUrl={actionImageUrl}
      webagentUrl={webagentUrl}
      chatbotUrl={chatbotUrl}
      paperUrl={paperUrl}
    />
  );
}
