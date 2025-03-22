import { FormInfoProps, FormState } from '$/types';

export function FormInfo({ formInfo, info_title }: FormInfoProps) {
  return (
    <div className="text-text-primary bg-dark-grey flex h-full flex-col items-center gap-8 rounded-lg border-2 border-white p-4">
      <h2 className="text-text-secondary bg-light-grey rounded-lg border-2 border-white p-2">
        {info_title}
      </h2>
      <div className="g-4 flex flex-col">
        {Object.keys(formInfo).map((key) => {
          if (
            key !== 'isFormContFilled' &&
            key !== 'isFormUncontFilled' &&
            key !== 'password' &&
            key !== 'confirmPassword' &&
            key !== 'country'
          ) {
            return (
              <div key={key} className="grid grid-cols-[1.5fr_2fr] gap-4">
                <p>{key.toLocaleUpperCase()}:</p>
                {key !== 'picture' ? (
                  key !== 'terms' ? (
                    <p>{formInfo[key as keyof FormState]}</p>
                  ) : (
                    <p>accepted</p>
                  )
                ) : (
                  <img
                    src={formInfo[key as keyof FormState] as string}
                    alt="Profile"
                    className="max-h-8"
                  />
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
