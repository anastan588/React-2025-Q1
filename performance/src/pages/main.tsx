import { Header } from '$/components/header';

function MainPage() {
  return (
    <div className="bg-primary bg-cente flex h-full min-h-screen flex-col items-center bg-contain">
      <Header title_text={'Performance'} />
      <div className="flex gap-4 p-5"></div>
    </div>
  );
}

export default MainPage;
