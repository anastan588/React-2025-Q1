import { Header } from '$/components/header/header';

function ControlledPage() {
  return (
    <div className="bg-primary bg-cente relative flex h-full min-h-screen flex-col items-center bg-contain">
      <Header title_text={'Controlled form'} />
      <div className="flex gap-4 p-5"></div>
    </div>
  );
}

export default ControlledPage;
