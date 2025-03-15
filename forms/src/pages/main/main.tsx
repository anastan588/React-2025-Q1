import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Button from '$/components/button/button';
import { Header } from '$/components/header/header';
import { RootState } from '$/store/store';

function MainPage() {
  const { isFormUncontFilled } = useSelector(
    (state: RootState) => state.uncontrolled_form
  );
  const { isFormContFilled } = useSelector(
    (state: RootState) => state.controlled_form
  );
  const navigate = useNavigate();
  const handleUncontrolledForm = () => {
    navigate('/uncontrolled');
  };
  const handleControlledForm = () => {
    navigate('/controlled');
  };
  return (
    <div className="bg-primary bg-cente flex h-full min-h-screen flex-col items-center bg-contain">
      <Header title_text={'React forms'} />
      <div className="flex gap-4 p-5">
        <Button onClick={handleUncontrolledForm} isFilled={isFormUncontFilled}>
          Uncontrolled form
        </Button>
        <Button onClick={handleControlledForm} isFilled={isFormContFilled}>
          Controlled form
        </Button>
      </div>
    </div>
  );
}

export default MainPage;
