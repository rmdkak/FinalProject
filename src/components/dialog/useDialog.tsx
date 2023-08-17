import { Dialog } from './Dialog';
import { useOverlayContext } from './OverlayProvider';

export const useDialog = () => {
  const { mount: _mount, unmount: _unmount } = useOverlayContext();
  const Confirm = async (element: string) => {
    return await new Promise(resolve => {
      _mount(
        'Confirm',
        <Dialog
          type="Confirm"
          onClose={() => {
            resolve(false);
            _unmount('Confirm');
          }}
          onSucess={() => {
            resolve(true);
            _unmount('Confirm');
          }}
        >
          {element}
        </Dialog>
      );
    });
  };

  const Alert = async (element: string) => {
    return await new Promise(resolve => {
      _mount(
        'Alert',
        <Dialog
          type="Alert"
          onClose={() => {
            resolve(true);
            _unmount('Alert');
          }}
        >
          {element}
        </Dialog>
      );
    });
  };
  //   return new Promise(resolve => {
  //     overlay.open(({ close }) => {
  //       switch (type) {
  //         case "alert":
  //           return (
  //             <AlertModal
  //               {...modalProps}
  //               onClose={() => {
  //                 resolve(true);
  //                 close();
  //               }}
  //             />
  //           );

  //         case "confirm":
  //           return (
  //             <ConfirmModal
  //               {...modalProps}
  //               onConfirm={() => {
  //                 resolve(true);
  //                 close();
  //               }}
  //               onClose={() => {
  //                 resolve(false);
  //                 close();
  //               }}
  //             />
  //           );
  //         case "prompt":
  //           return (
  //             <PromptModal
  //               {...modalProps}
  //               onConfirm={inputText => {
  //                 resolve(inputText);
  //                 close();
  //               }}
  //               onClose={() => {
  //                 resolve(null);
  //                 close();
  //               }}
  //             />
  //           );
  //       }
  //     });
  //   });
  // };

  return { Alert, Confirm };
};
