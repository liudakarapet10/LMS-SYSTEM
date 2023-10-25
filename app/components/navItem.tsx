interface NavItemProps {
  text: string;
  url: string;
  id?: string;
  isActive: boolean;
  onClick?: () => void;
}

export function NavItem({ text, url, isActive = false, id, onClick }: NavItemProps) {
  return (
    <li className={`w-full ${isActive ? 'text-[#2464EB] focus-visible:outline-none' : 'cursor-pointer hover:text-[#2464EB]'}`}>
      <a className={`block w-full ${isActive ? 'focus-visible:outline-none':  "" }`} href={url} aria-current={isActive ? 'page' : undefined} id={id} onClick={onClick}>{text}</a>
    </li>
  );
}
