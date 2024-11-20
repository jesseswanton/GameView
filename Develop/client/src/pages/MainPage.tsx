import { Avatar } from "@rewind-ui/core";

const MainPage = () => {
  return (
    <section id="game-page">
      <nav className="bg-slate-500 flex items-center justify-between">
      <h1 className="text-5xl p-5">GameView</h1>
      <Avatar 
      className="m-3"
      src="https://s3-alpha.figma.com/checkpoints/PLV/z7y/fFznimpfrKnX7guv/52767_23920.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWC52P6HEGX%2F20241117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241117T120000Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=75294fa49137ecef89a47d22621665a0c5436a4dc859fbbe48e41db6bcde706a"
      />
      </nav>
    </section>
  )
};

export default MainPage;
