import HomeClient from "@/components/home-client";

export default function Page() {
  // Image assets from /public/assets
  const photos = [
    "/assets/photos/abstract-1.jpg",
    "/assets/photos/abstract-2.jpg",
    "/assets/photos/abstract-3.jpg",
    "/assets/photos/abstract-4.jpg",
    "/assets/photos/abstract-5.jpg",
  ];
  const avatarUrl = "/assets/images/profile/me.jpg";
  const dogUrl = "/assets/images/profile/me.webp";
  const actionImageUrl = "/assets/projects/actions.jpg";
  const webagentUrl = "/assets/projects/webagent.jpg";
  const chatbotUrl = "/assets/projects/chatbot.jpg";
  const paperUrl = "/assets/projects/paper.jpg";

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
