//header component

import Link from "next/link";
import { usePathname } from 'next/navigation';


function Header() {
    const pathname = usePathname();
    return (
        <>
            <nav id="header">
                <h3>Eliana Sobel</h3>
                <div id="nav-buttons">
                    <Link href="/" id="home-link" className={pathname === '/' ? 'active-link' : ''}>
                        <button>Home</button>
                    </Link>
                    <Link href="/figma" id="figma-link" className={pathname === '/figma' ? 'active-link' : ''}>
                        <button>Figma</button>
                    </Link>
                    <Link href="/webdev" id="vscode-link" className={pathname === '/webdev' ? 'active-link' : ''}>
                        <button>Web Dev</button>
                    </Link>
                    {/* <Link href="/processing" id="processing-link" className={pathname === '/processing' ? 'active-link' : ''}>
                        <button>Processing</button>
                    </Link> */}
                    <Link href="/other" id="art-link" className={pathname === '/other' ? 'active-link' : ''}>
                        <button>Art</button>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Header;