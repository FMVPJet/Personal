import HomeClient from "@/components/home-client";

export default function Page() {
  // Placeholder images - replace with real ones
  const photos = [
    "/photos/1.jpg",
    "/photos/2.jpg",
    "/photos/3.jpg",
    "/photos/4.jpg",
    "/photos/5.jpg",
  ];
  const avatarUrl = "/avatar.jpg";
  const dogUrl = "/dog.jpg";
  const actionImageUrl = "/projects/action.png";
  const webagentUrl = "/projects/webagent.png";
  const chatbotUrl = "/projects/chatbot.png";
  const paperUrl = "/projects/paper.png";

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
