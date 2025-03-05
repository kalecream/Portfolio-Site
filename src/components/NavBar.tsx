import { useRef, useState } from 'react';
import './NavBar.scss';
import { images } from '../constants';
import gsap from 'gsap';

const navItems = ['home', 'about', 'work', 'skills', 'contact'];

export type NavLinkProps = {
  children: React.ReactNode;
  className: string;
};

export function NavLink(props: NavLinkProps) {
  const { children, ...linkProps } = props;

  return <a {...linkProps}>{props.children}</a>;
}


// const StyledNavLink = ({
//   isActive,
//   className,
//   ...linkProps
// }: any & {
//   isActive: boolean;
//   children: React.ReactNode;
//   className?: string;
// }) => (
//   <NavLink
//     className={`${className ?? ''} ${isActive ? 'active-link' : ''}`}
//     {...linkProps}
//   />
// );

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="app__navbar">
      <div className="navbar__logo" onClick={() => setToggle(true)}>
        <img src={images.logo} alt="logo" />
      </div>
      <div>
        <div className="app__navbar-menu">
          {toggle && (
            <>
              <span onClick={() => setToggle(false)} />
              <ul>
                {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};


// const NavBar = () => {
//   const [isMenuShown, setIsMenuShown] = useState(false);
//   const pathname = usePathname();
//   const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname!);
//   const navRef = useRef<HTMLDivElement>(null);

//   const toggleNav = () => {
//     const nav = navRef.current;
//     if (!nav) return;

//     const isOpen = isMenuShown;

//     if (isOpen) {
//       gsap.to(nav, {
//         x: '-100%',
//         duration: 0.5,
//         ease: 'power2.inOut',
//       });
//     } else {
//       gsap.to(nav, {
//         x: '0%',
//         duration: 0.5,
//         ease: 'power2.inOut',
//       });
//     }

//     setIsMenuShown(!isOpen);
//   };

//   return (
//     <>
//       <button className="menu-button" onClick={toggleNav}>
//         ☰
//       </button>
//       <div ref={navRef} className="vertical-nav">
//         <img src={images.logo} width={90} height={100} alt={''} style={{margin: "0 auto"}} />
//         {/* <h1>Balkim <wbr/>Media</h1> */}
//         <nav className="navbar">
//           <ul className="nav-links">
//             {navItems.map((label, ref, index) => (
//               <li key={index} className="nav-item">
//                 <StyledNavLink
//                   isActive={ref === linkRef}
//                   href={ref}
//                   onClick={() => {
//                     setLinkRef(ref);
//                     setIsMenuShown(false); // Close menu on selection
//                     gsap.to(navRef.current, { x: '-100%', duration: 0.5 });
//                   }}
//                 >
//                   {label}
//                 </StyledNavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* <div>
//           <ul className="social-media">
//             {SocialMedia.map(({ ref, label }) => (
//               <li key={ref} className="social-media-item">
//                 <a href={ref} target
//                   ="_blank" rel="noreferrer">
//                   {label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div> */}
//       </div>
//     </>
//   );
// }



export default NavBar;
