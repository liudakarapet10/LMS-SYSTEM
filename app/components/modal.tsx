// app/components/modal.tsx
import { Portal } from './portal'

interface props {
  children: React.ReactNode
  isOpenModal: boolean
  ariaLabel?: string
  className?: string
  handleClick : () => void
}

export const Modal: React.FC<props> = ({ children, isOpenModal, ariaLabel, className, handleClick }) => {
  // const navigate = useNavigate();
  
  
  if (!isOpenModal) return null;
 

  // const closeAndRedirect = () => {
  //   // console.log(url);
    
  //   // navigate('/home/');
  //   // You can also use the `currentURL` variable for further actions, logging, or redirection.
  // };

  return (
    <Portal wrapperId="modal" >
      <div
        className="fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80"
        aria-labelledby={ariaLabel ?? 'modal-title'}
        role="dialog"
        aria-modal="true"
        onClick={handleClick}
      ></div>
      <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-scroll">

        <div className={`${className} p-4 bg-gray-200 pointer-events-auto max-h-screen md:rounded-xl`}>
      <button onClick={() => handleClick()}>Close</button>
          {children}
        </div>
      </div>
    </Portal>
  )
}