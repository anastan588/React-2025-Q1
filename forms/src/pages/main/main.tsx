import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Button from '$/components/button/button';
import FormInfo from '$/components/form_info/form_info';
import { Header } from '$/components/header/header';
import { RootState } from '$/store/store';

function MainPage() {
  const stateUncont = useSelector(
    (state: RootState) => state.uncontrolled_form
  );
  const stateCont = useSelector((state: RootState) => state.controlled_form);
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
        <Button
          onClick={handleUncontrolledForm}
          isFilled={stateUncont.isFormUncontFilled}
        >
          Uncontrolled form
        </Button>
        <Button
          onClick={handleControlledForm}
          isFilled={stateCont.isFormContFilled}
        >
          Controlled form
        </Button>
      </div>
      <div className="grid grid-cols-2">
        {stateUncont.isFormUncontFilled && (
          <FormInfo
            formInfo={stateUncont}
            info_title={'Uncontrolled form information'}
          />
        )}
        {stateCont.isFormContFilled && (
          <FormInfo
            formInfo={stateUncont}
            info_title={'Controlled form information'}
          />
        )}
      </div>
    </div>
  );
}

export default MainPage;
