import { UserProfile } from './UserProfile'

type NavbarProps = {
    playerGold: number;
}

export function Navbar(props: NavbarProps) {
    return (
        <nav style={{ background: '#333', color: 'white', padding: '10px'}}>
            <h2>Nexus Store</h2>
            <UserProfile name="Gabriel Teste" gold={props.playerGold} />
        </nav>
    )
}